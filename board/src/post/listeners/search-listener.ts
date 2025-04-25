import { OnEvent } from '@nestjs/event-emitter';
import { PostSearchedEvent } from '../events/post-searched.event';

export class PostListener {
  @OnEvent('post.searched')
  handlePostSearchedEvent(payload: PostSearchedEvent) {
    console.log(payload);
  }
}
