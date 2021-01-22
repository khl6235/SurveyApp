## 개인 과제 설계

> 간단한 설문을 생성하고 조회하는 기능 구현 프로젝트

---

#### ✅ 최소 요구사항

- 로그인
- 설문 목록 조회
- 설문 생성(객관식, 주관식)
- 설문 조회

(추가 기능)

+ 회원가입
+ 설문 응답
+ 설문 삭제

<br>

#### 🔧 STACK

- Spring Boot + Mybatis + MySQL
- React

<br>

#### 📊 Flow Chart

<div align="center" style="display: flex;"><img src="https://user-images.githubusercontent.com/41534832/105440175-79587200-5ca9-11eb-8133-c8a96f35881f.png" width="80%"></div>

<br>

#### 📋 명세서

| | FE | BE |
| --- | --- | --- |
| 로그인 | / | [POST] /users/login |
| 회원가입 | /signup | [POST] /users/signup |
| 설문 목록 | /forms | [GET] /forms |
| 설문 조회 | /forms/:formIdx | [GET] /forms/:formIdx |
| 설문 응답 | /forms/:formIdx/reply | [POST] /forms/:formIdx |
| 설문 생성 | /forms/create | [POST] /forms |
| 설문 삭제 |   | [DELETE] /forms/:formIdx

<br>

#### 📝 ERD

<div align="center" style="display: flex;"><img src="https://user-images.githubusercontent.com/41534832/105440719-701bd500-5caa-11eb-9c84-fb5113fc7c3c.png" width="70%"></div>

<br>

- `user` : 회원 정보
- `user_form` : (현재 사용되지 않는 테이블) 회원별로 수신한 설문 정보
- `form` : 설문 정보
- `content` : 설문 안에 들어가는 객관식과 주관식 문항 정보
- `obj_entry` : 객관식 문항의 선택지 정보
- `obj_result` : 객관식 문항 응답 결과 정보
- `subj_result` : 주관식 문항 응답 결과 정보

<br>

---

### 기능 설명

#### 📌 로그인

![image](https://user-images.githubusercontent.com/41534832/105445230-bd9c4000-5cb2-11eb-881f-7acea8828e28.png)

<br>

**FE)** / <br>
**BE)** [POST] /users/login

- 실행 시 가장 먼저 나오는 화면.
- FE에서 BE로 UserVO 타입의 사용자 입력 값을 전송하고, DB user 테이블에서 select.

  ```java
  public class UserVO {
	int userIdx;
	String id;
	String password;
  }
  ```

- 로그인 시 브라우저에 사용자 정보를 저장하는 sessionStorage 이용.
  - 브라우저가 바뀌거나 같은 브라우저의 새로운 탭에서 실행 시 초기화 => 일회성 로그인.
  - 추후 JWT 이용하여 토큰 기반 인증 구현.

- ID, PASSWORD 미입력 시 팝업 알림.
- DB에 해당하는 사용자 정보가 없을 시 팝업 알림.
- 로그인 성공 -> 설문 목록(/forms)
- 회원가입 버튼 -> 회원가입(/signup)

<br>

#### 📌 회원가입

![image](https://user-images.githubusercontent.com/41534832/105446499-94c97a00-5cb5-11eb-9b45-e35fce216077.png)

<br>

**FE)** /signup <br>
**BE)** [POST] /users/signup

- 로그인과 비슷하지만 비밀번호 일치 여부를 확인하기 위해 passwordCheck 프로퍼티 추가.
- FE에서 BE로 UserVO 타입의 사용자 입력 값을 전송하고, DB user 테이블에 insert.
- FE) password와 passwordCheck가 동일한 문자열이 아닐 경우, TextField에 error 띄워서 사용자에게 알림.
- BE) DB에 있는 ID인지 먼저 체크하여 이미 있는 ID인 경우 웹에서 팝업 알림. 고유한 ID일 경우에만 회원가입 가능.
- 회원가입 성공 -> 로그인(/)

<br>

#### 📌 설문 목록

![image](https://user-images.githubusercontent.com/41534832/105446806-3a7ce900-5cb6-11eb-91e3-ceed669c092f.png)

<br>

**FE)** /forms <br>
**BE)** [GET] /forms

- 가장 메인이 되는 화면.
- BE) form 테이블에 있는 데이터를 FormVO 타입에 매핑하여 List 형태로 전송.

  ```java
  public class FormVO {
	int formIdx;
	String userId;
	String title;
	Date createdAt;
  }
  ```

