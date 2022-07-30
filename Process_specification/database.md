|이름|유형|기능|
|---|----|---|
|User|
|userId|Int|유저번호|
|nickName|varChar(255)|닉네임|
|password|varChar(255)|비밀번호|
|createdAt|Date|생성날짜|
|updatedAt|Date|수정날짜|
|Post|
|postId|Int|글번호|
|postTitle|varChar(255)|글제목|
|postName|varChar(255)|글쓴이|
|postPassword|varChar(255)|비밀번호|
|createdAt|Date|작성날짜|
|updatedAt|Date|수정날짜|
|postContent|varChar(255)|글내용|
|Comment|
|postId|Int|계시된 글번호|
|commentId|Int|댓글번호|
|commentName|varChar(255)|작성자|
|createdAt|Date|작성날짜|
|updatedAt|Date|수정날짜|
|commentContent|varChar(255)|댓글내용|
|Like|
|postId|Int|글 번호|
|UserId|Int|유저 번호|
