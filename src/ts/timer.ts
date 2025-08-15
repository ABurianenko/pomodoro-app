import { updateDisplay } from "./display";
import { applySettingsFromModal } from "./modal";
import { timerState} from "./state";
import { handleTimerEnd, switchMode } from "./switchMode";
import { SPRITE } from "./config";
import { playPreEnd, unlockAudio } from "./audio";

const startBtn = document.querySelector<HTMLButtonElement>('.start')
const resetBtn = document.getElementById('reset') as HTMLButtonElement;
const btnIcon = document.getElementById('btn') as SVGUseElement | null;
const iconHome = document.querySelector<SVGUseElement>('.icon-home');
const home = document.querySelector<HTMLButtonElement>('.home');

export const pauseTimer = ():void => {
    if (timerState.intervalId != null) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
        timerState.isRunning = false;
        btnIcon?.setAttribute("href", `${SPRITE}#icon-Play`);
        return
    }
}

export const startTimer = ():void => {
    if (timerState.isRunning) {
        pauseTimer();
        return
    }

    timerState.isRunning = true;
    btnIcon?.setAttribute("href", `${SPRITE}#icon-pause`);
    applySettingsFromModal();
    unlockAudio();
    timerState.preEndPlayed = false;

    timerState.intervalId = setInterval(() => {
        
        timerState.timeLeft--;

        if (timerState.timeLeft <= timerState.preEndOffsetSec && timerState.timeLeft>0 && !timerState.preEndPlayed) {
            playPreEnd();
            timerState.preEndPlayed = true;
        }

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

const resetTimer = ():void => {
    if (timerState.intervalId !== null) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
    }
    
    timerState.isRunning = false;
    timerState.timeLeft = timerState.durations.pomodoro * 60;
    timerState.completedPomodoros = 0;
    timerState.preEndPlayed = false;
    btnIcon?.setAttribute("href", `${SPRITE}#icon-Play`);
    updateDisplay();
    return;
}

resetBtn?.addEventListener('click', resetTimer);

function init():void {
    switchMode(timerState.mode);
    
    iconHome?.setAttribute('href', `${SPRITE}#icon-Home-2`);
    home?.classList.add('btn-active');
    startBtn?.addEventListener('click', startTimer)
}

init();


export { };