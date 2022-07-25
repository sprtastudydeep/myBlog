## <center>변수 명세서</center>
|url,기능|변수 이름|변수 기능(타입)|제한조건|
|------|----------|---|----|
|(get)/api/posts|
|게시글 목록|posts|게시글 목록(Query:{title,name,date})|date내림차순|
|(post)/api/posts|
|게시글 작성|postId(*)|게시글 번호(Number)|
|게시글 작성|postTitle|제목|
|게시글 작성|postName|작성자|
|게시글 작성|postPassword|비밀번호|
|게시글 작성|postContent|내용|
|(get)/api/posts/:postId|
|게시글 조회|postId|게시글 번호(Number)|
|게시글 조회|post|게시글 정보(Object:id,title,name,date,content)|
|댓글 목록|comments|댓글 목록(Object:id,date,content)|날짜기준<br>내림차순|
|(put)/api/posts/:postId|
|게시글 수정|body|입력(Object:id,password,title,content)|
|(delete)/api/posts/:postId|||하위댓글삭제|
|게시글 삭제|postId|게시글 번호(Number)|
|게시글 삭제|body|입력(Object:password)|
|게시글 삭제|exist|id를 기준으로 post탐색|
|(post)/api/posts/:postId/comment|
|댓글 작성|postId|게시글 번호(Number)|
|댓글 작성|commentId|댓글 번호(Number)|
|댓글 작성|commentName|댓글 작성자(String)|
|댓글 작성|commentContent|댓글 내용(String)|content==null<BR>-"댓글내용을 입력해주세요"|
|(put)/api/posts/:postId/:commentId|
|댓글 수정|postId|게시글 번호(Number)|
|댓글 수정|commentId|글번호 (Number)|
|댓글 수정|commentContent|글내용(String)|content==null<BR>-"댓글내용을 입력해주세요"|
|(delete)/api/posts/:postId/:commentId|
|댓글 삭제|postId|게시글 번호(Number)|
|댓글 삭제|commentId|글번호 (Number)|
|댓글 삭제|exist|comment탐색|