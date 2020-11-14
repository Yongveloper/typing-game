'use strict';
let score = 0;
let time = 9;
let isPlaying = false;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-problem');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');

wordInput.addEventListener('keydown', () => {
    if(window.event.keyCode === 13){
        if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
            score++
            scoreDisplay.innerHTML = score;            
        }
        wordInput.value = '';
    }
})

setInterval(countDown,1000);

function countDown() {
    time > 0 ? time-- : isPlaying = false;
    timeDisplay.innerText = time;
}