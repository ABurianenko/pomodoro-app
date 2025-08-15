import { timerState } from "./state";
import { SPRITE } from "./config";

const AUDIO = import.meta.env.BASE_URL + 'timer.mp3'

const timerAlarm = new Audio(AUDIO);
timerAlarm.preload = 'auto';

const muteBtn = document.getElementById('mute') as HTMLButtonElement;
const muteIcon = document.getElementById('mute-icon') as SVGUseElement|null;

let unlocked = false;

export function unlockAudio():void {
    timerAlarm.volume = 0;
    timerAlarm.play().then(() => {
        timerAlarm.pause();
        timerAlarm.currentTime = 0;
        timerAlarm.volume = 1;
        unlocked = true;
    }).catch(() => {
    });
}

export function playPreEnd():void {
    if (!unlocked || !timerState.soundEnabled) return;
    timerAlarm.currentTime = 0;
    timerAlarm.play().catch(() => {})
}

function muteAudio():void {
    if (timerState.soundEnabled) {
        timerState.soundEnabled = false;
        timerAlarm.muted = true;
        muteIcon?.setAttribute("href", `${SPRITE}#icon-mute`);
    } else {
        timerState.soundEnabled = true;
        timerAlarm.muted = false;
        muteIcon?.setAttribute("href", `${SPRITE}#icon-volume`);
    }
}

muteBtn.addEventListener('click', muteAudio)