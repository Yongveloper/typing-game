'use strict';
const GAME_TIME = 10;
const START_SCORE = 0;
let targetScore;
let score = START_SCORE;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-question');
const targetInput = document.querySelector('.traget-input');
const targetDisplay = document.querySelector('.target-score');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

// 게임 실행
function run() {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    score = START_SCORE;
    scoreDisplay.innerText = score;
    targetInput.disabled = true;
    targetScore = targetInput.value;    
    time = GAME_TIME;
    wordInput.focus();
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중...');
}

function gameOver() {    
    buttonChange('게임시작');
    clearInterval(checkInterval);
    clearInterval(timeInterval);
    targetInput.disabled = false;    
}

// 게임 상태 체크
function checkStatus() {
    if (!isPlaying && time === 0) {
        gameOver();
        alert('실패!');
    } else if (score == targetScore) {
        isPlaying = false;                
        gameOver();        
        alert('성공!');
    }
}

// 단어 불러오기
function getWord() {
    words = [
        '개발자', '공부', 'Study', 'Memory', 'Computer', 'Play', '부자', '경기도', 'Lenovo', '강아지', '닭', '호랑이', '가족', 'Change', 'Coding',
        '대학교', '겨울', 'Weather', 'Cute', '휴지', 'Money', '연예인', '유튜브', '강의', '노트북', '냉장고', 'Canada', 'English', '대한민국', '군인',
        'Java', '멋쟁이', 'Beautiful','김치찌개','삼겹살','고무장갑'
    ];
    buttonChange('게임시작');
}

// 단어일치 체크
function checkMatch() {
    if (window.event.keyCode === 13) {
        if (!isPlaying) {
            wordInput.value = '';
            return;
        }
        if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
            score++
            scoreDisplay.innerHTML = score;
            time = GAME_TIME;            
            const randomIndex = Math.floor(Math.random() * words.length);
            wordDisplay.innerText = words[randomIndex];
        }
        wordInput.value = '';
    }
}

// 남은 시간
function countDown() {    
    time > 0 ? time-- : isPlaying = false;   
    timeDisplay.innerText = time;
}

// 버튼 상태
function buttonChange(text) {
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}

function showTargetScore() {    
    targetDisplay.innerText = targetInput.value;      
    targetInput.addEventListener('input', () => targetDisplay.innerText = targetInput.value);
}

// 초기화
function init() {
    showTargetScore();
    getWord();
    wordInput.addEventListener('keydown', checkMatch);
}

init();