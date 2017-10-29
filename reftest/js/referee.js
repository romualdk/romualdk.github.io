MatchTimer = {};
MatchTimer.data = {
    
}

// as

MatchTimer.reset = function() {
    this.interval = null;
    this.data = {
        date: null,
        timerTime: 0,
        renderedTime: null,
        isRunning: false,
        team1: {
            name: "FS PROSKOWO",
            points: 0
        },
        team2: {
            name: "Lyon",
            points: 0
        },
        events: []
    };

    

    // load state
    this.initData();
    console.log(this.data);

    this.setRenderedTime();
    this.refreshTimerView();
    this.initEventsList();

    // init
    if(this.data.isRunning) {
        this.setStateRunning();
    }
    else {
        this.setStatePaused();
    }



    $(".start").click(function() {
        MatchTimer.addEvent("normal", "Start");
        MatchTimer.setStateRunning();
        
    });;
    
    $(".stop").click(function() {
        MatchTimer.addEvent("normal", "Pause");
        MatchTimer.setStatePaused();
        
    });
    
    $(".goal").click(function() {
        if(MatchTimer.data.isRunning) {
            MatchTimer.addEvent("goal", "Gol");
        }
    });
    
    $(".card").click(function() {
        if(MatchTimer.data.isRunning) {
            MatchTimer.addEvent("card", "Kartka");
        }
    });
}

MatchTimer.initData = function() {
    var data = localStorage.getItem('match');
    
    if(data != null) {
        this.data = JSON.parse(data);
    }
    else {
        var d = new Date();
        this.data.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }

    //initEventsList()
}

MatchTimer.storeData = function() {
    localStorage.setItem('match', JSON.stringify(this.data));
}


MatchTimer.setRenderedTime = function() {
    const numOfMinutes = Math.floor(this.data.timerTime / 60),
    numOfSeconds = this.data.timerTime % 60;

    var minutes = numOfMinutes >= 10 ? numOfMinutes : '0' + numOfMinutes;
    var seconds = numOfSeconds >= 10 ? numOfSeconds : '0' + numOfSeconds;

    this.data.renderedTime = minutes + ":" + seconds;
}

MatchTimer.initTimer = function() {
    
}

MatchTimer.setStateRunning = function() {
    this.data.isRunning = true;
    clearInterval(this.interval);
    this.interval = setInterval(MatchTimer.incrementTimer, 1000);

    $(".stop").removeClass("disabled");
    $(".start").addClass("disabled");

    $(".goal").removeClass("inactive");
    $(".card").removeClass("inactive");

    this.storeData();
}

MatchTimer.setStatePaused = function() {
    this.data.isRunning = false;
    clearInterval(this.interval);

    $(".start").removeClass("disabled");
    $(".stop").addClass("disabled");

    $(".goal").addClass("inactive");
    $(".card").addClass("inactive");

    this.storeData();
}

MatchTimer.incrementTimer = function() {
    MatchTimer.data.timerTime += 1;
    MatchTimer.setRenderedTime();
    MatchTimer.refreshTimerView();

    MatchTimer.storeData();
}

MatchTimer.refreshTimerView = function() {
    $('.timer').text(MatchTimer.data.renderedTime);
}


MatchTimer.getActualTime = function() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();

    minutes = minutes >= 10 ? minutes : '0' + minutes;

    return hours + ":" + minutes;
}


MatchTimer.addEvent = function(type, description) {
    var event = {
        type: type,
        description: description,
        timerTime: this.data.renderedTime,
        actualTime: this.getActualTime()
    };

    this.data.events[this.data.events.length] = event;

    MatchTimer.addEventToList(event);

    this.storeData();
}

MatchTimer.clearEventsList = function() {
    // $(".events").empty();
 }
 
 MatchTimer.addEventToList = function(event) {
     $(".events").prepend('<div class="event"><div class="e_field_timer">' + event.timerTime + '</div><div class="e_field_description">' + event.description + ' (' + event.actualTime + ')</div></div>');
 }
 
 
 MatchTimer.initEventsList = function() {
     this.clearEventsList();
     for(var i in this.data.events) {
         this.addEventToList(this.data.events[i]);
     }
 }


MatchTimer.reset();