- FE) 리스트로 받은 데이터를 `componentDidMount()` 사용하여 바로 화면에 테이블 형태로 출력.
- 응답하기 버튼 -> 설문 응답(/forms/:formIdx/reply)
- 결과 조회 버튼 -> 설문 조회(/forms/:formIdx)
- 설문 생성 버튼 -> 설문 생성(/forms/create)
- 로그아웃 버튼 -> 로그인(/)

  - 로그인 시 sessionStorage에 저장했던 값들 clear.
  - 토큰 인증 방식을 이용하게 되면 액세스 토큰 만료.

<br>

#### 📌 설문 조회

![image](https://user-images.githubusercontent.com/41534832/105447470-a01da500-5cb7-11eb-841e-a3a70e8f525f.png)
![image](https://user-images.githubusercontent.com/41534832/105447498-add32a80-5cb7-11eb-87c5-c22a503e9df0.png)

<br>

**FE)** /forms/:formIdx <br>
**BE)** [GET] /forms/:formIdx

- 한 설문에 여러 개의 문항 포함, 문항 종류는 객관식과 주관식 -> `계층적 컴포넌트` 이용
- BE) 구조체 클래스 생성.(ResultForm, ContentInfo)

  ```java
  public class ResultForm {
	public FormVO formInfo;
	public List<ContentInfo> contentInfo;
  }
  ```
  ```java
  public class ContentInfo {
	public ContentVO contentDetail;
	public List<EntryVO> entryDetail;
	public List<ObjResultVO> objResultDetail;
	public List<SubjResultVO> subjResultDetail;
  }
  ```
  ```java
  public class ContentVO {
	int contentIdx;
	int formIdx;
	String question;
	String description;
  }
  ```
  ```java
  public class EntryVO {
	int entryIdx;
	int contentIdx;
	String entry;
  }
  ```
  ```java
  public class ObjResultVO {
	int userIdx;
	int entryIdx;
  }
  ```
  ```java
  public class SubjResultVO {
	int userIdx;
	int contentIdx;
	String answer;
  }
  ```

- FE) 가장 상위 컴포넌트인 `FormResultComponent`의 formInfo에는 설문 전체 제목, 작성자, 작성 시간 등 FormVO 정보 저장. contentInfo 배열에 문항 각각의 정보를 저장했고, 문항 개수만큼 반복문을 돌아 하위 컴포넌트인 `ContentComponent` 렌더링.
- objResultDetail(objResultVO), subjResultDetail(subjResultVO) 검사하여 객관식과 주관식 판단.

  - 객관식 -> 선택지별 결과 총계
  - 주관식 -> 답변 리스트

- 목록으로 버튼 -> 설문 목록(/forms)

<br>

#### 📌 설문 응답

![image](https://user-images.githubusercontent.com/41534832/105448646-fe4b8780-5cb9-11eb-846c-9b84e3b64113.png)
![image](https://user-images.githubusercontent.com/41534832/105448668-0a374980-5cba-11eb-9d43-56f313143f21.png)

<br>

**FE)** /forms/:formIdx/reply <br>
**BE)** [POST] /forms/:formIdx

- 설문의 기본 정보 formInfo, 문항들 정보 배열 contentInfo, 문항에 따른 사용자의 답변 배열 replyInfo.
- 계층적 컴포넌트를 사용했고, 객관식과 주관식의 답변 폼 차이를 위해 **조건부 렌더링** 이용.
- FE) 최상위 컴포넌트인 `FormReplyComponent`에서 formInfo를 렌더링하고, 설문에 포함된 문항 개수만큼 반복문을 돌아 하위 컴포넌트인 `ReplyContentComponent`에 contentInfo 전달.

  - ReplyContentComponent에서 객관식, 주관식 문항이 공통으로 가지고 있는 question, description을 렌더링
  - 하위 컴포넌트인 `MatchContentComponent`에서 props로 전달받은 contentInfo의 객관식 선택지 정보 유무로 조건부 렌더링.

    - 객관식 -> 라디오 버튼
    - 주관식 -> TextField

- 하위 컴포넌트에서 state로 수집한 응답 정보들은 함수를 통해 상위 컴포넌트로 전달되어, Submit 버튼 클릭 시 Body에 담겨 통신
- BE) replyInfo의 리스트 형태로 RequestBody를 받음.
- 구조체 클래스 생성(ReplyInfo)

  ```java
  public class ReplyInfo {
	public int contentIdx;
	public int objReply;
	public String subjReply;
	public int userIdx;
  }
  ```

- 문항 하나당 한 번씩 통신을 하도록 했었으나, 설문 하나에 해당하는 모든 문항의 응답 정보를 한번에 받아오도록 수정하였음.
- 목록으로 버튼 -> 설문 목록(/forms)

<br>

#### 📌 설문 생성

