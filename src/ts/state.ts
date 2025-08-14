export type Mode = 'pomodoro' | 'short' | 'long';

interface TimerState {
  mode: Mode;
  timeLeft: number;
  isRunning: boolean;
  intervalId: number | null;
  completedPomodoros: number;
  durations: Record<Mode, number>;
  soundEnabled: boolean;
  preEndOffsetSec: number;
  preEndPlayed: boolean;
}

export const timerState: TimerState = {
  mode: 'pomodoro', 
  timeLeft: 0, 
  isRunning: false,
  intervalId: null,
  completedPomodoros: 0,
  durations: {
    pomodoro: 25,
    short: 5,
    long: 15
  },
  soundEnabled: true,
  preEndOffsetSec: 3,
  preEndPlayed: true,
};

export const SPRITE = import.meta.env.BASE_URL + 'symbol-defs.svg';