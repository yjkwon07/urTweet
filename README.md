# urTweet

<div align="center">
  <img height=300 src="https://user-images.githubusercontent.com/31876632/142755109-99ef00fe-c3a1-4999-91c5-458fae57986e.png" />
</div>
<br/>

`React` 라이브러리를 사용하면서 `유지보수` 및 `생산성`을 높이기 위해, 폴더, 데이터 구조화를 정의함. **(트렌드에 따라 구조가 바뀔 수 있으니 유의)** 실무에서도 무난하게 사용하고 있으며, 외부 데이터를 쉽게 관리할 수 있어 컴포넌트 개발에 집중을 할 수 있다. <br/>
해당 레파지토리 구성 내용은 [블로그](https://ventos06.tistory.com/1)에서 자세히 확인이 가능하다. <br/>

## Global state management

전역으로 데이터를 관리 함으로써 `컴포넌트`, `데이터 fetch` 관심사 분리를 한다. 현재는 SWR로 데이터를 관리하고 있다.

option 1. [redux + redux-saga](https://github.com/yjkwon07/urTweet/tree/config/redux) <br/>
option 2. [swr](https://github.com/yjkwon07/urTweet/tree/config/swr) <br/>

**현재 레파지토리에 정의한 코드를 시각화 표현하였다.**

<div align="center">
  <img src="https://user-images.githubusercontent.com/31876632/142758034-aea3a853-c918-4722-af00-159625c8581d.png" />
</div>

## next?

- suspense, error handling
- test
- react-virtualize