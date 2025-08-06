export const timerState = {
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
