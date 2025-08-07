import { timerState } from "./state";


const display = document.querySelector('.timer');

export function updateDisplay () {
    let minutes = Math.floor(timerState.timeLeft / 60);
    let seconds = timerState.timeLeft % 60;

    return display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

display?.addEventListener('change', updateDisplay);
