var isLoading = false;
var isReturningToInitialState = false;
let lastButtonClickTime = 0;
const cooldown = 600000; // 10 minutes in milliseconds
function generateRandomNumber() {



    if (isLoading || isReturningToInitialState) {
            return; // Если загрузка уже идет или возвращение идет, игнорируем нажатие кнопки
        }

        isLoading = true;

        document.querySelector('.bar').style.width = '0%'; // Сбрасываем ширину полосы загрузки
        setTimeout(function() {
            document.querySelector('.bar').style.width = '100%'; // Устанавливаем ширину на 100%
            setTimeout(function() {
                document.querySelector('.bar').style.width = '0%'; // Сбрасываем ширину обратно на 0% через 2 секунды
                isReturningToInitialState = true;
                isLoading = false; // Разблокируем кнопку после возвращения в исходное состояние
            }, 11000); // Сбрасываем ширину через 2 секунды
            setTimeout(function() {
                isReturningToInitialState = false;
            }, 22000); // Устанавливаем флаг в изначальное состояние через 2 секунды
            setTimeout(showText, 10000); // Показываем текст через 16 секунд
        }, 100); 
}

function getRan(min, max) {
    return Math.random() * (max - min) + min;
}


function pad(number) {
    return (number < 4 ? '0' : '') + number;
}


function showText() {
    let currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + 30);
    let hours = pad(currentDate.getHours());
    let minutes = pad(currentDate.getMinutes());
    let seconds = pad(currentDate.getSeconds());
    currentDate.setMinutes(currentDate.getMinutes() + 1);
    let hours1 = pad(currentDate.getHours());
    let minutes1 = pad(currentDate.getMinutes());
    let seconds1 = pad(currentDate.getSeconds());

    let timeText = `${hours}:${minutes}:${seconds}-${hours1}:${minutes1}:${seconds1}`;
    document.getElementById("time").textContent = timeText;
    localStorage.setItem('timeText', timeText);

    let randomNumber1 = getRan(2, 3).toFixed(2);
    let randomNumber2 = getRan(4, 7).toFixed(2);
    let randomNumber3 = getRan(86, 97).toFixed(0);
    let resultText = `${randomNumber1}Х - ${randomNumber2}Х`;
    document.getElementById("result").textContent = resultText;
    localStorage.setItem('resultText', resultText);

    let chanceText = `${randomNumber3}%`;
    document.getElementById("chance").textContent = chanceText;
    localStorage.setItem('chanceText', chanceText);

}


function restoreState(){
    if(localStorage.getItem('timeText')){
        document.getElementById("time").textContent = localStorage.getItem('timeText');
    }
    if(localStorage.getItem('resultText')){
        document.getElementById("result").textContent = localStorage.getItem('resultText');
    }
    if(localStorage.getItem('chanceText')){
        document.getElementById("chance").textContent = localStorage.getItem('chanceText');
    }
}

// Вызовите restoreState() при загрузке страницы
document.addEventListener("DOMContentLoaded", restoreState);



let countdown;
let timerRunning = false; // Изначально таймер не запущен
const timerDisplay = document.getElementById('timers');
const startButton = document.getElementById('startButton');

function saveTimerState(timeLeft) {
  localStorage.setItem('timeLeft', timeLeft);
  localStorage.setItem('timestamp', Date.now());
}

function clearTimerState() {
  localStorage.removeItem('timeLeft');
  localStorage.removeItem('timestamp');
}

function startTimer(duration) {
  let timeLeft = duration;

  countdown = setInterval(function() {
    let minutes = parseInt(timeLeft / 60, 10);
    let seconds = parseInt(timeLeft % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = minutes + ":" + seconds;

    if (--timeLeft < 0) {
      clearInterval(countdown);
      timerDisplay.textContent = '';
      startButton.removeAttribute('disabled'); // Разблокировать кнопку
     
      timerRunning = false; // Установить состояние таймера как не запущен
      clearTimerState();
    } else {
      saveTimerState(timeLeft);
    }
  },1000);
}

function restoreTimer() {
  let savedTimeLeft = localStorage.getItem('timeLeft');
  let savedTimestamp = localStorage.getItem('timestamp');

  if (savedTimeLeft && savedTimestamp) {
    let currentTime = Date.now();
    let elapsedTime = Math.floor((currentTime - savedTimestamp) / 1000); // Прошедшее время в секундах
    let timeLeft = savedTimeLeft - elapsedTime;

    if (timeLeft > 0) {
      startTimer(timeLeft);
      timerRunning = true;
      startButton.setAttribute('disabled', 'true'); 
     
      timerDisplay.style.display = 'block'; // Показать таймер
    } else {
      clearTimerState();
    }
  }
}

function initializeTimer() {
  startButton.addEventListener('click', function() {
    if (countdown) {
      clearInterval(countdown);
      timerDisplay.textContent = '';
      timerRunning = false; 
      clearTimerState();
    }

    if (!timerRunning) {
      let duration = 60; // 10 минут в секундах

      startButton.setAttribute('disabled', 'true'); // Заблокировать кнопку
    

      timerDisplay.style.display = 'none'; // Скрыть таймер

      // Появление таймера через 10 секунд
      setTimeout(() => {
        startTimer(duration);
        timerDisplay.style.display = 'block'; // Показать таймер
        timerRunning = true; // Установить состояние таймера как запущен
      }, 9100); // 10000 миллисекунд = 10 секунд
    }
  });

  restoreTimer(); // Восстановление состояния таймера при загрузке страницы
}

initializeTimer();



