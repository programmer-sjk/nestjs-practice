# 배드민턴 API

## 요구사항 정리

### 코치

- 배드민턴 코치는 **`조자룡, 여포, 장비, 관우로`** 총 4명이다.
- 코치는 seed 데이터로 생성하며 별도의 API를 제공하지 않는다.

### 사용자

- 레슨 예약/삭제는 회원가입 및 로그인 후에 가능하다.
- 인증 수단으로는 jwt를 사용한다.

### 레슨 예약

- 배드민턴 레슨은 **`1회성 레슨과 정규 레슨이 있다`**. 모든 레슨은 1시간동안 진행되며 매 시간 정각만 예약이 가능하다. 예를 들어 오전 10시로 예약할 수 있지만 10시 15분, 10시 30분에는 예약할 수 없다.
- 레슨은 **`다음날부터 7일 이내에만 예약이 가능하다`**. 만약 오늘이 11월 20일이라면 11월 21일부터 11월 27일까지 레슨을 신청할 수 있다. 모든 레슨의 당일 예약은 불가능하다.
- 배드민턴장은 매일 오전 7시에 오픈하여 저녁 11시에 마감한다. 즉 레슨 예약도 오전 7시부터 가능하며 마지막 레슨이 끝나는 시간도 저녁 11시까지 가능하고 11시를 넘을 수 없다.
- **`코치의 레슨 시간은 겹칠 수 없다`**. 즉 A 코치가 월요일 15시에 일회성 레슨이 예약되었다면, A 코치가 월요일 15 ~ 16시 사이에 다른 레슨을 진행할 수 없다.
- 정기 레슨의 경우, 만약 오늘이 12월 10일(화)이라면 12월 11일(수)부터 정기레슨이 시작된다. 예를 들어 화, 목 10시 시작 레슨이라면 12월 12일 목요일 10시부터 1시간 동안 레슨이 시작된다.

### 레슨 일정 조회

- 코치 ID, 레슨 타입(1회, 정규)을 받아 레슨 받을 수 있는 시간 리스트를 응답을 받는다.

### 레슨 취소

- 고객은 레슨 하루 전까지 레슨을 취소할 수 있다. 2월 22일 10시 레슨이라면 2월 22일 0시 이전까지 레슨을 취소할 수 있다. 즉 레슨을 하는 당일에는 취소 할 수 없다.

## 기술

- Typescript, NestJS, TypeORM, MySQL을 사용한다.
- 어플리케이션 서버를 제외한 다른 저장소는 docker를 이용한다.
- 서버 실행 방법을 제공한다.
- 테스트 코드를 작성한다.
- 동시성 문제를 해결한다.

## 실행 방법

- 저장소를 clone 받는다.
- `docker-compose up -d` 명령어로 DB, Redis를 컨테이너로 실행한다.
- `yarn migration:run` 명령어로 테이블을 생성한다.
- `yarn seed:run` 명령어로 coach에 대한 초기 데이터를 생성한다.
- `yarn start:dev` 명령어로 서버를 실행한다.
