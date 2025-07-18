# passport

- 해당 프로젝트에선 두 가지 기능을 비교한다.

## passport를 통해 인증

- 기존 auth guard의 canActivate와 비교해서 장점이 있을지 확인한다.

## request, response 응답 구조 변경

- request는 snake_case로 오는데 내부에서 camelCase로 변환해서 사용
- response는 camelCase를 응답할 때 snake_case로 변환한다.
