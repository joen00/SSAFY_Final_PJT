# ** 다나와 홈즈 **

# 목차

1. **개요**
    1. **개발 동기 및 기대 효과**
    2. **시장분석: 유사한 제품 및 서비스의 장단점 분석, 차별화 전략 기술**
    3. **개발 일정 관리표**
    4. **요구사항 정의서**
2. **개발언어/ 프로그램, 필수 라이브러리/오픈소스**
3. **기능 및 설명**
    1. **아파트 매매 정보를 이용한 매물 정보 검색 서비스**
    2. **맞춤 주택 추천 서비스**
    3. **관심 매물 보기 서비스**
    4. **회원 서비스**
    5. **Q & A 게시판**
    6. **Q& A 게시판**
    7. **챗봇 API**
4. **화면 설계서**
5. **사용 데이터**
    1. **공공데이터 API**
    2. **테이블 구조도(ERD)**
    3. **클래스 다이어그램**

## 1. 개요

### 1 - 1. 개발 동기 및 기대 효과

코로나 펜더믹으로 부동산에 방문해 집을 보러 갈 수 없고 원하는 조건에 맞게 어떤 아파트를  구할지 고민하는 사람들이 많습니다. 이러한 분들을 위해 제공합니다. 매물 정보를 알아볼 때 사용자 관점에 따라 중요하게 생각하는 카테고리가 다르다.  단순히 매물 정보만을 보여주는 것이 아니라 교통, 편의시설 등 원하는 조건에 맞는 매물 맞춤 추천 서비스를 제공한다. 또한 직관적인 UI를 통해 편리하고 간편한 서비스를 제공하고 게시판을 통해 지역 소통 활성화시킨다.

### 1 - 2. 시장분석: 유사한 제품 및 서비스의 장단점 분석, 차별화 전략 기술

**다방**

장점 : 지도를 통해 매물의 위치 정보를 제공합니다. 또한 동네의 편의 시설을 제공합니다. 

단점 : 매물의 정보는 현재 거래 매물만 알 수 있고 조건에 맞는 추천 매물은 없습니다. 

**다나와 홈즈**

지난 3년간의 거래 데이터 제공, 게시판을 통한 다양한 정보 제공기능, 원하는 지역 아파트 관련 Naver news데이터 제공, 주변 편의 시설의 구체적인 정보 제공, 사이트 정보 제공

### 1 - 3. 개발 일정 관리표

<img src="/img/Untitled.png"  width="700" height="370">

### 1 - 4. 요구사항 정의서

<img src="/img/Untitled (1).png"  width="700" height="370">

## 2. 개발언어/ 프로그램, 필수 라이브러리/오픈소스

JAVA/ STS/ Tomcat/ MYSQL 8.0

Spring Framework /Spring Boot Framework

Spring Security, Spring JWT

MyBatis Framework

Vue.js / javaScript / Vuetify

## 3. 기능 및 설명

### 3 - 1. 아파트 매매 정보를 이용한 매물 정보 검색 서비스

- 시도, 구군, 법정동, 거래년월을 선택하여 아파트 매물 정보를 검색한다.
    
    공공데이터 API를 가져와 DB에 저장한 후 REST API 방식의 비동기 통신으로 선택시 다음 옵션을 선택할 수 있도록 만든다. 선택된 옵션 정보를 통해 검색에 맞는 데이터를 가져와 보여준다.
    
- 매물 위치 정보
    
    카카오맵 API를 이용하여 검색한 매물의 위치 정보들을 지도를 통해 확인 가능.
    
- 관련 뉴스
    
    선택한 법정동에 대한 아파트 관련 뉴스 기사를 NAVER API를 통해 가져오고 제목에 링크를 걸어 뉴스 페이지로 이동시켰다.
    
- 로그인 후 해당 매물에 대한 관심 매물 등록 기능을 제공한다.

### 3 - 2. 맞춤 주택 추천 서비스

**매물과 주변 편의 시설과의 거리 점수를 합산하여 매물 추천**

