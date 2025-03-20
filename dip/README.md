# DIP 프로젝트

- 기존 service가 repository를 호출하는 구조에선 고수준 모듈이 저수준 모듈에 의존성을 갖게 됨
- 우선 service가 repository를 호출하는 구조로 만들고, DIP를 활용해 service가 인터페이스를 의존하도록 구성
- user CRUD 기능을 사용하며, 기능 자체에 중점을 둔건 아니라서 패스워드 암호화나 테스트 코드는 제외.

## 결론 정리

- service에서 repository의 API들을 직접 사용하면, ORM이 바뀌거나 DB가 바뀔경우 저수준 모듈에 의해 고수준 모듈인 service의 코드에 수정이 발생.
- DIP를 적용해 repository가 아닌 인터페이스를 구현하는 adaptor를 주입받아 사용. 이 경우 ORM이 바뀌거나 DB가 바뀌어도 adaptor에 영향이 있지 비지니스 로직이 있는 service에는 영향을 받지 않음.
- 다만 실제 ORM이 바뀌거나 DB가 바뀌는 경우가 드물기 때문에, 인터페이스와 adaptor를 추가로 개발한다는 점에서 분명 단점도 존재. 팀이나 프로젝트에 따라 결정해서 사용하면 될듯.
