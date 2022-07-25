
## <center>API 명세서</center>

|기능|API URL|Method|
|------|---|---|
|게시글 목록|/api/posts|GET|
|게시글 작성|/api/posts|POST|
|게시글 조회<Br>댓글 목록|/posts/:_postId|GET|
|게시글 수정|/api/posts/:_postsId|PUT|
|게시글 삭제|/api/posts/:_postsId|DELETE|
|댓글 작성|/api/posts/:postId/comments|POST|
|댓글 수정|/api/posts/:postId/:_commentId|PUT|
|댓글 삭제|/api/posts/:postId/:_commentId|DELETE|
