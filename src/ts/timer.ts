import { updateDisplay } from "./display";
import { timerState } from "./state";
import { handleTimerEnd, switchMode, tabEls } from "./switchMode";

const startBtn = document.querySelector('.start')
const resetBtn = document.getElementById('reset');
const btnIcon = document.getElementById('btn');

const pauseTimer = () => {
    if (timerState.intervalId != null) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
        timerState.isRunning = false;
        btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-play");
        return
    }
}

const startTimer = () => {
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
                btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-play");
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
    timerState.timeLeft = 0;
    btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-play");
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

    startBtn?.addEventListener('click', startTimer)
}

init();


export { };