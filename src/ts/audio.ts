import { SPRITE, timerState } from "./state";

const AUDIO = import.meta.env.BASE_URL + 'timer.mp3'

const timerAlarm = new Audio(AUDIO);
timerAlarm.preload = 'auto';

const muteBtn = document.getElementById('mute');
const muteIcon = document.getElementById('mute-icon');

let unlocked = false;

export function unlockAudio() {
    timerAlarm.volume = 0;
    timerAlarm.play().then(() => {
        timerAlarm.pause();
        timerAlarm.currentTime = 0;
        timerAlarm.volume = 1;
        unlocked = true;
    }).catch(() => {
    });
}

export function playPreEnd() {
    if (!unlocked || !timerState.soundEnabled) return;
    timerAlarm.currentTime = 0;
    void timerAlarm.play().catch(() => {})
}

function muteAudio() {
    if (timerState.soundEnabled) {
        timerState.soundEnabled = false;
        timerAlarm.muted = true;
        muteIcon?.setAttribute("href", `${SPRITE}#icon-mute`);
    } else {
        timerState.soundEnabled = true;
        timerAlarm.muted = false;
        muteIcon?.setAttribute("href", `${SPRITE}#icon-volume`);
    }
    
    console.log(muteBtn);
}

muteBtn?.addEventListener('click', muteAudio)