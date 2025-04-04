# URL 단축기

- 기존 URL을 단축하는 기능으로 아래 2가지 방법을 구현
  - hash 함수의 앞의 7글자를 사용
    - 이때 충돌이 발생하면 특수 문자로 패딩해서 재시도.
    - 재시도 최대 횟수는 5번으로 제한
  - 트위터 SnowFlake로 만든 고유 숫자를 62진법으로 계산하여 사용
    - 62진법은 숫자와 소문자 대문자를 합한 숫자가 62개
    - 트위터 [snowflake ID](https://en.wikipedia.org/wiki/Snowflake_ID)를 사용
- short url로 접근 시, original url을 301 (Moved Permanently)로 응답

## API 예시

- short url 생성

  ```
  POST localhost:3000/short-url/hash
  POST localhost:3000/short-url/snow_flake

  BODY { "longUrl": "https://developer.mozilla.org/en-US/docs/Web/API/console/timeLog_static" }
  ```

- original url 조회

  ```
  GET localhost:3000/short-url
  BODY { "shortUrl": "https://short.com/5e6qzCM" }
  ```
