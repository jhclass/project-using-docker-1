### [Nestjs project using docker]

## Docker Compose

- NestJs Application
- PostgreSQL
- Redis
- kafka (broker,Zookeeper)

## Nestjs

- 모듈화 된 아키텍처
- 타입스크립트 기반
- 대규모 애플리케이션 개발에 적합한 구조
- 다중 프로토콜 지원
- 유연한 확장성, 호환성성
- 테스트 친화적
- 미들웨어 및 인터셉터 제공
- 마이크로 서비스 아키텍처

## GraphQL

- 클라이언트가 필요한 데이터를 정확히 요청할 수 있도록 지원.
- Prisma ORM 과 통합하여 데이터베이스와 상호작용 최적화.

## REST API

- http 요청-응답방식으로 데이터 처리.
- GraqhQL 과 병행하여 특정 목적에 맞게 구현.

## Redis

- 데이터 캐싱과 비동기 작업관리.
- 인증토큰 저장 및 세션 관리 통한 성능 최적화.
- 현재 서버는 Redis 서버와 연결해 캐싱된 데이터를 읽거나 메시지를 주고 받음.

## Kafka

- 현재 서버가 producer로 동작하여 데이터를 Kafka 서버로 전송.
- 다른 서버들이 Kafka 서버에서 데이터를 소비.

## WebSocket

- Socket.IO 사용.
- 클라이언트와 서버간 양방향 실시간 데이터 교환.
- 실시간 채팅이나 알림에 적용.
- RxJS 와 통합.

## Prisma ORM

- PostgreSQL 과 상호작용 단순화.

## postgreSQL

- 관계형 데이터 베이스로 애플리케이션 주요 데이터 관리.
