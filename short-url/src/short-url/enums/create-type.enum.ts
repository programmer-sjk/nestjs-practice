export enum CreateType {
  HASH = 'HASH', // hash 함수를 통해 short-url 생성
  RAW = 'RAW', // base 62를 직접 계산해서 short-url 생성
  SNOW_FLAKE = 'SNOW_FLAKE', // snowflake 라이브러리를 이용한 short-url 생성
}
