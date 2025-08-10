export type Mode = 'pomodoro' | 'short' | 'long';

interface TimerState {
  mode: Mode;
  timeLeft: number;
  isRunning: boolean;
  intervalId: number | null;
  completedPomodoros: number;
  durations: Record<Mode, number>;
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
  }
};
