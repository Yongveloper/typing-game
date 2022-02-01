# Typing Game

> 간단한 타자 게임을 순수 자바스크립트로구현하기

## Over view

[배포 링크](http://typing-practice-game.netlify.app/)

- 사용된 언어: HTML, CSS, JavaScript
- 배포: Netlify

---

# 1. 구현 기능

![2](https://user-images.githubusercontent.com/64254228/151992793-ad9ef7b4-7d47-498d-a9c6-d080ba6e2f08.gif)

- json 파일로 한글 단어 데이터 불러오기
- axios를 활용해서 random-word-api 사용
- 단어(영어,한국어) 설정
  - words 빈 배열에 input 이벤트로 한글or영어 단어 배열 넣음
- 목표 점수 설정
  - targetScore 배열에 range의 value값을 사용해서 값을 담고 score가 targetScore의 값과 같다면 게임 성공
- 게임 시작 후 타이머 종료 시 실패
  - setInterval을 활용해서 time의 값이 0이 된다면 게임 실패
- 게임 시작,종료 시 버튼 비활성화,활성화
  - isPlaying 변수 boolean값을 활용한 ClassList add,remove 활용
- 게임 종료 시 모달 창 활성화
  - javscript style.display 활용
- 단어 틀릴 시 글자 shake 효과
  - ClassList add,remove, css animation 활용

---

# 2. 느낀점

순수 자바스크립트를 공부하기 위해 조그만한 프로젝트를 만들어 봤는데, DOM 요소부터 event, if문, 변수 관리, 함수를 얼마나 나눠야 하는지, ES6문법을 완전하지는 않지만 익숙하게 다룰 수 있게 되었다.
