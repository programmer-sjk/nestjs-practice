import { Annotation, END, START, StateGraph } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';

const AgentState = Annotation.Root({
  messages: Annotation<Array<{ role: string; content: string }>>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});
@Injectable()
export class LanggraphService {
  private readonly model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4.1-mini',
    });
  }

  async test() {
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
}
