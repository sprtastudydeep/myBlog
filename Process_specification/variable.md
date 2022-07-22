## <center>변수 명세서</center>
|페이지 기능|변수 이름(>:전송,<:요청,*:할당)|변수 기능(타입)|제한조건|
|------|----------|---|----|
|게시글 목록|
|게시글 목록|요청|
|게시글 목록|posts(<)|게시글 목록(Array:id,title,name,date)|date내림차순|
|게시글 작성|
|게시글 작성|할당|
|게시글 작성|postId(*)|게시글 번호(Number)|
|게시글 작성|postDate(*)|작성 날짜(Date)|
|게시글 작성|전송|
|게시글 작성|postTitle(>)|게시글 제목(String)|
|게시글 작성|postName(>)|작성자 이름(String)|
|게시글 작성|postPassword(>)|작성자 비밀번호(String)|
|게시글 작성|postContent(>)|게시글 내용(String)|
|게시글 조회|
|게시글 조회|전송|
|게시글 조회|postId(>)|게시글 번호(Number)|
|게시글 조회|요청|
|게시글 조회|post(<)|게시글 정보(Array:id,title,name,date,content)|
|게시글 수정|
|게시글 수정|전송|
|게시글 수정|inputPassword(>)|입력된 비밀번호(Number)|'=='|
|게시글 수정|postEditId(>)|글번호 (Number)|
|게시글 수정|postEditTitle(>)|글제목(String)|
|게시글 수정|postEditContent(>)|글내용(String)|
|게시글 삭제|
|게시글 삭제|전송||하위댓글삭제|
|게시글 삭제|inputPassword(>)|입력된 비밀번호(Number)|'=='|
|게시글 삭제|postId(>)|게시글 번호(Number)|
|댓글 목록|
|댓글 목록|전송|
|댓글 목록|postId(>)|게시글 번호(Number)|
|댓글 목록|요청||date내림차순|
|댓글 목록|comments(<)|댓글 목록(Array:id,date,content)|date내림차순|
|댓글 작성|
|댓글 작성|할당|
|댓글 작성|commentId(*)|댓글 번호(Number)|
|댓글 작성|commentDate(*)|작성 날짜(Date)|
|댓글 작성|전송||content==null<BR>-"댓글내용을 입력해주세요"|
|댓글 작성|postId(>)|게시글 번호(Number)|
|댓글 작성|commentContent(>)|댓글 내용(String)|
|댓글 수정|
|댓글 수정|전송||content==null<BR>-"댓글내용을 입력해주세요"|
|댓글 수정|commentEditId(>)|글번호 (Number)|
|댓글 수정|commentEditContent(>)|글내용(String)|
|댓글 삭제|
|댓글 삭제|전송|
|댓글 삭제|commentId(>)|댓글 번호(Number)|