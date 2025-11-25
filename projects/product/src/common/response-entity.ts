import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class ResponseEntity<T> {
  private static readonly SUCCESS = true;
  private static readonly FAIL = false;

  @Exclude() readonly _success: boolean;
  @Exclude() readonly _message: string;
  @Exclude() readonly _data: T;

  private constructor(success: boolean, message: string, data: T) {
    this._success = success;
    this._message = message;
    this._data = data;
  }

  static OK<T>(data?: T) {
    return new ResponseEntity(ResponseEntity.SUCCESS, '', data ?? '');
  }

  static ERROR(message: string) {
    return new ResponseEntity(ResponseEntity.FAIL, message, '');
  }

  static ERROR_WITH<T>(message: string, data: T) {
    return new ResponseEntity(ResponseEntity.FAIL, message, data);
  }

  @ApiProperty()
  @Expose()
  get success(): boolean {
    return this._success;
  }

  @ApiProperty({
    example: '',
    description: '성공시 빈 문자열, 실패시 에러 메시지',
  })
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}
