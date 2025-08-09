import { timerState } from "./state";


const display = document.querySelector<HTMLElement>('.timer');

export function updateDisplay () {
    let minutes = Math.floor(timerState.timeLeft / 60);
    let seconds = timerState.timeLeft % 60;

    display.textContent= `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

