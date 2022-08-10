# myBlog
______
## 디렉토리 구조
```
.
├── app.js
├── routes
│   ├── index.js
│   ├── comments.js
│   └── posts.js
└── schemas
    ├── index.js
    ├── comment.js
    └── post.js
```

_______________________
## API 명세서

## <a href='.\Process_specification\api.md'>Go</a>

_______________
## 변수 명세서

## <a href='.\Process_specification\variable.md'>Go</a>
__________
## 데이터베이스

## <a href='.\Process_specification\database.md'>Go</a>

___________
# env 환경변수설정
.env파일 생성 
- DB_USER=데이터베이스 이름
- DB_PASSWORD=데이터베이스 비밀번호
- DB_NAME=테이블이름
- DB_END_POINT=엔드포인트
- DB_PORT=데이터베이스 포트
- EXPRESS_PORT=express 포트
- SECRET_KEY=jwt암호키

_______________
# npm
- "cors"
- "dotenv"
- "express"
- "jsonwebtoken"
- "nodemon"
- "sequelize"