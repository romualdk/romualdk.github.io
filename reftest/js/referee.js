MatchTimer = {};
MatchTimer.database = {};
MatchTimer.data = {
    match: {},
    currentMatch: null
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
    //this.storeData();
    this.initData();
    //console.log(this.data);
    this.refreshMatchList();

    $.getJSON( "data/data.json", function( data ) {
        if(typeof(data.match) == "undefiend") {
            return false;
        }

        MatchTimer.database.matches = [];

        /*for(key in data.match) {
            MatchTimer.database.matches[key] = data.match[key];
        }*/

        //MatchTimer.database.matches = data.match;
        MatchTimer.database.teams = data.team;
/*
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
        });*/


        $(".matchlistscreen").removeClass("disabled");
        $(".loadscreen").addClass("disabled");

        


        // load teams list
        for(var key in data.team) {
            var option = '<option>' + key + '</option>';
            $('.newmatchscreen .team1').append(option);
            $('.newmatchscreen .team2').append(option);
        }
/*
        $('.newmatchscreen .team1').change(function() {
            $('.newmatchscreen .team1players').empty();

            var team1 = $(this).val();
            if(typeof(data.team[team1]) !== "undefined") {
                
                for(var key in data.team[team1]) {
                    var option = '<option>' + data.team[team1][key] + '</option>';
                    $('.newmatchscreen .team1players').append(option);
                }
            }
            
        });*/

     // console.log(data);


      });

      $(".gameplayscreen .title .return").click(function() {
        MatchTimer.returnToMatchSelect();
      });


    $("button.newmatch").click(function() {
        MatchTimer.showScreen("newmatchscreen");
    });

    $("button.addnewmatch").click(function() {
        var team1 = $(".newmatchscreen .team1").val();
        var team2 = $(".newmatchscreen .team2").val();

        if(typeof(MatchTimer.database.teams[team1]) !== "undefined"
        && typeof(MatchTimer.database.teams[team2]) !== "undefined"
        && team1 != team2) {
            MatchTimer.addMatch(team1, team2);

            $(".newmatchscreen .team1 option:selected").removeAttr("selected");
            $(".newmatchscreen .team2 option:selected").removeAttr("selected");

            $(".newmatchscreen .team1 option:disabled").prop("selected", true);
            $(".newmatchscreen .team2 option:disabled").prop("selected", true);
        }
    });
      
}

String.prototype.escapeDiacritics = function() {
    return this.replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
   .replace(/ę/g, 'e').replace(/Ę/g, 'E')
   .replace(/ł/g, 'l').replace(/Ł/g, 'L')
   .replace(/ń/g, 'n').replace(/Ń/g, 'N')
   .replace(/ó/g, 'o').replace(/Ó/g, 'O')
   .replace(/ś/g, 's').replace(/Ś/g, 'S')
   .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
   .replace(/ź/g, 'z').replace(/Ź/g, 'Z');
}

MatchTimer.addMatch = function(team1, team2) {
    var id = team1 + "_" + team2 + "_" + MatchTimer.getActualDate();
    id = id.escapeDiacritics();
    id = id.replace(/[^0-9a-z_]/gi, '');
    
    if(typeof(this.data.match[id]) !== "undefined") {
        return false;
    }
    else {
        this.data.match[id] = {
            date: MatchTimer.getActualDate(),
            interval: null,
            lastTime: null,
            timerTime: 0,
            renderedTime: null,
            isRunning: false,
            team1: {
                name: team1,
                points: 0
            },
            team2: {
                name: team2,
                points: 0
            },
            events: []
        };
    }

    this.storeData();
    this.refreshMatchList();
    this.showScreen("matchlistscreen");
}

MatchTimer.refreshMatchList = function() {
    $(".matcheslist .teams").remove();

    for(var key in this.data.match) {
        var id = "match_" + key;

        if(typeof(this.data.match[key]) !== "undefined") {
            //console.log(this.data);

            var date = this.data.match[key].date;
            var team1 = this.data.match[key].team1.name;
            var team2 = this.data.match[key].team2.name;
    
            var button = "<div id=\"" + id + "\" class=\"teams\">"
            + "<div class=\"date\">" + date + "</div>"
            + "<div>"
            + "<div class=\"team field\"><div>" + team1 + "</div></div>"
            + "<div class=\"vs field\"><div>vs</div></div>"
            + "<div class=\"team field\"><div>" + team2 + "</div></div>"
            + "<div style=\"clear: left\"></div>"
            + "</div>"
            + "</div>";
    
            $(".matcheslist").append(button);
        
            $("#" + id).click(function() {
                var key = $(this).attr('id');
                key = key.replace('match_', '');
                //console.log(key);
                MatchTimer.setMatch(key);
            });
        }
    }

    //console.log(this.data);
}

MatchTimer.isRunningAnyMatch = function() {
    var i = 0;
    for(var key in this.data.match) {
        if(this.data.match[key].isRunning) {
            i++;
        }
    }
    return i > 0;
}

MatchTimer.showScreen = function(screenName) {
    $(".screen").not(".disabled").addClass("disabled");
    $(".screen." + screenName).removeClass("disabled");
}

MatchTimer.setDeleteButtonState = function() {
    var match = this.data.currentMatch;

    var isactive = this.data.match[match].events.length > 0;

    
    if(isactive && !this.data.match[match].isRunning) {
        var button = $(".controls .delete")

        $(button).removeClass("inactive");
        $(button).click(function() {
            MatchTimer.deleteData();
            MatchTimer.storeData();
            $(".gameplayscreen .events").empty();

            MatchTimer.setDeleteButtonState();
        });

        var button = $(".controls .email")
        
        $(button).removeClass("inactive");
        $(button).click(function() {
            MatchTimer.email();
        });

    }
    else {
        $(button).addClass("inactive");
        $(button).click(function() {return false});
    }

    
}

