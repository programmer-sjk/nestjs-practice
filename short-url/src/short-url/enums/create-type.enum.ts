export enum CreateType {
  HASH = 'hash', // hash 함수를 통해 short-url 생성
  BASE62 = 'base62', // base 62를 직접 계산해서 short-url 생성
  SNOW_FLAKE = 'snow_flake', // snowflake 라이브러리를 이용한 short-url 생성
}
