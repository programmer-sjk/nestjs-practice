/**
 * socketio emit에서 ClassSerializerInterceptor가 작동하지 않아 멤버 변수를 public 선언
 */
export class ChatResponse {
  body: string;
  time: string;

  constructor(body, time) {
    this.body = body;
    this.time = time;
  }
}
