'use strict';
const GAME_TIME = 10;
const START_SCORE = 0;
const START_LIFE = 3;
let targetScore;
let score = START_SCORE;
let time = GAME_TIME;
let isPlaying;
let timeInterval;
let checkInterval;
let words = [];
let randomIndex;
let life = START_LIFE;
let english = [];
let korean;
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-question');
const targetInput = document.querySelector('.traget-input');
const targetDisplay = document.querySelector('.target-score');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');
const resultDisplay = document.querySelector('.result-wrap');
const result = document.querySelector('.result');
const restartButton = document.querySelector('.restart');
const language = document.querySelector('.language');
const lifeDisplay = document.querySelector('.life');

// 게임 실행
function run() {
  if (isPlaying || button.innerText == '단어 불러오는중...') {
    return;
  }
  // getWords();
  isPlaying = true;
  language.value === 'korean' ? (words = korean) : (words = english);
  ShowRandomWords();
  language.disabled = true;
  wordInput.disabled = false;
  scoreDisplay.innerText = score;
  targetInput.disabled = true;
  targetScore = targetInput.value;
  lifeDisplay.innerText = life;
  wordInput.focus();
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange('게임중...');
}

// 랜덤 단어 보이기
function ShowRandomWords() {
  randomIndex = Math.floor(Math.random() * words.length);
  wordDisplay.innerText = words[randomIndex];
}

// 게임 리셋
function resetGame() {
  isPlaying = false;
  clearInterval(checkInterval);
  clearInterval(timeInterval);
  score = START_SCORE;
  life = START_LIFE;
  time = GAME_TIME;
  language.disabled = false;
  targetInput.disabled = false;
  wordInput.value = '';
  wordInput.disabled = true;
  buttonChange('게임시작');
}

// 게임 결과
function showResult(text) {
  resultDisplay.style.display = 'flex';
  text === '실패!' ? (resultDisplay.style.color = 'red') : (resultDisplay.style.color = 'blue');
  result.innerText = text;
  restartButton.addEventListener('click', () => (resultDisplay.style.display = 'none'));
}

// 게임 상태 체크
function checkStatus() {
  if (time === 0 || life === 0) {
    resetGame();
    showResult('실패!');
  } else if (score == targetScore) {
    resetGame();
    showResult('성공!');
  }
}

// 단어 불러오기
function getWords() {
  korean = [
    '개발자',
    '공부',
    '부자',
    '경기도',
    '강아지',
    '닭',
    '호랑이',
    '가족',
    '대학교',
    '겨울',
    '휴지',
    '연예인',
    '유튜브',
    '강의',
    '노트북',
    '냉장고',
    '대한민국',
    '군인',
    '멋쟁이',
    '김치찌개',
    '삼겹살',
    '고무장갑',
    '과자',
    '정수기',
    '사자성어',
    '선생님',
    '경찰관',
    '소방관',
    '젓가락',
    '맥주',
    '풍선',
    '청와대',
  ];
  // const english = [
  //     'Study', 'Memory', 'Computer', 'Play',  'Lenovo', 'Change', 'Coding', 'Weather', 'Cute',  'Money', 'Canada', 'English', 'exceed', 'Edit' , 'event',
  //     'Java',  'Beautiful', 'Match', 'Arise', 'Result', 'Value', 'Length','Inner', 'Score', 'Target', 'Interval','Patent' ,'Code', 'Get', 'Out', 'Show'
  // ];

  axios
    .get('https://random-word-api.herokuapp.com/word?number=100')
    .then((response) => {
      response.data.forEach((word) => {
        if (word.length < 10) {
          english.push(word);
        }
      });
      buttonChange('게임시작');
    })
    .catch((error) => {
      alert(`알 수 없는 오류가 발생했습니다. ${error}`);
      location.reload();
    });

  // language.value === 'korean' ? words = korean : words = english;
  // ShowRandomWords()
  // buttonChange('게임시작');
}

// 단어일치 체크
function checkMatch() {
  if (window.event.keyCode === 13) {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
      score++;
      scoreDisplay.innerHTML = score;
      time = GAME_TIME;
      ShowRandomWords();
    } else {
      life--;
      lifeDisplay.innerText = life;
    }
    wordInput.value = '';
  }
}

// 남은 시간
function countDown() {
  if (time > 0) {
    time--;
  }
  timeDisplay.innerText = time;
}

// 버튼 상태
function buttonChange(text) {
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}

// 목표 점수
function showTargetScore() {
  targetDisplay.innerText = targetInput.value;
  targetInput.addEventListener('input', () => (targetDisplay.innerText = targetInput.value));
}

// 초기화
function init() {
  buttonChange('단어 불러오는중...');
  showTargetScore();
  getWords();
  wordInput.addEventListener('keydown', checkMatch);
}

init();
