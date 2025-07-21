# passport

- 해당 프로젝트는 두 가지 목적을 가진다.
- 프로젝트 간소화를 위해 DB 작업은 하지 않는다.

## passport를 통해 인증

- 기존 auth guard의 canActivate와 비교해서 장점이 있을지 확인한다.

### 확인한 사항

- 사용해보니 passport를 활용하면 간단한 코드와 깔끔한 구조로 인증 기능을 제공할 수 있다.
- 또한 다양한 인증 방법을 제공한다면 passport 사용을 권한다.
- 반대로 MSA 환경에서 인증만 하는 서버의 경우 passport 대신 auth guard의 canActivate만 사용해도 무방해 보인다.

## request, response 응답 구조 변경

- request는 snake_case로 오는데 내부에서 camelCase로 변환해서 사용
- response는 camelCase를 응답할 때 snake_case로 변환한다.
