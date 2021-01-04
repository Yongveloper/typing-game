'use strict';
const GAME_TIME = 10;
const START_SCORE = 0;
const START_LIFE = 3;
let targetScore = 10;
let score = START_SCORE;
let time = GAME_TIME;
let isPlaying;
let timeInterval;
let checkInterval;
let words = [];
let randomIndex;
let life = START_LIFE;
let english = [];
let korean = [];
const StartButton = document.querySelector('.button');
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-question');
const targetInput = document.querySelector('.traget-input');
const scoreDisplay = document.querySelector('.score');
const languageInput = document.querySelector('.language');
const lifeDisplay = document.querySelector('.life');

// 단어 데이터 받기

function getKoreanWords() {
  return new Promise((resolve) => {
    resolve(
      fetch('data/data.json')
        .then((response) => response.json())
        .then((json) => {
          korean = json.korean;
          words = json.korean;
        })
        .catch((error) => {
          alert(`알 수 없는 오류가 발생했습니다. ${error}`);
        })
    );
  });
}

function getEnglishWords() {
  return new Promise((resolve) => {
    resolve(
      axios
        .get('https://random-word-api.herokuapp.com/word?number=100') //
        .then((response) => {
          response.data.forEach((word) => {
            if (word.length < 10) {
              english.push(word);
            }
          });
        })
        .catch((error) => {
          alert(`알 수 없는 오류가 발생했습니다. ${error}`);
        })
    );
  });
}

// 버튼 상태
function buttonChange(text) {
  StartButton.innerText = text;
  text === '게임시작' ? StartButton.classList.remove('loading') : StartButton.classList.add('loading');
}

// 랜덤 단어 보이기
function ShowRandomWords() {
  randomIndex = Math.floor(Math.random() * words.length);
  wordDisplay.innerText = words[randomIndex];
}

// 남은 시간
function countDown() {
  const timeDisplay = document.querySelector('.time');
  if (time > 0) {
    time--;
  }
  timeDisplay.innerText = time;
}

// 게임 리셋
function resetGame() {
  isPlaying = false;
  clearInterval(checkInterval);
  clearInterval(timeInterval);
  score = START_SCORE;
  life = START_LIFE;
  time = GAME_TIME;
  languageInput.disabled = false;
  targetInput.disabled = false;
  wordInput.value = '';
  wordInput.disabled = true;
  buttonChange('게임시작');
}

// 게임 결과
function showResult(text) {
  const resultDisplay = document.querySelector('.result-wrap');
  const result = document.querySelector('.result');
  const restartButton = document.querySelector('.restart');

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

// 목표 점수
function setTargetScore(e) {
  const targetDisplay = document.querySelector('.target-score');
  const targetScroeValue = e.target.value;

  targetScore = targetScroeValue;
  targetDisplay.innerText = targetScroeValue;
}

// 단어 언어 설정
function setLanguage(e) {
  const language = e.currentTarget.value;

  language == 'korean' ? (words = korean) : (words = english);
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

// 게임 실행
function run() {
  if (isPlaying || StartButton.innerText == '단어 불러오는중...') {
    return;
  }
  isPlaying = true;
  languageInput.disabled = true;
  wordInput.disabled = false;
  scoreDisplay.innerText = score;
  targetInput.disabled = true;
  lifeDisplay.innerText = life;
  ShowRandomWords();
  wordInput.focus();
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange('게임중...');
}

async function init() {
  buttonChange('단어 불러오는중...');
  await getKoreanWords();
  await getEnglishWords();
  buttonChange('게임시작');
  StartButton.addEventListener('click', run);
  targetInput.addEventListener('input', setTargetScore);
  wordInput.addEventListener('keydown', checkMatch);
  languageInput.addEventListener('input', setLanguage);
}

init().catch((e) => alert(`알 수 없는 오류입니다. 새로고침을 해주세요. ${e}`));
