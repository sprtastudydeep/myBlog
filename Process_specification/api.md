
## <center>API 명세서</center>

|API URL/Method|request|response|desc|
|------|---|---|----|
|/posts[GET]|{}|{"posts": <BR>[<BR>{"_id": <BR>"62de86b61ed86dfd0f4c67e4",<BR>"postTitle":"test",<BR>"postName": "choi",<BR>"createdAt": "2022-07-25T12:04:06.580Z"},<BR>{"_id": "62de44961ed86dfd0f4c67dd",<BR>"postTitle": "edit",<BR>"createdAt": "2022-07-25T07:21:58.342Z"},<BR>{"_id": "62de44921ed86dfd0f4c67da",<BR>"postTitle": "test",<BR>"postName": "choi",<BR>"createdAt": "2022-07-25T07:21:54.777Z"}<br>]<BR>}}|게시판 목록|
|/posts[POST]|{"postTitle":"test"<BR>, "postName":"choi"<BR>,postContent":"teset_content hello?"<BR>,"postPassword":"1234"}||게시글 작성|
|/posts/:postId[GET]|{}|{<BR>"post": {<BR>"postId": 1,<BR>"postTitle": "test",<BR>"postName": "choi",<BR>"postContent": "teset_content hello?",<BR>"createdAt": "2022-07-25T07:21:54.777Z",<BR>"updatedAt": "2022-07-25T07:21:54.777Z"},<BR>"comments": <BR>[<BR>{"postId": 1,<BR>"commentId": 1,<BR>"commentName": "comment",<BR>"commentContent": "this is comment",<BR>"createdAt": "2022-07-25T12:16:20.105Z",<BR>"updatedAt": "2022-07-25T12:16:20.105Z"}<BR>]<BR>}|게시글 조회,댓글들 조회|
|/posts/:postId[PUT]|{"postTitle":"edit3"<BR>, "postContent":""<BR>,"postPassword":"1234"}|{}|게시글 수정|
|/posts/:postId[DELETE]|{}|{}|게시글 삭제|
|/posts/:postId/comments[POST]|{"commentName":"comment",<BR>"commentContent":"this is comment"}||댓글 작성|
|/posts/:postId/:commentId[PUT]|{"commentContent":"edit3"}||댓글 수정|
|/posts/:postId/:commentId[DELETE]|{}|{}|댓글 삭제|
