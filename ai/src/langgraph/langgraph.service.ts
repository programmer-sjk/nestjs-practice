import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import {
  Annotation,
  BaseCheckpointSaver,
  CompiledStateGraph,
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from '@langchain/langgraph';
import { MongoDBSaver } from '@langchain/langgraph-checkpoint-mongodb';
import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const AgentState = Annotation.Root({
  messages: Annotation<Array<{ role: string; content: string }>>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});
@Injectable()
export class LanggraphService {
  private readonly model: ChatOpenAI;
  private readonly checkpointer: BaseCheckpointSaver;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4.1-mini',
    });

    this.checkpointer = new MongoDBSaver({
      client: new MongoClient(process.env.MONGODB_CONNECTION_STRING ?? ''),
      dbName: 'glit',
      checkpointCollectionName: 'checkpoints',
      checkpointWritesCollectionName: 'checkpoint_writes',
    });
  }

  async simpleGraph() {
    const graphBuilder = new StateGraph(AgentState);
    const graph = graphBuilder
      .addNode('generate', this.generate)
      .addEdge(START, 'generate')
      .addEdge('generate', END)
      .compile();

    const result = await graph.invoke({
      messages: [{ role: 'user', content: 'Hello, how are you?' }],
    });

    console.log(result);
    return result;
  }

  generate = async (state: typeof AgentState.State) => {
    const aiMessage = await this.model.invoke(state.messages);
    return { messages: [aiMessage] };
  };

  async recoverFromFailPoint(userId: number, isErr: boolean) {
    const config = { configurable: { thread_id: userId } };

    const node1 = async (state: typeof MessagesAnnotation.State) => {
      const response = await PromptTemplate.fromTemplate('{prompt}')
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3곱하기 1은?' });

      return {
        messages: [...state.messages, response],
        current_step: 'node1',
      };
    };

    const node2 = async (state: typeof MessagesAnnotation.State) => {
      const response = await PromptTemplate.fromTemplate('{prompt}')
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3곱하기 2는?' });

      return {
        messages: [...state.messages, response],
        current_step: 'node2',
      };
    };

    const node3 = async (state: typeof MessagesAnnotation.State) => {
      const response = await PromptTemplate.fromTemplate('{prompt}')
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3곱하기 3은?' });

      if (isErr) {
        throw new Error('Error');
      }

      return {
        messages: [...state.messages, response],
        current_step: 'node3',
      };
    };

    const node4 = async (state: typeof MessagesAnnotation.State) => {
      const response = await PromptTemplate.fromTemplate('{prompt}')
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3곱하기 4는?' });

      return {
        messages: [...state.messages, response],
        current_step: 'node4',
      };
    };

    const workflow = new StateGraph(MessagesAnnotation)
      .addNode('node1', node1)
      .addNode('node2', node2)
      .addNode('node3', node3)
      .addNode('node4', node4)
      .addEdge(START, 'node1')
      .addEdge('node1', 'node2')
      .addEdge('node2', 'node3')
      .addEdge('node3', 'node4')
      .addEdge('node4', END)
      .compile({ checkpointer: this.checkpointer });

    const state = await workflow.getState(config);

    if (
      state.next.length > 0 ||
      (state.next.length === 0 &&
        (state.values as typeof MessagesAnnotation.State).messages?.length > 0)
    ) {
      const result = await workflow.invoke(null, config);
      return result.messages.map((v) => v.content);
    }

    const result = await workflow.invoke({ messages: [] }, config);
    return result.messages.map((v) => v.content);
  }

  private async displayMermaidGraph(
    graph: CompiledStateGraph<any, any, any, any, any, any>,
  ) {
    const representation = await graph.getGraphAsync();
    console.log(representation.drawMermaid());
  }
}
