/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from '@langchain/langgraph';
import { MemorySaver } from '@langchain/langgraph-checkpoint';
import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class AppService {
  private readonly model: ChatOpenAI;
  private readonly checkpointer: MemorySaver;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
    });

    this.checkpointer = new MemorySaver();
  }

  test2(prompt: string) {
    // SHA-256 해시 생성 (64자 고정)
    const hash = crypto.createHash('sha256').update(prompt).digest('hex');
    console.log('해시값:', hash);
    return hash;
  }

  async test(prompt: string, userId: number, isErr: boolean = false) {
    // ✅ 상태 추적을 위한 Annotation

    const openAiFunc = async (state: any) => {
      console.log('openAiFunc');
      const chatPrompt = ChatPromptTemplate.fromMessages([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'human', content: '{prompt}' },
      ]);

      const aiResponse = await chatPrompt
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt });

      return { messages: aiResponse };
    };

    // 병렬로 실행될 노드들 - 각각 독립적으로 하나의 값만 추가
    const node1 = async (state: any) => {
      console.log('Node 1 executed, current messages:');
      const chatPrompt = ChatPromptTemplate.fromMessages([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'human', content: '{prompt}' },
      ]);

      const aiResponse = await chatPrompt
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3 곱하기 1은?' });

      return { messages: aiResponse };
    };

    const node2 = async (state: any) => {
      console.log('Node 2 executed, current messages:');
      const chatPrompt = ChatPromptTemplate.fromMessages([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'human', content: '{prompt}' },
      ]);

      const aiResponse = await chatPrompt
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3 곱하기 2는?' });

      return { messages: aiResponse };
    };

    // const workflow1 = (new StateGraph(MessagesAnnotation) as any)
    //   .addNode('node1', node1)
    //   .addNode('node2', node2)
    //   .addEdge(START, 'node1')
    //   .addEdge('node1', 'node2')
    //   .addEdge('node2', END)
    //   .compile();

    const node3 = async (state: any) => {
      console.log('Node 3 executed, current messages:');

      const chatPrompt = ChatPromptTemplate.fromMessages([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'human', content: '{prompt}' },
      ]);

      const aiResponse = await chatPrompt
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3 곱하기 3은?' });

      return { messages: aiResponse };
    };

    // 모든 병렬 노드의 결과를 받은 후 실행되는 노드
    const node4 = async (state: any) => {
      console.log('Node 4 executed, current messagess:');
      const chatPrompt = ChatPromptTemplate.fromMessages([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'human', content: '{prompt}' },
      ]);

      const aiResponse = await chatPrompt
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3 곱하기 4는?' }, { timeout: isErr ? 100 : 5000 });

      return { messages: aiResponse };
    };

    const node5 = (state: any) => {
      console.log('Node 5 executed, current messages:');
      return { messages: 'e' };
    };

    const node6 = (state: any) => {
      console.log('Node 6 executed ONCE, current messages:');
      return { messages: 'f' };
    };

    const workflow2 = (new StateGraph(MessagesAnnotation) as any)
      .addNode('node3', node3)
      .addNode('node4', node4)
      .addNode('node5', node5)
      .addNode('node6', node6)
      .addEdge(START, 'node3')
      .addEdge('node3', 'node4')
      .addEdge('node4', 'node5')
      .addEdge('node5', 'node6')
      .addEdge('node6', END)
      .compile({ checkpointer: this.checkpointer });

    // ✅ 간단한 해결책: 순차 실행으로 변경하여 중복 방지
    const workflow = (new StateGraph(MessagesAnnotation) as any)
      .addNode('node1', node1)
      .addNode('node2', node2)
      .addNode('subGraph', workflow2)
      // .addNode('node3', node3)
      // .addNode('node4', node4)
      // .addNode('node5', node5)
      // .addNode('node6', node6)
      .addNode('openai', openAiFunc)
      .addEdge(START, 'node1') // START → wf1 (a,b)
      .addEdge('node1', 'node2') // wf1 → wf2 (c,d)
      .addEdge('node1', 'subGraph') // wf2 → node5 (e)
      .addEdge('node2', 'openai') // wf2 → node5 (e)
      .addEdge('subGraph', 'openai') // wf2 → node5 (e)
      // .addEdge('node4', 'node5') // wf2 → node5 (e)
      // .addEdge('node5', 'node6') // node5 → node6 (f) - 순차 실행으로 한 번만!
      // .addEdge('node6', 'openai')
      .addEdge('openai', END);

    const compiledGraph = workflow.compile({ checkpointer: this.checkpointer });

    // ✅ Mermaid 다이어그램 콘솔 출력
    try {
      const drawableGraph = compiledGraph.getGraph();
      const mermaidCode = await drawableGraph.drawMermaid();
      console.log('📊 Graph Diagram (Mermaid):');
      console.log(mermaidCode);
    } catch (error) {
      console.log('⚠️ Diagram generation failed:', error);
    }

    // ✅ Thread ID 기반 체크포인터 설정
    const config = {
      configurable: {
        thread_id: `user_${userId}`,
      },
    };

    // 기존 체크포인트 확인
    const existingCheckpoint = await compiledGraph.getState(config);
    console.log('📋 Existing checkpoint:', existingCheckpoint);

    let result;

    if (
      existingCheckpoint &&
      existingCheckpoint.values &&
      Object.keys(existingCheckpoint.values).length > 0
    ) {
      const a = existingCheckpoint.tasks.find(
        (task) => task.name == 'subGraph',
      );
      console.log(a);
      console.log('🔄 Resuming from checkpoint...');
      // 기존 체크포인트에서 재개
      result = await compiledGraph.invoke(null, config);
    } else {
      console.log('🆕 Starting new workflow...');
      // 새로운 워크플로우 시작
      result = await compiledGraph.invoke(
        {
          messages: [], // 빈 배열로 시작
        },
        config,
      );
    }

    // 최종 상태 저장 확인
    const finalState = await compiledGraph.getState(config);
    console.log('💾 Final state saved:', finalState.next);

    console.log(
      'Final result:',
      result.messages.map((m) => m.content),
    );
    return {
      result: result.messages.map((m) => m.content),
    };
  }

  async openai(prompt: string) {
    const chatPrompt = ChatPromptTemplate.fromMessages([
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'human', content: '{prompt}' },
    ]);

    return chatPrompt
      .pipe(this.model)
      .pipe(new StringOutputParser())
      .invoke({ prompt });
  }
}
