
var matchData = {
    date: "",
    timerTime: 0,
    isRunning: false,
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
var intervalSet = false;

function initData() {
    var data = localStorage.getItem('match');

    console.log(data);

    if(data != null) {
        matchData = JSON.parse(data);
    }

    timerTime = matchData.timerTime;

    initEventsList()
}

initData();


function storeData() {
    localStorage.setItem( 'match', JSON.stringify(matchData) );
}


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
        description: description,
        timerTime: getTimerTime(),
        actualTime: getActualTime()
    };

    matchData.events[matchData.events.length] = event;


    addEventToList(event);

    //storeData();
}

function clearEventsList() {
   // $(".events").empty();
}

function addEventToList(event) {
    $(".events").prepend('<div class="event"><div class="e_field_timer">' + event.timerTime + '</div><div class="e_field_description">' + event.description + ' (' + event.actualTime + ')</div></div>');
}


function initEventsList() {
    clearEventsList();
    for(var i in matchData.events) {
        addEventToList(matchData.events[i]);
    }
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
    if (!isRunning || !intervalSet) {
        isRunning = true;
        intervalSet = true;
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

    matchData.timerTime = timerTime;
    matchData.isRunning = isRunning;

    storeData();
}