![image](https://user-images.githubusercontent.com/41534832/105449230-4ae39280-5cbb-11eb-81c0-af70e65ebf39.png)
![image](https://user-images.githubusercontent.com/41534832/105449249-59ca4500-5cbb-11eb-819a-e0a32c380deb.png)

<br>

**FE)** /forms/create <br>
**BE)** [POST] /forms

- '+객관식', '+주관식' 버튼을 통해 동적으로 문항을 생성할 수 있음.
- 'X' 버튼을 통해 동적으로 문항을 삭제할 수 있음.
- FE) 최상위 컴포넌트인 `FormCreateComponent`에서 하위 컴포넌트인 `CreateContentComponent`를 두어 '+객관식', '+주관식' 버튼과 문항 리스트를 나타냄.

  - CreateContentComponent에서는 객관식/주관식 버튼을 누름에 따라 다른 템플릿을 생성하도록 하기 위해 `MatchCreateContentComponent`라는 하위 컴포넌트를 둠.
  - MatchCreateContentComponent에서는 상위에서 받아온 props의 contentType에 따라 조건부 렌더링이 되도록 하고, 이 중 객관식 문항인 경우에는 선택지가 필요하므로 하위 컴포넌트인 `CreateEntryComponent`에서 표현.
  - **FormCreateComponent -> CreateContentComponent -> MatchCreateContentComponent -> CreateEntryComponent**

- onChange를 이용해 state 값이 바뀔 때마다 즉각적으로 렌더링.
- 설문 제목, 문항 질문, 객관식 문항의 선택지 등이 모두 비어있지 않아야 하므로 최상위 컴포넌트 FormCreateComponent에서 이를 검사하여 설문 생성 불가 시, 상황에 맞는 팝업 알림.
- 모든 조건이 맞았을 경우 전체 데이터를 body에 담아 통신.
- BE) form, user_form, content, obj_entry 테이블에 RequestBody로 받은 값 insert.
- 문항의 개수, 객관식 문항의 선택지는 배열로 받으므로 반복문을 돌며 mapper의 쿼리 수행.
- 구조체 클래스 생성(CreateForm, Contents, ContentCreateInfo, ObjEntry, Entry)

  ```java
  public class CreateForm {
	public String title;
	public String userId;
	public List<Contents> contents;
  }
  ```
  ```java
  public class Contents {
	public int id;
	public String contentType;
	public ContentCreateInfo contentInfo;
  }
  ```
  ```java
  public class ContentCreateInfo {
	public String question;
	public String description;
	public ObjEntry objEntry;
  }
  ```
  ```java
  public class ObjEntry {
	public List<Entry> entries;
  }
  ```
  ```java
  public class Entry {
	public int id;
	public String entry;
  }
  ```

- 목록으로 버튼 -> 설문 목록(/forms)

<br>

#### 📌 설문 삭제

![image](https://user-images.githubusercontent.com/41534832/105454586-74a1b700-5cc5-11eb-9134-a1452c91c400.png)

<br>

**BE)** [DELETE] /forms/:formIdx

- 설문 결과 조회 화면에서 설문 삭제 가능.
- 해당 설문의 작성자가 현재 로그인해 있는 사용자일 경우, '삭제' 버튼이 활성화. 클릭했을 때 한번 더 확인하는 팝업 알림.
- FE에서 BE로 formIdx 하나만 파라미터로 전달.
- BE에서 이를 이용해 form 테이블에서 row 삭제.

  - content, obj_entry, obj_result, subj_result 테이블이 모두 외래키로 연결되어 있어서 CASCADE에 의해 자동 삭제.
  - 현재 기능에서 사용되지 않는 user_form 테이블은 user 테이블의 userIdx도 참조하기 때문에 우선 따로 삭제.

<br>

---

### 🔨 리팩토링 필요 & 개선점

- git 브랜치 관리(e.g. develop 생성)
- 예외 처리
- 트랜잭션 추가

**BE**
- Java8 문법 적용(optional, stream 등)
- VO에 Lombok 어노테이션 활용
- System.out.println 대신 Sl4fj 활용
- 테스트 코드 작성
- 통신 시 FE에 response 넘겨주기

**FE**
- 객체 구조 할당
- immutable

<br>

### ➕ 추가하고 싶은 기능

- 설문 생성 시 설문 대상자를 선택하여 해당 대상의 설문 목록에만 보여지도록
- 설문 생성 시 마감 기한 설정하기
- 중요 설문에 표시하여 따로 필터링 / 내가 생성한 설문 필터링
- 키워드로 설문 검색(설문 목록 화면 상단에 검색 창 추가)
- 설문 수정하고 설문 대상자들에게 다시 설문 보내기
- 비밀번호 저장 시 암호화
- 아이디, 비밀번호 찾기


[Daily Reports](https://github.com/khl6235/SurveyApp/wiki)