MatchTimer.setMatch = function(key) {
    //console.log("SET MATCH: " + key);

    this.data.currentMatch = key;

    this.reset();
    /*this.data.team1.name = this.database.matches[key][0];
    this.data.team2.name = this.database.matches[key][0];*/

    $("#team1 div").text(this.data.match[key].team1.name);
    $("#team2 div").text(this.data.match[key].team2.name);

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
    /*this.interval = null;
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
    };*/

    

    // load state
    /*this.initData();
*/

    var match = this.data.currentMatch;

    this.setRenderedTime();
    this.refreshTimerView();
    this.initEventsList();

    // init
    if(this.data.match[match].isRunning) {
        this.setStateRunning();
    }
    else {
        this.setStatePaused();
    }



    $(".start").click(function() {
        if(MatchTimer.isRunningAnyMatch()) {
            return false;
        }

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
        if(MatchTimer.data.match[match].isRunning) {
            MatchTimer.addEvent("goal", "Gol");
        }
    });
    
    $(".card").click(function() {
        if(MatchTimer.data.match[match].isRunning) {
            MatchTimer.addEvent("card", "Kartka");
        }
    });
}

MatchTimer.initData = function() {
    var data = localStorage.getItem('matchtimer');
    
    if(data != null) {
        this.data = JSON.parse(data);
    }
    /*else {
        var d = new Date();
        this.data.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }*/

    //initEventsList()
}

MatchTimer.storeData = function() {
    localStorage.setItem('matchtimer', JSON.stringify(this.data));
}


MatchTimer.setRenderedTime = function() {
    var match = this.data.currentMatch;

    const numOfMinutes = Math.floor(this.data.match[match].timerTime / 60),
    numOfSeconds = this.data.match[match].timerTime % 60;

    var minutes = numOfMinutes >= 10 ? numOfMinutes : '0' + numOfMinutes;
    var seconds = numOfSeconds >= 10 ? numOfSeconds : '0' + numOfSeconds;

    this.data.match[match].renderedTime = minutes + ":" + seconds;
}

MatchTimer.initTimer = function() {
    
}

MatchTimer.setStateRunning = function() {
    var match = this.data.currentMatch;

    this.data.match[match].isRunning = true;
    clearInterval(this.data.match[match].interval);

    var d = new Date();
    this.data.match[match].lastTime = d.getTime();
    this.data.match[match].interval = setInterval(MatchTimer.incrementTimer, 1000);

    $(".stop").removeClass("disabled");
    $(".start").addClass("disabled");

    $(".goal").removeClass("inactive");
    $(".card").removeClass("inactive");

    this.storeData();
}

MatchTimer.setStatePaused = function() {
    var match = this.data.currentMatch;

    this.data.match[match].isRunning = false;
    clearInterval(this.interval);

    $(".start").removeClass("disabled");
    $(".stop").addClass("disabled");

    $(".goal").addClass("inactive");
    $(".card").addClass("inactive");

    this.storeData();
}

MatchTimer.incrementTimer = function() {
    //MatchTimer.data.timerTime += 1;
    
    var match = MatchTimer.data.currentMatch;

    if(MatchTimer.data.match[match].isRunning == false) {
        return false;
    }

    var d = new Date();
    var t = d.getTime();

    MatchTimer.data.match[match].timerTime += Math.round((t - MatchTimer.data.match[match].lastTime) / 1000);
    MatchTimer.data.match[match].lastTime = t;

    MatchTimer.setRenderedTime();
    MatchTimer.refreshTimerView();

    MatchTimer.storeData();
}

MatchTimer.refreshTimerView = function() {
    var match = this.data.currentMatch;
    $('.timer').text(MatchTimer.data.match[match].renderedTime);
}


MatchTimer.getActualDate = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 

    return yyyy + "-" + mm + "-" + dd;
}

MatchTimer.getActualTime = function() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();

    minutes = minutes >= 10 ? minutes : '0' + minutes;

    return hours + ":" + minutes;
}


MatchTimer.addEvent = function(type, description) {
    var match = this.data.currentMatch;

    var event = {
        type: type,
        description: description,
        timerTime: this.data.match[match].renderedTime,
        actualTime: this.getActualTime()
    };

    this.data.match[match].events[this.data.match[match].events.length] = event;

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
    var match = this.data.currentMatch;

     this.clearEventsList();
     for(var i in this.data.events) {
         this.addEventToList(this.data.match[match].events[i]);
     }
 }

/*
MatchTimer.reset();*/


MatchTimer.email = function() {
    var match = this.data.match[this.data.currentMatch];

    var team1 = match.team1.name;
    var team2 = match.team2.name;
    var date = match.date;
    var events = "test";

    var senderEmail = "rk.app.mailer@gmail.com";
    var securityToken = "95d48787-a60d-4f8a-aabe-26849cdb857b";

    var email = 'romuald.kowalczyk@gmail.com';
    var subject = date + ": " + team1 + " vs " + team2;
    var body = events;

    /*
    var link = "mailto:" + email
 
    + "&subject=" + escape(subject)
    + "&body=" + escape(body);

    console.log(link);

    window.location.href = link;*/

    Email.send(senderEmail,
    email,
    subject,
    body,
    {token: securityToken});
}



MatchTimer.init();