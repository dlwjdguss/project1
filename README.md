# 📝 프로젝트 개요

 **Spring Boot  백엔드**와 **React + TypeScript 프론트엔드**로 구성된 게시판 서비스입니다.  
회원 인증, 게시글/댓글 CRUD, 파일 업로드 등 웹 서비스의 기능을 직접 설계·구현하는 것을 목표로 진행했습니다.

- CRUD(Create, Read, Update, Delete) 전반 구현  
- RESTful API 설계  
- JWT 기반 인증/인가 처리  
- 공통 Response 구조 및 에러 코드 관리  
- 테스트 코드 기반 안정성 확보  

---
# 사용기술
- ###  Back
  - Java, Spring Boot, Spring Web, mysql, Lombok, JPA
- ###  Front
  - React, TypeScript, JavaScript, CSS

- **개발환경** : VS Code, SpringBoot, Gradle, Lombok, JPA
---
##  프로젝트 목표

- CRUD 구현을 통해 백엔드 전반의 동작 흐름을 이해하는 것을 목표로 진행되었습니다.  

---

### 로그인
- Spring Security + JWT 기반 로그인  
- Access Token 인증 방식  
- 인증 실패 / 만료 토큰 처리  

### 회원가입
- 이메일 형식 검증  
- 비밀번호 정책 검증
  - 대소문자 포함  
  - 숫자 포함  
  - 특수문자 포함  
  - 최소 길이 조건  
- 이메일 중복 체크 API 구현  
- 유효성 검증 실패 시 코드 기반 응답 처리  

---

##  게시판 기능

### 게시글 등록
- 제목 글자 수 제한  
- 내용 글자 수 제한  
- 생성일 / 수정일 자동 관리  
- 작성자 정보 연동  

### 게시글 수정
- 작성자만 수정 가능  
- 권한 체크 로직 구현  
- 수정 권한 예외 처리  

### 게시글 조회
- 최신순 정렬  
- 사용자별 게시글 목록 조회  
- 삭제된 게시글 제외 처리

### 게시글 삭제
- Soft Delete 방식 적용  
- 실제 데이터 보존  
- 삭제 권한 검증  

---

##  댓글 기능

- 댓글 작성 / 조회  
- 로그인 사용자만 작성 가능  
- 댓글 작성자 본인만 삭제 가능  
- 게시글과 연관 관계 설정  

---

## 🖼 파일 업로드 기능

- Multipart/Form-Data 기반 파일 업로드  
- 프로필 이미지 변경 기능 구현  
- 업로드 후 URL 반환  
- 인증된 사용자만 업로드 가능  

---

##  권한 관리

- JWT 기반 사용자 인증  
- 게시글/댓글 작성자 권한 검증  
- 인증 실패 / 권한 없음 코드 분리 처리

---
## ✅ 구현 결과

### 👤 유저 관련 기능

| 로그인·로그아웃 | 닉네임 중복 체크 | 개인정보 수정 |
|------|-----------|---------------|
| ![Image](https://github.com/user-attachments/assets/b0b73d5e-87dc-4c57-8b9e-7f74593a915f)  | ![Image](https://github.com/user-attachments/assets/3cacd1fc-d972-43dd-95c3-b85233e4d8ea)      | ![Image](https://github.com/user-attachments/assets/91c46526-e3c9-4d52-b720-66823eebd9f7)          |

### 👤 게시판 관련 기능
| 글 작성 | 수정 | 삭제 | 
|--------|------|------|
| ![Image](https://github.com/user-attachments/assets/b5a5632a-3df4-434a-af5e-605e89ada4d5)    |   ![Image](https://github.com/user-attachments/assets/8d6ecfcb-317c-4e16-b264-ea3c09b18df2)| ![Image](https://github.com/user-attachments/assets/a918e727-ef34-41dc-ab90-05e61a844e78)  |

|댓글 작성   |      검색 |
|----------- |-----------|
| ![Image](https://github.com/user-attachments/assets/2670816f-7ea0-43ab-98b3-26f8c0cf259f)  | ![Image](https://github.com/user-attachments/assets/f13d29ad-8884-4719-bc8b-0a93185a464c)  |

---
## E-R 다이어그램
<img width="400" height="500" alt="erd" src="https://github.com/user-attachments/assets/af098c1f-4c9d-4e7c-b417-3b74528b9fea" />





