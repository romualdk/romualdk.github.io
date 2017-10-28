var timerTime = 0;
var interval = null;
var isRunning = false;

$(".start").click(function() {
    startTimer();
});;

$(".stop").click(function() {
    stopTimer();
});

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(incrementTimer, 1000);
    }

    $(".stop").removeClass("disabled");
    $(".start").addClass("disabled");
}

// Stop timer
function stopTimer() {
    isRunning = false;
    clearInterval(interval);

    $(".start").removeClass("disabled");
    $(".stop").addClass("disabled");
}

// Reset timer to zero
function resetTimer() {
    stopTimer();
    resetUI();
    timerTime = 0;
    seconds.innerText = '00';
    minutes.innerText = '00';
}

// Increment timer
function incrementTimer() {
    const numOfMinutes = Math.floor(timerTime / 60),
        numOfSeconds = timerTime % 60;

    timerTime = timerTime + 1;
    
    var minutes = numOfMinutes >= 10 ? numOfMinutes : '0' + numOfMinutes;
    var seconds = numOfSeconds >= 10 ? numOfSeconds : '0' + numOfSeconds;
    
    var time = minutes + ":" + seconds;

    $('.timer').text(time);
}

