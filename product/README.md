# 주문 프로젝트

## 요구사항

- 포인트와 쿠폰을 활용해 주문하는 프로젝트

### 사용자

- 사용자는 회원가입이 가능하다.
- 사용자는 로그인 후 주문이 가능하다.
- 인증 방법으로 jwt 토큰을 사용한다.

### 어드민

- 어드민으로 로그인 후 다음 세 가지 작업을 수행할 수 있다.
  - 카테고리를 저장한다.
  - 상품의 이름, 수량, 가격, 카테고리를 입력하여 상품을 등록할 수 있다.
  - 쿠폰의 이름, 수량, 카테고리를 입력해 쿠폰을 등록할 수 있다.

### 포인트

- 사용자는 포인트를 구매할 수 있다.
- 실제 결제와 관련된 로직은 구현하지 않는다. 포인트 구매 API를 호출할 때 결제는 진행된것으로 간주한다.
- 첫 회원가입을 하면 1_000 포인트를 지급한다.
- 포인트 사용 내역을 조회할 수 있어야 한다.
- 포인트를 지급시 만료기간을 설정할 수 있다.

### 쿠폰

- 사용자가 쿠폰을 받는 방법은 아래 2가지이다.
  - 어드민이 사용자에게 발급하는 방법
  - 이벤트 쿠폰을 사용자가 직접 발급받는 방법이다.

### 주문

- 사용자는 주문시 쿠폰과 포인트를 같이 사용할 수 있다.
- 주문시 쿠폰과 포인트를 사용할 수 있는지 유효성 검사를 해야 한다.
- 주문 정보와 주문 상세에 해당하는 정보를 저장해야 한다.

### 환불

- 주문에 쿠폰과 포인트가 사용되었다면 환불시 쿠폰과 포인트를 반환한다.
- 만약 쿠폰과 포인트의 만료기간이 지났다면 반환하지 않는다.