- 교통
    
    선택한 법정동에 해당하는 매물들과 지하철, 버스 정류장, 따릉이 대여소 위치 정보를 거리 순으로 정렬하여 추천하여 보여지게 된다.
    
    1. 동에 해당하는 아파트 정보들에서 중복된 아파트 이름을 제거하여 아파트 list를 만들고 속도를 빠르게 하였다.
    2. 서울시 공공데이터 API를 통해 지하철역 List, 버스 정류소 List, 따릉이 위치 List를 가져오는 DB를 설계했다.
    3. 아파트 위도 경도와 (지하철 역, 버스 정류소, 따릉이 위치) 위도 경도를 이용해 직선 거리 m을 구해줬다. 
    4. 지하철역은 500m, 버스 100m, 따릉이 100m이내에 있는 갯수를 구해 지하철은 5점, 버스는 3점, 따릉이는 1점의 점수표를 구했다.
    5. 점수표를 기준으로 정렬하여 상위 3개의 데이터를 뽑았다. 이를 통해 상위 3개 아파트의 (지하철역, 버스 정류소, 따릉이 위치)의 상세 정보와 직선 거리를 보여줬다. 

**추천 매물 아파트 거래내역 통계 정보**

- **추천정보의 아파트 이름 클릭 시**
    1.  최근 3년동안 해당 지역의 해당 아파트 거래 내역을 **표**로 나타낸다.
    2. 최근 3년동안 해당 아파트의 거래 금액을 **그래프**로 나타낸다.

- **반려동물**
    
    선택한 법정동에 해당하는 매물과 매물 주변 동물 병원, 동물 약국 위치 정보를 거리 순으로 정렬하여 추천하여 보여지게 된다. 
    
    1. 동에 해당하는 아파트 정보들에서 중복된 아파트 이름을 제거하여 아파트 list를 만들고 속도를 빠르게 하였다.
    2. 서울시 공공데이터 API를 통해 동물병원 list와 동물약국 list를 가져오는 DB를 설계했다.
    3. 아파트 위도 경도와 (동물병원, 동물약국) 위도 경도를 이용해 직선 거리 m을 구해줬다. 
    4. 동물병원 500m, 동물약국 500m이내에 있는 갯수를 구해 갯수만큼 더해줘 점수표를 구했다.
    5. 점수표를 기준으로 정렬하여 상위 3개의 데이터를 뽑았다. 이를 통해 상위 3개 아파트의 (동물병원 , 동물약국)의 상세 정보와 직선 거리를 보여줬다. 
    

### 3 - 3. 관심 매물 보기 서비스

- 관심 매물 정보 데이터베이스를 설계하여 회원 아이디별 관심 매물 기능을 제공한다.
- 회원 별 관심 매물에 대한 상세 정보 보기 서비스를 제공한다.
- 관심 매물 삭제 기능을 추가하여 관심 목록에서 제거할 수 있다.

### 3 - 4. 회원 서비스

- **로그인**
    1. JWT(JSON WEB TOKEN) 토큰 인증 방식을 통한 회원 로그인 제공한다.
    2. 토큰이 만료되면 재 로그인하라는 알림 메세지가 나오게 되며 로그 아웃되고 로그인 창으로 이동하게 된다.
    
- **회원가입**
    1. 회원 정보(아이디, 비밀번호, 이름, 연락처)를 바탕으로 회원가입을 진행할 수 있다.
    2. 회원 정보는 모두 입력하여야 회원가입이 완료된다.
    3. 비밀번호는 암호화하여 데이터베이스에 저장하여 노출되지 않는다.

### 3 - 5. Q & A 게시판

- 지역구 게시판 보기
    1. Mybatis 동적쿼리를 이용하여 원하는 지역구를 여러 개 선택하여 게시글 조회가 가능하다.
    2. 지역구를 선택, 삭제할 때마다 보여지는 게시글이 갱신되어 보여진다.
    
- 게시판 글쓰기, 수정, 삭제 기능 제공
    
    지역구를 선택하여 게시판 글 쓰기 기능
    
    내가 쓴 글에 한하여 수정 및 삭제 기능 제공
    
- 댓글 달기 기능 제공
    
    회원 로그인 후 모든 게시글에 댓글 추가 기능
    

### 3 - 6. 챗봇 API

