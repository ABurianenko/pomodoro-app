import { updateDisplay } from "./display";
import { timerState } from "./state";
import { handleTimerEnd, switchMode, tabEls } from "./switchMode";

const startBtn = document.querySelector('.start')
const resetBtn = document.getElementById('reset');
const btnIcon = document.getElementById('btn');
const iconHome = document.querySelector('.icon-home');
const home = document.querySelector('.home');

export const pauseTimer = () => {
    if (timerState.intervalId != null) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
        timerState.isRunning = false;
        btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-Play");
        return
    }
}

export const startTimer = () => {
    if (timerState.isRunning) {
        pauseTimer();
        return
    }

    timerState.isRunning = true;
    btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-pause");

    timerState.intervalId = setInterval(() => {
        
        timerState.timeLeft--;

        if (timerState.timeLeft <= 0) {
            clearInterval(timerState.intervalId);
            timerState.intervalId = null;
            timerState.isRunning = false;
            
            const auto = handleTimerEnd();
            if (auto) {
                startTimer()
            } else {
                btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-Play");
            }
            return;
        }

        updateDisplay();
    }, 1000)
}

const resetTimer = () => {
    clearInterval(timerState.intervalId);
    timerState.intervalId = null;
    timerState.isRunning = false;
    timerState.timeLeft = timerState.durations.pomodoro;
    btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-Play");
    updateDisplay();
    return;
}

resetBtn?.addEventListener('click', resetTimer);

function init() {
    switchMode(timerState.mode);
    tabEls.forEach((el, i) => {
        el.addEventListener('click', () => {
            switchMode(order[i] ?? 'pomodoro');
        });
    });
    
    iconHome?.setAttribute('href', './src/svg/symbol-defs.svg#icon-Home-2');
    home?.classList.add('btn-active');
    startBtn?.addEventListener('click', startTimer)
}

init();


export { };