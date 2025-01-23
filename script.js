let timeLeft = 25 * 60; // 30 minutes in seconds
let timerId = null;
let isRunning = false;
let isWorkMode = true;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeButton = document.getElementById('mode');
const addTimeButton = document.getElementById('add-time');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update timer display
    timerDisplay.textContent = timeString;
    
    // Update browser tab title
    const mode = isWorkMode ? 'Work' : 'Rest';
    document.title = timeString + ` - ${mode} - Pomodoro Timer`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                alert('Pomodoro session completed!');
                resetTimer();
            }
        }, 1000);
    } else {
        clearInterval(timerId);
        isRunning = false;
        startButton.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    startButton.textContent = 'Start';
    updateDisplay();
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    modeButton.textContent = isWorkMode ? 'Rest Mode' : 'Work Mode';
    resetTimer();
}

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 5 minutes (300 seconds)
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
modeButton.addEventListener('click', toggleMode);
addTimeButton.addEventListener('click', addFiveMinutes); 