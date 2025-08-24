import { RunnableConfig } from '@langchain/core/runnables';
import { BaseCheckpointSaver } from '@langchain/langgraph';
import {
  ChannelVersions,
  Checkpoint,
  CheckpointMetadata,
} from '@langchain/langgraph-checkpoint';
import Redis from 'ioredis';

export class CustomRedisCheckpointSaver extends BaseCheckpointSaver {
  private readonly prefix: string = 'workflow:';

  constructor(private redis: Redis) {
    super();
  }

  async getTuple(config: RunnableConfig): Promise<any> {
    const key = this.getCheckpointKey(config);
    const value = await this.redis.get(`${this.prefix}${key}`);
    if (!value) {
      return;
    }

    const parsed = await this.serde.loadsTyped('json', value);
    return {
      config,
      checkpoint: parsed.checkpoint,
      metadata: parsed.metadata,
      parentConfig: parsed.parentConfig,
      pendingWrites: parsed.pendingWrites,
    };
  }

  async *list(config: RunnableConfig): AsyncGenerator<any> {
    const pattern = `${this.prefix}*`;
    const keys = await this.redis.keys(pattern);

    for (const key of keys) {
      const value = await this.redis.get(key);
      if (value) {
        const parsed = await this.serde.loadsTyped('json', value);
        yield {
          config,
          checkpoint: parsed.checkpoint,
          metadata: parsed.metadata,
          parentConfig: parsed.parentConfig,
          pendingWrites: parsed.pendingWrites,
        };
      }
    }
  }

  async put(
    config: RunnableConfig,
    checkpoint: Checkpoint,
    metadata: CheckpointMetadata,
    newVersions: ChannelVersions,
  ): Promise<any> {
    const key = this.getCheckpointKey(config);
    const data = { checkpoint, metadata, parentConfig: config, newVersions };
    const [, serialized] = await this.serde.dumpsTyped(data);
    const buffer = Buffer.from(serialized);
    await this.redis.set(`${this.prefix}${key}`, buffer);
    return config;
  }

  async putWrites(config: any, writes: any[], taskId: string): Promise<void> {
    const key = `${this.getCheckpointKey(config)}:writes:${taskId}`;
    const [, serialized] = await this.serde.dumpsTyped(writes);
    const buffer = Buffer.from(serialized);
    await this.redis.set(`${this.prefix}${key}`, buffer);
  }

  async deleteThread(threadId: string): Promise<void> {
    const pattern = `${this.prefix}*${threadId}*`;
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  private getCheckpointKey(config: RunnableConfig): string {
    return config.configurable?.thread_id || 'default';
  }
}
