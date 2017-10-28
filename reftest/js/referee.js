var matchData = {
    date: "",
    team1: {
        name: "",
        points: 0
    },
    team2: {
        name: "",
        points: 0
    },
    events: []
};

var timerTime = 0;
var renderedTime = "00:00";
var interval = null;
var isRunning = false;


function getActualTime() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();

    minutes = minutes >= 10 ? minutes : '0' + minutes;
    seconds = seconds >= 10 ? seconds : '0' + seconds;

    return hours + ":" + minutes + ":" + seconds;
}

function getTimerTime() {
    /*const numOfMinutes = Math.floor(timerTime / 60),
    numOfSeconds = timerTime % 60;

    var minutes = numOfMinutes >= 10 ? numOfMinutes : '0' + numOfMinutes;
    var seconds = numOfSeconds >= 10 ? numOfSeconds : '0' + numOfSeconds;

    return minutes + ":" + seconds;*/

    return renderedTime;
}

function addEvent(eventType, description) {
    var event = {
        type: eventType,
        event: description,
        timerTime: getTimerTime(),
        actualTime: getActualTime()
    };

    matchData.events[matchData.events.length] = event;


    $(".events").prepend('<div class="event"><div class="e_field_timer">' + event.timerTime + '</div><div class="e_field_description">' + event.event + ' (' + event.actualTime + ')</div></div>');
}


/*addEvent("normal", "Start");*/

function addEventToList(event) {

}




$(".start").click(function() {
    addEvent("normal", "Start");
    startTimer();
    
});;

$(".stop").click(function() {
    addEvent("normal", "Stop");
    stopTimer();
    
});

$(".goal").click(function() {
    if(isRunning) {
        addEvent("goal", "Gol");
    }
    
});

$(".card").click(function() {
    if(isRunning) {
        addEvent("card", "Kartka");
    }
    
});

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(incrementTimer, 1000);
    }

    $(".stop").removeClass("disabled");
    $(".start").addClass("disabled");

    $(".goal").removeClass("inactive");
    $(".card").removeClass("inactive");
}

// Stop timer
function stopTimer() {
    isRunning = false;
    clearInterval(interval);

    $(".start").removeClass("disabled");
    $(".stop").addClass("disabled");

    $(".goal").addClass("inactive");
    $(".card").addClass("inactive");
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

    renderedTime = time;

    $('.timer').text(time);
}

