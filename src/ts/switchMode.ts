import { updateDisplay } from "./display";
import { timerState, type Mode } from "./state";

export const tabEls = Array.from(document.querySelectorAll<HTMLElement>('.mode-item'));

function setActiveTab(mode: Mode) {
    document.querySelectorAll('.mode-item').forEach(el => el.classList.remove('isActive'));
    const el = document.querySelector<HTMLElement>(`.mode-item[data-mode="${mode}"]`);
    el?.classList.add('isActive');
}

export const switchMode = (newMode: Mode) => {
    if (timerState.isRunning) {
            clearInterval(timerState.intervalId);
            timerState.isRunning = false;
            // btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-play");
        }

    timerState.mode = newMode;
    timerState.timeLeft = timerState.durations[newMode] * 60;

    setActiveTab(newMode);
    updateDisplay();
}

export const handleTimerEnd = () => {
    let prev = timerState.mode
    if (prev === 'pomodoro') {
        timerState.completedPomodoros += 1;
        const next: Mode = (timerState.completedPomodoros % 4 === 0) ? 'long' : 'short';
        switchMode(next);
        return true;
    } else if (prev === 'short') {
        switchMode('pomodoro');
        return true;
    } else {
        switchMode('pomodoro');
        return false;
    }
}

