export enum CreateType {
  HASH = 'HASH', // hash 함수를 통해 short-url 생성
  RAW = 'RAW', // base 62를 직접 계산해서 short-url 생성
  LIB = 'LIB', // base62 라이브러리를 설치해서 short-url 생성
}
