import { initComboboxes } from './combobox';
import { timerState, type Mode } from './state';
import { updateDisplay } from './display';
import { pauseTimer, startTimer } from './timer';
import { SPRITE } from './config';

let draftDurations: Record<Mode, number> = { ...timerState.durations };

const initSettingsCombos = ():void => {
  initComboboxes(({ mode, value }) => {
      draftDurations[mode] = value;
  });
}

initSettingsCombos();

const home = document.querySelector<HTMLButtonElement>('.home');
const settings = document.querySelector<HTMLButtonElement>('.settings')
const iconHome = document.querySelector<SVGUseElement>('.icon-home');
const iconSettings = document.querySelector<SVGUseElement>('.icon-settings');
const body = document.body;
const closeBtn = document.querySelector<HTMLButtonElement>('.close-btn[data-action="close"]');
const btnOk = document.querySelector<HTMLButtonElement>('.submit-btn[data-action="save"]')

let isOpen = false;
let wasRunningBeforeModal = false;

const openModal = ():void => {
    if (!isOpen) {
        wasRunningBeforeModal = timerState.isRunning;
        body.classList.add('modal-open');
        settings?.classList.add('btn-active');
        iconSettings?.setAttribute('href', `${SPRITE}#icon-Setting-2`)
        iconHome?.setAttribute('href', `${SPRITE}#icon-Home-1`);
        home?.classList.remove('btn-active');

        pauseTimer();
    } 
}

const closeModal = ():void => {
    body.classList.remove('modal-open');
    settings?.classList.remove('btn-active');
    iconSettings?.setAttribute('href', `${SPRITE}#icon-Setting`);
    iconHome?.setAttribute('href', `${SPRITE}#icon-Home-2`);
    home?.classList.add('btn-active');
}

export const applySettingsFromModal = ():void => {
    const prev = timerState.durations;
    const next = draftDurations;
    
    const changedP = prev.pomodoro !== next.pomodoro;
    const changedS = prev.short !== next.short;
    const changedL = prev.long !== next.long;

    const anythingChanged = changedP || changedS || changedL;

    if (anythingChanged) {
        timerState.durations = { ...next };

        if ((timerState.mode === 'pomodoro' && changedP) ||
            (timerState.mode === 'short'    && changedS) ||
            (timerState.mode === 'long'     && changedL)) {
        timerState.timeLeft = timerState.durations[timerState.mode] * 60;
        }

        updateDisplay();
    }

    closeModal();

    if (wasRunningBeforeModal) {
        startTimer()
    }

    wasRunningBeforeModal = false;

}

settings?.addEventListener('click', openModal);
home?.addEventListener('click', closeModal);
closeBtn?.addEventListener('click', closeModal);
btnOk?.addEventListener('click', applySettingsFromModal);

export { };