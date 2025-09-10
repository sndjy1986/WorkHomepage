document.addEventListener('DOMContentLoaded', () => {
    const timerNameInput = document.getElementById('timer-name');
    const start10MinButton = document.getElementById('start-10-min');
    const start20MinButton = document.getElementById('start-20-min');
    const timersContainer = document.getElementById('timers-container');

    // Keep track of active intervals
    const activeTimers = {};

    start10MinButton.addEventListener('click', () => {
        createTimer(timerNameInput.value || '10 Min Timer', 10 * 60);
    });

    start20MinButton.addEventListener('click', () => {
        createTimer(timerNameInput.value || '20 Min Timer', 20 * 60);
    });

    function createTimer(name, duration) {
        const timerId = `timer-${Date.now()}`;
        const timerBox = document.createElement('div');
        timerBox.className = 'timer-box';
        timerBox.id = timerId;

        const timerNameElement = document.createElement('div');
        timerNameElement.className = 'timer-name';
        timerNameElement.textContent = name;

        const timerTimeElement = document.createElement('div');
        timerTimeElement.className = 'timer-time';

        timerBox.appendChild(timerNameElement);
        timerBox.appendChild(timerTimeElement);
        timersContainer.appendChild(timerBox);

        let remainingTime = duration;

        const interval = setInterval(() => {
            remainingTime--;
            updateTimerDisplay(timerTimeElement, remainingTime);

            if (remainingTime <= 0) {
                clearInterval(interval);
                delete activeTimers[timerId]; // Remove from tracking
                timerBox.classList.add('completed');
                timerTimeElement.textContent = "Done!";
            }
        }, 1000);

        // Store the interval ID
        activeTimers[timerId] = interval;

        // Right-click to clear
        timerBox.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            clearInterval(activeTimers[timerId]);
            delete activeTimers[timerId];
            timerBox.remove();
        });

        updateTimerDisplay(timerTimeElement, remainingTime);
    }

    function updateTimerDisplay(element, time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        element.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
});
