# Pomodoro App (TypeScript + Vite)

A minimal, accessible Pomodoro timer built with vanilla TypeScript, Vite, and an SVG/Canvas-like circular progress ring. Includes a settings modal with custom comboboxes, an audio pre-end cue, and automatic mode switching.

Live demo: <https://aburianenko.github.io/pomodoro-app/>

## Features

- Three modes: Pomodoro / Short break / Long break
- Auto-switching flow:

        After each Pomodoro → Short break
        Every 4th Pomodoro → Long break
        After Short break → Pomodoro (auto-continue)
        After Long break → Pomodoro (stops; user presses Play)

- Circular progress ring using progressbar.js
- Settings modal with custom comboboxes (no free text) to set durations per mode
- Pre-end audio cue (plays **3 seconds** before zero; configurable)
- Mute/Unmute toggle for the pre-end cue
- SVG sprite icons and strict TypeScript configuration

## Tech Stack

- TypeScript (strict mode)
- Vite (bundling/dev server)
- progressbar.js (ring)
- Plain HTML/CSS (no frameworks)

## Project Structure (key files)

```txt pomodoro-app
/public
  ├─ symbol-defs.svg     # SVG sprite (icons)
  └─ timer.mp3           # audio cue
/src
  ├─ ts/
  │  ├─ index.ts         # entry (imports feature modules)
  │  ├─ state.ts         # global timer state (durations, mode, etc.)
  │  ├─ timer.ts         # start/pause/reset loop (setInterval)
  │  ├─ switchMode.ts    # switchMode() and handleTimerEnd()
  │  ├─ display.ts       # updateDisplay() + MM:SS + ring update
  │  ├─ progressCircle.ts# progressbar.js wrapper
  │  ├─ modal.ts         # open/close modal + applySettingsFromModal()
  │  ├─ combobox.ts      # custom combobox logic for modal
  │  ├─ audio.ts         # unlockAudio(), playPreEnd(), mute logic
  │  └─ config.ts        # SPRITE path (BASE_URL helper)
  └─ style.css
index.html
vite.config.ts
tsconfig.json
```

## How It Works

### State (src/ts/state.ts)

type Mode = 'pomodoro' | 'short' | 'long'

timerState = {
mode, // current mode
timeLeft, // seconds
isRunning, intervalId,
completedPomodoros, // cycles counter
durations: { // minutes per mode
pomodoro: 25, short: 5, long: 15 //deafult duration
},
soundEnabled: true,
preEndOffsetSec: 3, // play audio N secs before zero
preEndPlayed: false
}

### Timer loop (src/ts/timer.ts)

- startTimer() sets isRunning, flips the Play/Pause icon, calls unlockAudio().
- A setInterval ticks once per second:
  timeLeft--
  When timeLeft <= preEndOffsetSec and > 0 and not yet played → playPreEnd()
  When timeLeft <= 0 → stop interval, call handleTimerEnd():

- If auto-continue (Pomodoro/Short break) → immediately startTimer() again
- If Long break ended → stop and show Play
- pauseTimer() clears interval and restores Play icon.
- resetTimer() clears interval and resets counters/time to initial duration.

### Mode switching (src/ts/switchMode.ts)

- switchMode(newMode):
  Stops any running interval, resets preEndPlayed
  Sets mode and timeLeft = durations[mode] \* 60
  Updates active tab class and re-renders the display

- handleTimerEnd() (“what’s next?”):
  Pomodoro → Short break (or Long break every 4th cycle)
  Short → Pomodoro (auto-continue)
  Long → Pomodoro (stop; user presses Play)

### Display & Ring (src/ts/display.ts + src/ts/progressCircle.ts)

- Renders MM:SS from timeLeft
- Updates the circular ring with progressbar.js _(clamped ratio, animated to match the 1s tick)_

### Settings Modal (src/ts/modal.ts + src/ts/combobox.ts)

- Open/Close modal via footer buttons
- Combobox values update a draft durations object
- OK button applies changes to timerState.durations and close modal without starting timer
  If current mode’s duration changed → updates timeLeft
  If the timer was running before opening → auto-resume with new values
  Close modal and refresh UI
- Play button applies changes to timerState.durations, close modal and start running timer

### Audio (src/ts/audio.ts)

- unlockAudio() primes the audio element on user gesture (required by browsers)
- playPreEnd() plays timer.mp3 when timeLeft nears zero
- Mute toggle flips timerState.soundEnabled and icon

Design inspired by the shared Figma community concept.
Built by _Anastasiia Burianenko_ with ❤️ in TypeScript.
