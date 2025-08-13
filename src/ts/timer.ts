import { updateDisplay } from "./display";
import { applySettingsFromModal } from "./modal";
import { timerState} from "./state";
import { handleTimerEnd, switchMode } from "./switchMode";
import { SPRITE } from "./state";

const startBtn = document.querySelector('.start')
const resetBtn = document.getElementById('reset');
const btnIcon = document.getElementById('btn');
const iconHome = document.querySelector('.icon-home');
const home = document.querySelector('.home');
// const tabEls = Array.from(document.querySelectorAll<HTMLElement>('.mode-item'));

export const pauseTimer = () => {
    if (timerState.intervalId != null) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
        timerState.isRunning = false;
        btnIcon?.setAttribute("href", `${SPRITE}#icon-Play`);
        return
    }
}

export const startTimer = () => {
    if (timerState.isRunning) {
        pauseTimer();
        return
    }

    timerState.isRunning = true;
    btnIcon?.setAttribute("href", `${SPRITE}#icon-pause`);
    applySettingsFromModal();

    timerState.intervalId = setInterval(() => {
        
        timerState.timeLeft--;

        if (timerState.intervalId !== null && timerState.timeLeft <= 0) {
            clearInterval(timerState.intervalId);
            timerState.intervalId = null;
            timerState.isRunning = false;
            
            const auto = handleTimerEnd();
            if (auto) {
                startTimer()
            } else {
                btnIcon?.setAttribute("href", `${SPRITE}#icon-Play`);
            }
            return;
        }

        updateDisplay();
    }, 1000)
}

const resetTimer = () => {
    if (timerState.intervalId !== null) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
    }
    
    timerState.isRunning = false;
    timerState.timeLeft = timerState.durations.pomodoro * 60;
    timerState.completedPomodoros = 0;
    btnIcon?.setAttribute("href", `${SPRITE}#icon-Play`);
    updateDisplay();
    return;
}

resetBtn?.addEventListener('click', resetTimer);

function init() {
    switchMode(timerState.mode);
    
    iconHome?.setAttribute('href', `${SPRITE}#icon-Home-2`);
    home?.classList.add('btn-active');
    startBtn?.addEventListener('click', startTimer)
}

init();


export { };