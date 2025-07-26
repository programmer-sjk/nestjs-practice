# school

- 프로젝트 목적
  - passport를 사용해 인증을 제공해 기존 auth guard의 canActivate와 비교해서 장점이 있을지 확인한다.
  - request, response 응답 구조 변경
  - typeorm의 다대다 관계에 대해 조금 더 학습한다.

- 프로젝트 요구사항
  - 학생들은 강의를 수강할 수 있다.
  - 학생과 강의는 다대다 관계이다. 한 학생은 여러 강의를 수강할 수 있고, 한 강의는 여러 학생들이 들을 수 있다.
  - 학생들은 로그인을 통해 수강 신청을 할 수 있다.

## passport를 통해 인증

- 사용해보니 passport를 활용하면 간단한 코드와 깔끔한 구조로 인증 기능을 제공할 수 있다.
- 또한 다양한 인증 방법을 제공한다면 passport 사용을 권한다.
- 반대로 MSA 환경에서 인증만 하는 서버의 경우 passport 대신 auth guard의 canActivate만 사용해도 무방해 보인다.

## request, response 응답 구조 변경

- request는 snake_case로 오는데 내부에서 camelCase로 변환해서 사용
- response는 camelCase를 응답할 때 snake_case로 변환한다.
