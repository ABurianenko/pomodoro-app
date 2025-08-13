import { updateRing } from "./progressCircle";
import { timerState } from "./state";

const display = document.querySelector<HTMLElement>('.timer');

export function updateDisplay() {
    const totalSec = timerState.durations[timerState.mode] * 60;
    const safeLeft = Math.max(0, Math.min(timerState.timeLeft, totalSec));
    
    let minutes = Math.floor(timerState.timeLeft / 60);
    let seconds = timerState.timeLeft % 60;

    if (display !== null) {
        display.textContent= `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }   
    updateRing(safeLeft, totalSec);
}

