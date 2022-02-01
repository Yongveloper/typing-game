'use strict';
const GAME_TIME = 10;
const START_SCORE = 0;
const START_LIFE = 3;
const GAME_START = '게임시작';
const FAILED = '실패!';
const SUCCESS = '성공!';

let targetScore = 10;
let score = START_SCORE;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval = null;
let checkInterval = null;
let life = START_LIFE;
let words = [];
let english = [];
let korean = [];

const startButton = document.querySelector('.button');
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-question');
const targetInput = document.querySelector('.traget-input');
const scoreDisplay = document.querySelector('.score');
const languageInput = document.querySelector('.language');
const lifeDisplay = document.querySelector('.life');
const timeDisplay = document.querySelector('.time');

class Word {
  getKoreanWords() {
    return new Promise((resolve) => {
      resolve(
        axios.get('data/data.json').then((response) => {
          korean = [...response.data.korean];
          words = [...response.data.korean];
        })
      );
    });
  }

  getEnglishWords() {
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
      );
    });
  }

  async getKoreanWithEnglish() {
    await this.getKoreanWords();
    await this.getEnglishWords();
  }
}

const word = new Word();

word
  .getKoreanWithEnglish() //
  .then(() => {
    buttonChange(GAME_START);
    setEventListener();
  })
  .catch((error) =>
    alert(`알 수 없는 오류입니다. 새로고침을 해주세요. ${error}`)
  );

function buttonChange(text) {
  startButton.innerText = text;
  text === GAME_START
    ? startButton.classList.remove('loading')
    : startButton.classList.add('loading');
}

function setEventListener() {
  startButton.addEventListener('click', run);
  targetInput.addEventListener('input', setTargetScore);
  wordInput.addEventListener('keypress', checkMatch);
  languageInput.addEventListener('input', setLanguage);
}

function run() {
  if (isPlaying || startButton.innerText == '단어 불러오는중...') {
    return;
  }

  isPlaying = true;
  languageInput.disabled = true;
  wordInput.disabled = false;
  scoreDisplay.innerText = score;
  targetInput.disabled = true;
  lifeDisplay.innerText = life;
  showRandomWords();
  wordInput.focus();
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange('게임중...');
}

function showRandomWords() {
  const randomIndex = Math.floor(Math.random() * words.length);
  wordDisplay.innerText = words[randomIndex];
  wordDisplay.classList.add('fadeIn');
}

function countDown() {
  if (time > 0) {
    time--;
  }
  timeDisplay.innerText = time;
}

function checkStatus() {
  if (time === 0 || life === 0) {
    resetGame();
    showResult(FAILED);
  } else if (score == targetScore) {
    resetGame();
    showResult(SUCCESS);
  }
}

function setTargetScore(e) {
  const targetDisplay = document.querySelector('.target-score');
  const targetScroeValue = e.target.value;

  targetScore = targetScroeValue;
  targetDisplay.innerText = targetScroeValue;
}

function checkMatch(event) {
  if (event.code !== 'Enter') return;

  wordDisplay.classList.remove('fadeIn');
  wordDisplay.classList.remove('shaking');

  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    score++;
    scoreDisplay.innerHTML = score;
    time = GAME_TIME;
    showRandomWords();
  } else {
    wordDisplay.classList.add('shaking');
    life--;
    lifeDisplay.innerText = life;
  }

  wordInput.value = '';
}

function setLanguage(e) {
  const language = e.currentTarget.value;
  language == 'korean' ? (words = korean) : (words = english);
}

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
  buttonChange(GAME_START);
}

function showResult(text) {
  const resultDisplay = document.querySelector('.result-wrap');
  const result = document.querySelector('.result');
  const restartButton = document.querySelector('.restart');

  resultDisplay.style.display = 'flex';
  text === FAILED
    ? (resultDisplay.style.color = 'red')
    : (resultDisplay.style.color = 'blue');
  result.innerText = text;
  restartButton.addEventListener('click', () => {
    resultDisplay.style.display = 'none';
  });
}
