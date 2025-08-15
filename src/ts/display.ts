import { updateRing } from "./progressCircle";
import { timerState } from "./state";

const display = document.querySelector<HTMLHeadingElement>('.timer');

export function updateDisplay():void {
    const totalSec = timerState.durations[timerState.mode] * 60;
    const secLeft = Math.max(0, Math.min(timerState.timeLeft, totalSec));
    
    const minutes = Math.floor(timerState.timeLeft / 60);
    const seconds = timerState.timeLeft % 60;

    if (display !== null) {
        display.textContent= `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }   
    updateRing(secLeft, totalSec);
}

