export class PostSearchedEvent {
  readonly keyword: string;

  constructor(keyword: string) {
    this.keyword = keyword;
  }
}
