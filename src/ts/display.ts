import { timerState } from "./state";

//перенести в switchMode()
const mode = timerState.mode;
const duration = timerState.durations[mode];
let timeLeft = timerState.timeLeft;
timeLeft = duration * 60;

const display = document.querySelector('.timer');



function updateDisplay () {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    display?.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export {}