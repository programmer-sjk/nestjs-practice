export class ResponseEntity<T> {
  private static readonly SUCCESS = true;
  private static readonly FAIL = true;

  readonly success: boolean;
  readonly message: string;
  readonly data: T;

  private constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static OK<T>(data?: T) {
    return new ResponseEntity(ResponseEntity.SUCCESS, '', data ?? '');
  }

  static ERROR(message: string) {
    return new ResponseEntity(ResponseEntity.FAIL, message, '');
  }
}
