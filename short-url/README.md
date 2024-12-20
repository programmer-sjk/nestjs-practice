# URL 단축기

- 기존 URL을 단축하는 기능으로 아래 3가지 방법을 구현
  - hash 함수의 앞의 7글자를 사용
  - DB의 PK를 62진법으로 계산하여 사용
  - 트위터 [snowflake ID](https://en.wikipedia.org/wiki/Snowflake_ID)를 62진법으로 계산하여 사용
- short url로 접근 시, original url을 301 (Moved Permanently)로 응답

## API 예시

- short url 생성

  ```
  POST localhost:3000/short-url/hash
  POST localhost:3000/short-url/raw
  POST localhost:3000/short-url/snow_flake

  BODY { "longUrl": "https://developer.mozilla.org/en-US/docs/Web/API/console/timeLog_static" }
  ```

- original url 조회

  ```
  GET localhost:3000/short-url
  BODY { "shortUrl": "https://short.com/5e6qzCM" }
  ```
