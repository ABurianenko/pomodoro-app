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
    pomodoro: 0.2,
    short: 0.05,
    long: 0.1
  }
};
