# 프로젝트 이름

<p align="center">
  <img src="https://github.com/TWOGATH3R/.github/assets/66842566/39335476-6b15-4ff3-be52-be5b47dbbd10">
</p>

# 프로젝트 소개 📓
- `TwoGather` 에서는 카테고리, 키워드, 지역, 가게명을 사용하여 가게를 검색하고 다양한 정렬순서로 정렬된 결과를 확인할 수 있습니다
- 가게를 등록해서 홍보를 할 수 있고, 리뷰를 작성할 수 있습니다. 작성한 리뷰엔 대댓글로 답변을 할 수 있습니다.
- 관리자 계정을 통해서 신청된 가게들을 승인/거부할 수 있습니다
- 로그인한 회원들은 자신의 정보를 변경하고 탈퇴할 수 있습니다
- 아이디나 비밀번호를 잃어버린 회원들은 자신의 정보를 찾을 수 있습니다

# Stacks :hammer:

<p><b>Environment</b></p>

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"></img>
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"></img>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></img>

<br/>

<p><b>Config</b></p>

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"></img>
<br/>

<p><b>Development</b></p>

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"></img>
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"></img>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"></img>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"></img>
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"></img>
<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"></img>
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"></img>
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"></img>
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"></img>

<br/>

# 화면구성 :computer:

|메인화면|검색 결과화면|
|---|---|
|![image](https://github.com/TWOGATH3R/twogather-web-frontend/assets/88264006/56f5213f-36f4-4d2f-bd5a-92b6ec01d52c)|![image](https://github.com/TWOGATH3R/twogather-web-frontend/assets/88264006/e947313e-a39e-4553-b2a6-ded4fdaa2a39)|

|회원가입 유형 선택|회원가입 Email 인증|회원가입 개인정보|
|---|---|---|
|![image](https://github.com/TWOGATH3R/twogather-web-frontend/assets/88264006/30e25001-5883-470b-8aed-94e6eec5e920)|![image](https://github.com/TWOGATH3R/twogather-web-frontend/assets/88264006/9d2b5df8-7c4f-4b3b-aa39-d7bbd1445be9)|![image](https://github.com/TWOGATH3R/twogather-web-frontend/assets/88264006/73265af6-4aab-489a-a8d4-43a0cf27399b)|

|아이디 찾기 인증|아이디 찾기 조회|
|---|---|
|![image](https://github.com/TWOGATH3R/twogather-web-frontend/assets/88264006/ab4a95d0-ad6f-4d55-beb5-e6ee120062b0)|![image](https://github.com/TWOGATH3R/twogather-web-frontend/assets/88264006/50e3de2c-d2c9-4ed4-9723-fe36c16f9d7c)|

# 배포주소 📎

site: https://twogather.netlify.app

# 팀원 :two_men_holding_hands:
| Frontend | Frontend | Frontend |
| :-----: | :-----: | :-----: |
| <img src="https://github.com/TWOGATH3R/.github/assets/66842566/f85e58c9-126d-4710-9253-269bc77e0bf8" width=400px height=190px alt="태욱"/> | <img src="https://github.com/TWOGATH3R/.github/assets/66842566/5c881f2e-c0a8-43dd-a301-51865d24deac" width=400px height=190px  alt="예정"> | <img src="https://avatars.githubusercontent.com/u/67773009?v=4" width=400px height=190px  alt="예찬"> |
|                    [태욱](https://github.com/taewok)                            |                          [예정](https://github.com/bananana0118)                 |    [예찬](https://github.com/eunyechan)                 |                      

# 주요 기능 :bulb: 
- <b>회원가입</b>
  - 고객,사업자로 회원가입 tab을 분리
- <b>검색</b>
  - 가게이름,카테고리,지역,키워드 등을 이용한 가게 검색 기능
  - 평점,리뷰,좋아요 등의 오름차순 내림차순 정렬
- <b>ID,PW 분실 대처</b>
  - 사용자의 NICKNAME과 EMAIL을 입력받아 인증코드 인증 확인 후 부분적인 ID를 보여줌
  - 사용자의 ID와 EMAIL을 입력받아 인증 로직후 해당 EMAIL로 임시 비밀번호 발급
- <b>댓글,사장님 댓글 작성</b>
  - 고객만이 작성 가능
  - 사장님만이 댓글에 대댓글을 남길 수 있다
  - 최신,오래된,별점 순으로 정렬 가능
- <b>좋아요</b>
  - 고객만이 가게에 좋아요를 추가/해제 할 수 있다
  - 자신이 좋아요한 가게는 mypage에 좋아요 tab에서 볼 수 있다
- <b>사용자 인터페이스</b>
  - 사용자의 권한에 따라 인터페이스 변화한다   

# 문제점 해결 ❗




