# 검색어 자동 완성 서비스

## 요구사항

- 가정
  - 사용자가 검색어를 입력할 때마다 비동기로 저장소에 기록된다.
  - 하루에 한 번 배치가 돌면서 일별로 검색된 키워드의 count를 계산한다.
- 사용자가 입력한 키워드에 가장 많이 검색된 순으로 5개를 전달한다.

### 구현할 기능

- search_daily_sum 테이블에 저장된 데이터를 기반으로 trie를 구성한다.
- API가 요청오면 가장 많이 검색된 순으로 자동 완성 키워드를 5개 응답한다.