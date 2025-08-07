import { updateDisplay } from "./display";
import { timerState } from "./state";

//перенести в switchMode()
// const mode = timerState.mode;
// const duration = timerState.durations[mode];
// let timeLeft = timerState.timeLeft;
// timeLeft = duration * 60;

const startBtn = document.querySelector('.start')
const resetBtn = document.getElementById('reset');
const btnIcon = document.getElementById('btn');

const startTimer = () => {
    if (timerState.isRunning) {
        clearInterval(timerState.intervalId);
        timerState.isRunning = false;
        btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-Play");
        return
    }

    timerState.isRunning = true;
    btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-pause");

    timerState.intervalId = setInterval(() => {
        
        timerState.timeLeft--;

        if (timerState.timeLeft === 0) {
            clearInterval(timerState.intervalId);
            timerState.isRunning = false;
            btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-Play");
        }

        updateDisplay();
    }, 1000)
}

const resetTimer = () => {
    clearInterval(timerState.intervalId);
    timerState.isRunning = false;
    timerState.timeLeft = 0;
    btnIcon?.setAttribute("href", "./src/svg/symbol-defs.svg#icon-Play");
    updateDisplay();
    return;
}

resetBtn?.addEventListener('click', resetTimer);
startBtn?.addEventListener('click', startTimer)


export { };