- 챗봇 기능
    1. 채널톡 챗봇 API를 사용하여 홈페이지에 챗봇 기능을 제공한다.
        
        [https://channel.io/ko](https://channel.io/ko)
        

챗봇을 통해 사이트 이용 가이드를 볼 수 있는 기능을 제공한다.

상담원 문의를 통해 서비스 매니저에게 다이렉트 문의 기능을 제공한다.

## 4. 화면 설계서

**[INDEX]**

<img src="/img/Untitled (2).png"  width="700" height="370">

<img src="/img/Untitled (3).png"  width="700" height="370">

<img src="/img/Untitled (4).png"  width="700" height="370">

<img src="/img/Untitled (5).png"  width="700" height="370">

<img src="/img/Untitled (6).png"  width="700" height="370">

<img src="/img/Untitled (7).png"  width="700" height="370">

<img src="/img/Untitled (8).png"  width="700" height="370">

<img src="/img/Untitled (9).png"  width="700" height="370">

<img src="/img/Untitled (10).png"  width="700" height="370">

**[APTMAIN]**

<img src="/img/Untitled (11).png"  width="700" height="370">

<img src="/img/Untitled (12).png"  width="700" height="370">

<img src="/img/Untitled (13).png"  width="700" height="370">

**[BOARD]**

<img src="/img/Untitled (14).png"  width="700" height="370">

<img src="/img/Untitled (15).png"  width="700" height="370">

<img src="/img/Untitled (16).png"  width="700" height="370">

<img src="/img/Untitled (17).png"  width="700" height="370">

**[STATION]**

<img src="/img/Untitled (18).png"  width="700" height="370">

<img src="/img/Untitled (19).png"  width="700" height="370">

<img src="/img/Untitled (20).png"  width="700" height="370">

<img src="/img/Untitled (21).png"  width="700" height="370">

**[ANIMAL]**

<img src="/img/Untitled (22).png"  width="700" height="370">

<img src="/img/Untitled (23).png"  width="700" height="370">

**[LOGIN]**

<img src="/img/Untitled (24).png"  width="700" height="370">

**[JOIN]**

<img src="/img/Untitled (25).png"  width="700" height="370">

**[장바구니]**

<img src="/img/Untitled (26).png"  width="700" height="370">

## 5. 사용 데이터

### 5 - 1. 공공데이터 API

- 교통
    - ****서울시 지하철역 위치정보****
     [http://data.seoul.go.kr/dataList/OA-21212/S/1/datasetView.do](http://data.seoul.go.kr/dataList/OA-21212/S/1/datasetView.do)
    - **서울시 버스정류소 좌표 데이터**
     [https://www.data.go.kr/data/15051741/fileData.do?recommendDataYn=Y](https://www.data.go.kr/data/15051741/fileData.do?recommendDataYn=Y)
    - ****서울시 공공자전거 따릉이 대여소 정보****
     [https://data.seoul.go.kr/dataList/OA-13252/F/1/datasetView.do](https://data.seoul.go.kr/dataList/OA-13252/F/1/datasetView.do)

- 동물
    - ****서울시 동물병원 인허가 정보****
        
        [https://data.seoul.go.kr/dataList/OA-16007/S/1/datasetView.do](https://data.seoul.go.kr/dataList/OA-16007/S/1/datasetView.do)
        
    - ****서울시 동물약국 인허가 정보****
        
        [https://data.seoul.go.kr/dataList/OA-16008/S/1/datasetView.do](https://data.seoul.go.kr/dataList/OA-16008/S/1/datasetView.do)
        

- 아파트
    - **법정 동 코드**
        
        [https://www.code.go.kr/stdcode/regCodeL.do](https://www.code.go.kr/stdcode/regCodeL.do)
        
    - **전국 아파트 매매 공공 데이터**
        
        [https://www.data.go.kr/dataset/3050988/openapi.do](https://www.data.go.kr/dataset/3050988/openapi.do)
        

### 5 - 2. 테이블 구조도(ERD)

<img src="/img/ERD.png"  width="700" height="370">

### 5 - 3. 클래스 다이어그램

BasePackage : com.ssafy.home

5-3-1 Package : apt, animal

<img src="/img/classDiagram1.PNG.png"  width="700" height="370">


5-3-2 board, member, station

<img src="/img/classDiagram2.PNG.png"  width="700" height="370">

전체

<img src="/img/Untitled (27).png"  width="700" height="370">

자세히 보기

<img src="/img/Untitled (28).png"  width="700" height="370">

<img src="/img/Untitled (29).png"  width="700" height="370">

<img src="/img/Untitled (30).png"  width="700" height="370">

<img src="/img/Untitled (31).png"  width="700" height="370">
