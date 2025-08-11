import { initComboboxes } from './combobox';
import { timerState, type Mode } from './state';
import { updateDisplay } from './display';
import { pauseTimer, startTimer } from './timer';

const initSettingsCombos = () => {
  initComboboxes(({ mode, value }) => {
    timerState.durations[mode] = value;
    if (timerState.mode === mode && !timerState.isRunning) {
      timerState.timeLeft = value * 60;
      updateDisplay();
    }
  });
}

initSettingsCombos();

const home = document.querySelector('.home');
const settings = document.querySelector('.settings')
const iconHome = document.querySelector('.icon-home');
const iconSettings = document.querySelector('.icon-settings');
const body = document.body;
const closeBtn = document.querySelector('.close-btn[data-action="close"]');
const btnOk = document.querySelector('.submit-btn[data-action="save"]')

let isOpen = false;
let wasRunningBeforeModal = false;

const openModal = () => {
    if (!isOpen) {
        wasRunningBeforeModal = timerState.isRunning;
        body.classList.add('modal-open');
        settings?.classList.add('btn-active');
        iconSettings?.setAttribute('href', './src/svg/symbol-defs.svg#icon-Setting-2')
        iconHome?.setAttribute('href', './src/svg/symbol-defs.svg#icon-Home-1');
        home?.classList.remove('btn-active');

        pauseTimer();
    } 
}

const closeModal = () => {
    body.classList.remove('modal-open');
    settings?.classList.remove('btn-active');
    iconSettings?.setAttribute('href', './src/svg/symbol-defs.svg#icon-Setting');
    iconHome?.setAttribute('href', './src/svg/symbol-defs.svg#icon-Home-2');
    home?.classList.add('btn-active');
}

function readComboValue(mode: Mode): number | null {
    const row = document.querySelector<HTMLElement>(`.duration-row[data-mode="${mode}"]`);
    const valEl = row?.querySelector<HTMLElement>('.combo__value');
    if (!valEl) return null;
    const raw = Number(valEl.dataset.value ?? valEl.textContent ?? '');
    return Number.isFinite(raw) ? raw : null;
}

const applySettingsFromModal = () => {
    const newPomodoro = readComboValue('pomodoro');
    const newShort = readComboValue('short');
    const newLong = readComboValue('long');

    if (newPomodoro === null || newShort === null || newLong === null) {
        console.warn('Settings: missing values from comboboxes');
        return;
    }

    const prev = timerState.durations;
    
    const changedP = prev.pomodoro !== newPomodoro;
    const changedS = prev.short !== newShort;
    const changedL = prev.long !== newLong;

    const anythingChanged = changedP || changedS || changedL;

    if (anythingChanged) {
        timerState.durations.pomodoro = newPomodoro;
        timerState.durations.short = newShort;
        timerState.durations.long = newLong;

        if ((timerState.mode === 'pomodoro' && changedP) ||
            (timerState.mode === 'short'    && changedS) ||
            (timerState.mode === 'long'     && changedL)) {
        timerState.timeLeft = timerState.durations[timerState.mode] * 60;
        }

        updateDisplay();
    }

    closeModal();

    if (wasRunningBeforeModal) {
        startTimer();
    }

    wasRunningBeforeModal = false;

}

settings?.addEventListener('click', openModal);
home?.addEventListener('click', closeModal);
closeBtn?.addEventListener('click', closeModal);
btnOk?.addEventListener('click', applySettingsFromModal);

export { };