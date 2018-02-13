---
title: 실습 UI 개발로 배워보는 순수JS 와 VueJS 개발
date: 2018-01-20 +0900
---

## 준비

### 개발 환경 구성

- Node.js 
- Chrome
- [lite-server](https://github.com/johnpapa/lite-server)
  `npm install -g lite-server`
  `$ lite-server`

### 요구 사항 분석

검색폼 구현
- [ ] 검색 상품명 입력 폼이 위치한다. 검색어가 없는 경우이므로 x 버튼을 숨긴다
- [ ] 검색어를 입력하면 x버튼이 보인다
- [ ] 엔터를 입력하면 검색 결과가 보인다 (컨트롤러에게 위임)
- [ ] x 버튼을 클릭하거나, 검색어를 삭제하면 검색 결과를 삭제한다  

검색 결과 구현
- [ ] 검색 결과가 검색폼 아래 위치한다
- [ ] 검색 결과가 보인다 
- [ ] x버튼을 클릭하면 검색폼이 초기화 되고, 검색 결과가 사라진다

탭 구현
- [ ] 추천 검색어, 최근 검색어 탭이 검색폼 아래 위치한다 
- [ ] 기본으로 추천 검색어 탭을 선택한다 
- [ ] 각 탭을 클릭하면 탭 아래 내용이 변경된다 

추천 검색어 구현
- [ ] 번호, 추천 검색어 목록이 탭 아래 위치한다
- [ ] 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동 
- [ ] 검색폼에 선택된 추천 검색어 설정 

최근 검색어 구현
- [ ] 최근 검색어, 목록이 탭 아래 위치한다 
- [ ] 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동
- [ ] 검색일자, 버튼 목록이 있다
- [ ] 목록에서 x 버튼을 클릭하면 선택된 검색어가 목록에서 삭제
- [ ] 검색시마다 최근 검색어 목록에 추가된다

## 순수 JS (MVC)

MVC : Model View Controller

- Model
  데이터를 관리하는 역활, 데이터베이스에 있는 데이터를 가져와서 이 데이터를 또다른 개체에게 전달, 반대로 외부로부터 데이터를 받아 데이터베이스에 넣어주는 역할을 한다.
  데이터베이스에 직접 접근하지 않고 API 형태로 접근한다.

- View
  그 데이터를 가지고 화면을 관리하고 그린다. 
  또 사용자가 입력한 값 처리를 한다.
  모델과 뷰는 직접적으로 연결되어있지 않다.

- Controller
  모델과 뷰를 연결하는 것, 모델로부터 데이터를 가져와 뷰로 전달, 반대로 뷰로부터 사용자 입력 데이터를 모델로 전달하기도 함.

---

## MMVM

ViewModel의 개념을 살펴볼 코드

```javascript
const h1 = document.createElement('h1');
document.body.appendChild(h1);

const viewModel = {};
let model = '';

Object.defineProperty(viewModel, 'model', {
  get() { return model },
  set() {
    model = val;
    h1.innerHTML = model;
  }
});

viewModel.model // ""
viewModel.model = 'hello world'; 
//"hello world", h1의 내용(innerHTML) hello wordl로 바뀌어 렌더링됨

viewModel.model = 'mv';
//"mv", h1의 내용 hello world가 mv로 바뀌었다.
```

## Vue.JS 설치



### CDN으로 설치하기

```html
<script src="https://unpkg.com/vue"></script>
```



### NPM으로 설치하기

```shell
# 최신 stable 버전
$ npm install vue
```



### Vue CLI 설치

```shell
# vue-cli 설치
$ npm install --global vue-cli
# "webpack" 템플릿을 이용해서 새 프로젝트 생성
$ vue init webpack my-project
# 의존성을 설치하고 실행하세요!
$ cd my-project
$ npm install
$ npm run dev
```



### Vue DevTools

[크롬 확장 프로그램 설치](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)


##

```js
new Vue({
  el: '#app',
  data: {
    query: ''
  }
})

```

```html
<input type="text" v-model="query" placeholder="검색어를 입력하세요" autofocus>
<button v-show="query.length" type="reset" class="btn-reset"></button>
```

v-model : app.js의 Vue data의 해당 항목과 연결된다.
v-show : 지정한 조건에 따라 해당 엘리먼트가 보이거나 숨겨진다.



```html
<form v-on:submit.prevent="onSubmit">
```
v-on : dom에서 일어나는 이벤트 리슨
.prevent : JS에서 preventDefault와 같은 효과
---

## References
- https://kr.vuejs.org
