# DIP 프로젝트

- 기존 service가 repository를 호출하는 구조에선 고수준 모듈이 저수준 모듈에 의존성을 갖게 됨
- 우선 service가 repository를 호출하는 구조로 만들고, DIP를 활용해 service가 인터페이스를 의존하도록 구성
- user CRUD 기능을 사용하며, 기능 자체에 중점을 둔건 아니라서 패스워드 암호화나 테스트 코드는 제외.
