# 4주차 · Part: 05

### *학습 내용* & *실습*
#### `Handler`
HTTP Request가 날아오면 자동으로 호출되는 메소드

    Node.js -> 콜백함수로, app.HTTPMETHOD(path, 핸들러)

#### Javascript `find()`
자바스크립트 배열에서 사용가능
```js
const arr = [{id: 1, name: "테스트1"}, {id: 2, name: "테스트2"}, {id: 3, name: "테스트3"}];

//arr 배열 중 id값이 1인 객체를 찾는다.
arr.find(f => f.id == 1); //{id: 1, name: "테스트1"}
```

#### `예외 처리` -> `status()`
✨ 클라이언트와 소통을 정확하게 하기 위함
```js
const arr = [{id: 1, name: "테스트1"}, {id: 2, name: "테스트2"}, {id: 3, name: "테스트3"}];

let findIndex = arr.find(f => f.id == 1);
if(findIndex) {
    res.json(findIndex);
} else { //404 error
    res.status(404).send("해당 id로 저장된 파일이 없습니다.");
}
```

#### `==` vs `===` (비교연산자)
```js
if(1 == "1") {
    console.log("같다"); //출력
} else {
    console.log("다르다");
}

if(1 === "1") {
    console.log("같다");
} else {
    console.log("다르다"); //출력
}
```
`==`은 자료형은 *`상관 없이`* 값만 비교한다.
<br>
`===`은 자료형이 *`상관 있고`* 값을 비교한다.

#### `회원 API 설계 프로젝트`
https://github.com/dlatmdcks60/devcourse_week4_part-05-project