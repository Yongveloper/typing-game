'use strict';
const GAME_TIME = 10;
const START_SCORE = 0;
const START_LIFE = 3;
let targetScore;
let score;
let time;
let isPlaying;
let timeInterval;
let checkInterval;
let words = [];
let randomIndex;
let life;
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
    if (isPlaying) {
        return;
    }
    getWord();    
    language.disabled = true;
    isPlaying = true;    
    wordInput.disabled = false;
    score = START_SCORE;
    scoreDisplay.innerText = score;
    targetInput.disabled = true;
    targetScore = targetInput.value;
    life = START_LIFE; 
    lifeDisplay.innerText = life;   
    time = GAME_TIME;
    wordInput.focus();
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중...');
}

// 게임 끝날시
function gameOver() {    
    buttonChange('게임시작');
    clearInterval(checkInterval);
    clearInterval(timeInterval);
    language.disabled = false;
    targetInput.disabled = false;
    wordInput.value = '';
    wordInput.disabled = true; 
}

// 게임 결과
function showResult(text) {    
    resultDisplay.style.display = 'flex';
    text == '실패!' ? resultDisplay.style.color = 'red' : resultDisplay.style.color = 'blue';
    result.innerText = text;
    restartButton.addEventListener('click', () => resultDisplay.style.display = 'none');
}

// 게임 상태 체크
function checkStatus() {
    if (time === 0 || life === 0) {
        isPlaying = false;
        gameOver();
        showResult('실패!');
    } else if (score == targetScore) {
        isPlaying = false;                
        gameOver();        
        showResult('성공!');
    }   
}

// 단어 랜덤 추출
function randomWordsHandler() {
    randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
}

// 단어 불러오기
function getWord() {     
    const korean = [
        '개발자', '공부', '부자', '경기도', '강아지', '닭', '호랑이', '가족', '대학교', '겨울', '휴지', '연예인', '유튜브', '강의', '노트북', '냉장고',
        '대한민국', '군인', '멋쟁이', '김치찌개','삼겹살','고무장갑','과자','정수기','사자성어','선생님','경찰관','소방관','젓가락','맥주','풍선','청와대'
    ];
    const english = [
        'Study', 'Memory', 'Computer', 'Play',  'Lenovo', 'Change', 'Coding', 'Weather', 'Cute',  'Money', 'Canada', 'English', 'exceed', 'Edit' , 'event',
        'Java',  'Beautiful', 'Match', 'Arise', 'Result', 'Value', 'Length','Inner', 'Score', 'Target', 'Interval','Patent' ,'Code', 'Get', 'Out', 'Show'
    ];

    language.value === 'korean' ? words = korean : words = english;   
    randomWordsHandler()
    // buttonChange('게임시작');
}

// 단어일치 체크
function checkMatch() {
    if (window.event.keyCode === 13) {        
        if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
            score++;
            scoreDisplay.innerHTML = score;
            time = GAME_TIME;
            randomWordsHandler()
        } else {
            life--;
            lifeDisplay.innerText = life;
        }
        wordInput.value = '';
    }
}

// 남은 시간
function countDown() {    
    if(time > 0){
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
    targetInput.addEventListener('input', () => targetDisplay.innerText = targetInput.value);
}

// 초기화
function init() {
    showTargetScore();
    // getWord();
    wordInput.addEventListener('keydown', checkMatch);
}

init();