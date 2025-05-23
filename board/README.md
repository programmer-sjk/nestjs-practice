# 게시판 프로젝트

- 게시판과 댓글을 달 수 있는 프로젝트
- 실시간으로 검색되는 키워드를 조회할 수 있어야 한다.

## 요구사항

### 게시글 (Post)

- 로그인 하지 않은 사용자는 게시글 목록과 특정 게시물을 조회할 수 있다.
- 로그인 한 사용자는 게시글 작성, 수정, 삭제가 가능하다.
- 특정 게시물 조회시 댓글과 대댓글이 함께 조회된다.
- 게시글이 삭제되면 댓글도 함께 삭제된다.
- 게시글은 키워드로 검색될 수 있다.
  - 이때 **`검색된 횟수에 따라 게시글 인기 검색어에서 조회할 수 있다`**.
  - 인기 검색어는 과거 데이터가 필요하지 않다고 가정하여 redis sorted set을 활용한다.
  - 해당keyword에 대해 **`sorted set에 incr를 수행한다`**.
  - event를 활용해 post 리스너가 sorted set에 작업을 수행한다.

### 댓글 (Comment)

- 댓글은 게시글의 댓글과, 댓글의 대댓글로 분류된다.
- 로그인 한 사용자는 댓글/대댓글을 작성, 수정, 삭제할 수 있다.
- parentId가 있는 경우 대댓글이 된다.

### 사용자 (User)

- 로그인 후, 자신이 작성한 전체 게시글을 조회할 수 있다.
- 로그인 후, 자신이 작성한 전체 댓글을 조회할 수 있다.

### 인기 검색어 (Keyword)

- 게시글에서 검색 API가 호출되면 redis sorted set에 keyword를 기준으로 score가 1 증가한다.
- 게시글에 대한 인기 검색어 API가 호출되면 `zrevrange` 메서드로 5개의 인기 검색어가 조회된다.
