export class PostSearchedEvent {
  private readonly keyword: string;

  constructor(keyword: string) {
    this.keyword = keyword;
  }
}
