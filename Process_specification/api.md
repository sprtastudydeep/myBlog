
## <center>API 명세서</center>

|API URL/Method|request|response|desc|
|------|---|---|----|
|/login[POST]|||로그인 처리|
|/login/signup[POST]|||회원가입|
|/posts/like[GET]|||게시판 좋아요(O/X)|
|/posts/:postId/like[GET]|||좋아요한 게시판목록|
|/posts[GET]|||게시판 목록|
|/posts[POST]|||게시글 작성|
|/posts/:postId[GET]|||게시글 조회|
|/posts/:postId[GET]|||댓글들 조회|
|/posts/:postId[PUT]|||게시글 수정|
|/posts/:postId[DELETE]|||게시글 삭제|
|/posts/:postId/comments[POST]|||댓글 작성|
|/posts/:postId/:commentId[PUT]|||댓글 수정|
|/posts/:postId/:commentId[DELETE]|||댓글 삭제|
