MatchTimer = {};
MatchTimer.database = {};
MatchTimer.data = {
    
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

MatchTimer.init = function() {

    $.getJSON( "data/data.json", function( data ) {
        if(typeof(data.match) == "undefiend") {
            return false;
        }

        MatchTimer.database.matches = [];

        /*for(key in data.match) {
            MatchTimer.database.matches[key] = data.match[key];
        }*/

        MatchTimer.database.matches = data.match;

        $.each( MatchTimer.database.matches, function( key, val ) {
            var id = "match_" + key;
            var button = "<div id=\"" + id + "\" class=\"teams\">"
            + "<div class=\"date\">" + val[2] + "</div>"
            + "<div>"
            + "<div class=\"team field\"><div>" + val[0] + "</div></div>"
            + "<div class=\"vs field\"><div>vs</div></div>"
            + "<div class=\"team field\"><div>" + val[1] + "</div></div>"
            + "<div style=\"clear: left\"></div>"
            + "</div>"
          + "</div>";

          $(".matcheslist").append(button);
          $("#" + id).click(function() {
              var key = this.id.replace(/\D/g,'');;
              MatchTimer.setMatch(key);
          });
        });


        $(".matchlistscreen").removeClass("disabled");
        $(".loadscreen").addClass("disabled");

      });

      $(".gameplayscreen .title .return").click(function() {
        MatchTimer.returnToMatchSelect();
      });

      
}

MatchTimer.setDeleteButtonState = function() {
    var isactive = MatchTimer.data.events.length > 0;

    var button = $(".controls .delete")
    if(isactive && !this.data.isRunning) {
        $(button).removeClass("inactive");
        $(button).click(function() {
            MatchTimer.deleteData();
            MatchTimer.storeData();
            $(".gameplayscreen .events").empty();

            MatchTimer.setDeleteButtonState();
        });
    }
    else {
        $(button).addClass("inactive");
        $(button).click(function() {return false});
    }

    
}

MatchTimer.setMatch = function(key) {
    this.reset();
    this.data.team1.name = this.database.matches[key][0];
    this.data.team2.name = this.database.matches[key][0];

    $("#team1 div").text(this.data.team1.name);
    $("#team2 div").text(this.data.team2.name);

    $(".gameplayscreen").removeClass("disabled");
    $(".matchlistscreen").addClass("disabled");

    MatchTimer.setDeleteButtonState();
}

MatchTimer.returnToMatchSelect = function() {
    $(".matchlistscreen").removeClass("disabled");
    $(".gameplayscreen").addClass("disabled");
}


MatchTimer.deleteData = function() {
    this.data.date = null;
    this.data.lastTime = null;
    this.data.timerTime = null;
    this.data.renderedTime = null;
    this.data.isRunning = false;
    this.data.events = [];

    MatchTimer.setRenderedTime();
    MatchTimer.refreshTimerView();
}

MatchTimer.reset = function() {
    this.interval = null;
    this.data = {
        date: null,
        lastTime: null,
        timerTime: 0,
        renderedTime: null,
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

    

    // load state
    this.initData();

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

        MatchTimer.setDeleteButtonState();
        
    });;
    
    $(".stop").click(function() {
        MatchTimer.addEvent("normal", "Pause");
        MatchTimer.setStatePaused();

        MatchTimer.setDeleteButtonState();
        
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

    var d = new Date();
    this.data.lastTime = d.getTime();
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
    //MatchTimer.data.timerTime += 1;

    var d = new Date();
    var t = d.getTime();

    MatchTimer.data.timerTime += Math.round((t - MatchTimer.data.lastTime) / 1000);
    MatchTimer.data.lastTime = t;

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

    MatchTimer.setDeleteButtonState();
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

/*
MatchTimer.reset();*/

MatchTimer.init();