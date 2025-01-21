# Gracefully Shutdown

## 요구사항

- NestJS에서 gracefully shutdown을 구현하기 위한 프로젝트
- ECS에선 scale-in 될 때 SIGTERM 시그널이 컨테이너로 전달됨.
  - 어플리케이션이 SIGTERM을 받고 현재 요청과 DB 커넥션 종료 후 정상 종료되어야 함
