// import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';

import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RagService {
  private readonly model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4.1-mini',
    });
  }

  async simpleRag() {
    const chunks = await this.splitDocumentsFromDocuments();
    const vectorStore = this.getVectorStore();
    await vectorStore.addDocuments(chunks);

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        'You are a helpful assistant that can answer questions about the following text: {context}',
      ],
      ['human', '{question}'],
    ]);
    const retriever = vectorStore.asRetriever();
    const question = '격하 과정에 대해 설명해주세요';

    const result = await RunnableSequence.from([
      {
        context: retriever,
        question: new RunnablePassthrough(),
      },
      prompt,
      this.model,
      new StringOutputParser(),
    ]).invoke(question);

    return result;
  }

  private async splitDocumentsFromDocuments() {
    const url =
      'https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:%EC%A0%95%EC%B1%85%EA%B3%BC_%EC%A7%80%EC%B9%A8#:~:text=%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC%EC%9D%98%20%EC%A0%95%EC%B1%85(Policy,%EC%9E%88%EB%8A%94%20%EB%B0%B1%EA%B3%BC%EC%82%AC%EC%A0%84%20%EC%9E%91%EC%84%B1%EC%9D%B4%EC%A7%80%EC%9A%94.';

    const loader = new CheerioWebBaseLoader(url);
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    return splitter.splitDocuments(docs);
  }

  private getVectorStore() {
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
    });

    return new Chroma(embeddings, {
      collectionName: `test-collection-${Date.now()}`,
      clientParams: {
        host: 'localhost',
        port: 8000,
      },
    });
  }
}
