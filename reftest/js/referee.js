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

    $.getJSON("data/config.json", function(data) {
        if(typeof(data.match) == "undefiend") {
            return false;
        }

        MatchTimer.config = data;

        //set emails

        if(typeof(MatchTimer.config.email) !== "undefined") {
            $(".emailscreen form").append('<div class="listitem"><input type="checkbox" name="email" class="email_default" value="' + MatchTimer.config.email[0] + '" checked="checked" disabled="disabled"><label class="emaillist">' + MatchTimer.config.email[1] + '</label></div>');
        }

        if(typeof(MatchTimer.config.emails) !== "undefined") {
            for(key in MatchTimer.config.emails) {
                
                $(".emailscreen form").append('<div class="listitem"><input type="checkbox" class="email_y" value="' + MatchTimer.config.emails[key][0] + '"><label class="emaillist emailcheck_' + key + '">' + MatchTimer.config.emails[key][1] + '</label></div>');

                $(".emailcheck_" + key).click(function() {
                    var checkbox = $(this).prev();
                    
                    if($(checkbox).prop("checked")) {
                        $(checkbox).prop("checked", false)
                    }
                    else {
                        $(checkbox).prop("checked", true)
                    }
                    
                });
            }
        }

        $(".emailscreen form").append('<label>Inny:</label><input type="email" class="email_x" />');

        
    });

    $.getJSON( "data/data.json", function( data ) {
        if(typeof(data.match) == "undefiend") {
            return false;
        }
        MatchTimer.database.teams = data.team;


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

      $(".newmatchscreen .title .return").click(function() {
        MatchTimer.showScreen("matchlistscreen");
      });

      $(".goalscreen .title .return").click(function() {
        MatchTimer.showScreen("gameplayscreen");
      });

      $(".cardscreen .title .return").click(function() {
        MatchTimer.showScreen("gameplayscreen");
      });

      $(".emailscreen .title .return").click(function() {
        MatchTimer.showScreen("gameplayscreen");
      });

      $(".confirmdeletescreen .title .return").click(function() {
        MatchTimer.showScreen("gameplayscreen");
      });


      //$(".emailprogressscreen .load").addClass("disabled");

      $(".emailprogressscreen .title .return").click(function() {
        MatchTimer.showScreen("gameplayscreen");
      });

      $(".confirmdeletescreen .confirmdelete").click(function() {
        MatchTimer.deleteData();
        MatchTimer.storeData();
        $(".gameplayscreen .events").empty();

        MatchTimer.setDeleteButtonState();
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

    if(typeof(this.data.match[match]) == "undefined") {
        return false;
    }

    var isactive = this.data.match[match].events.length > 0;

    
    if(isactive && !this.data.match[match].isRunning) {
        // DELETE MATCH
        var button = $(".controls .delete")

        $(button).removeClass("inactive");
        $(button).off( "click" );
        $(button).click(function() {

            MatchTimer.showScreen("confirmdeletescreen");
  
        });

        // EMAIL MATCH
        var button = $(".controls .email")
        
        $(button).removeClass("inactive");
        $(button).off( "click" );
        $(button).click(function() {
            MatchTimer.showScreen("emailscreen");

            //$(".emailscreen .email").val(MatchTimer.config.email);

            $(".emailscreen .email").val("");
        });

        // DOWNLOAD MATCH
        var button = $(".controls .download")
        $(button).removeClass("inactive");
        $(button).off( "click" );
        $(button).click(function() {
            var match = MatchTimer.data.match[MatchTimer.data.currentMatch];

            if(match.events.length > 0) {
            
                var team1 = match.team1.name;
                var team2 = match.team2.name;
                var date = match.date;
                var events = "";

                var subject = date + ": " + team1 + " vs " + team2;
                var body = "<h1>" + team1 + " " + match.team1.points + ":" + match.team2.points + " " + team2 + "\n</h1>";

                body += "<h2>" + date + "</h2>"
                body += "<table>";

                for(var key in match.events) {
                    var event = match.events[key];

                    body += "<tr>"
                    body += "<td>" + event.timerTime + "</td><td>" + event.description + "</td><td>" + event.actualTime + "</td>"
                    body += "</tr>"
                }

                body += "</table>"
            
                var html = '<html>';
                html += '<head><meta charset="utf-8"><title>' + subject + '</title></head>';
                html += '<body>' + body + '</body>';
                html += '</html>';

                download(html, date + " " + team1 + " vs " + team2 + '.html', 'text/html')


                //download(JSON.stringify(MatchTimer.data.match[MatchTimer.data.currentMatch]), "match.txt", "text/plain");
            }

            
        });
    }
    else {
        $(button).addClass("inactive");
        $(button).off( "click" );
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



    // goal selects
    $(".goalscreen select.goalteam").empty();
    $(".goalscreen select.goalteam").append("<option disabled selected></option>");
    $(".goalscreen select.goalteam").append("<option>" + this.data.match[key].team1.name  + "</option>");
    $(".goalscreen select.goalteam").append("<option>" + this.data.match[key].team2.name  + "</option>");

    $(".goalscreen select.goalteam").change(function() {
        var team = $(this).val();
        
        if(typeof(MatchTimer.database.teams[team]) !== "undefined") {
            $(".goalscreen select.goalplayer").empty();
            $(".goalscreen select.goalplayer").append("<option disabled selected></option>");

            for(var key in MatchTimer.database.teams[team]) {
                $(".goalscreen select.goalplayer").append("<option>" + MatchTimer.database.teams[team][key] + "</option>");
            }
        }
    });

    $(".goalscreen select.goalplayer").change(function() {
        var player = $(".goalscreen select.goalplayer").val();

        if(player == "SAMOBÓJ") {
            var team = $(".goalscreen select.goalteam").val();
            var match = MatchTimer.data.match[MatchTimer.data.currentMatch];
        
            var opponentTeam = null;

            if(team == match.team1.name) {
                var opponentTeam = match.team2.name;
            }
            else if(team == match.team2.name) {
                var opponentTeam = match.team1.name;
            }

            if(typeof(MatchTimer.database.teams[opponentTeam]) !== "undefined") {
                $(".goalscreen select.opponentPlayer").empty();
                $(".goalscreen select.opponentPlayer").append("<option disabled selected></option>");
    
                for(var key in MatchTimer.database.teams[opponentTeam]) {
                    $(".goalscreen select.opponentPlayer").append("<option>" + MatchTimer.database.teams[opponentTeam][key] + "</option>");
                }
            }

            $(".goalscreen div.opponentPlayer").removeClass("disabled");
        }
        else {
            $(".goalscreen div.opponentPlayer").not("disabled").addClass("disabled");
        }
    });

    $(".goalscreen button.addgoal").click(function() {
        MatchTimer.addGoal();
    });


    // card selects
    $(".cardscreen select.cardteam").empty();
    $(".cardscreen select.cardteam").append("<option disabled selected></option>");
    $(".cardscreen select.cardteam").append("<option>" + this.data.match[key].team1.name  + "</option>");
    $(".cardscreen select.cardteam").append("<option>" + this.data.match[key].team2.name  + "</option>");

    $(".cardscreen select.cardteam").change(function() {
        var team = $(this).val();
        
        if(typeof(MatchTimer.database.teams[team]) !== "undefined") {
            $(".cardscreen select.cardplayer").empty();
            $(".cardscreen select.cardplayer").append("<option disabled selected></option>");

            for(var key in MatchTimer.database.teams[team]) {
                $(".cardscreen select.cardplayer").append("<option>" + MatchTimer.database.teams[team][key] + "</option>");
            }
        }
    });

    $(".cardscreen button.addcard").click(function() {
        MatchTimer.addCard();
    });

    $(".emailscreen button.sendemail").click(function() {
        MatchTimer.sendEmail();
    });
    

    MatchTimer.refreshEventsList();
    MatchTimer.refreshPointsView();
}


MatchTimer.addGoal = function() {

    var team = $(".goalscreen select.goalteam").val();
    var player = $(".goalscreen select.goalplayer").val();

    var match = MatchTimer.data.match[MatchTimer.data.currentMatch];

    if(team != match.team1.name && team != match.team2.name) {
        return false;
    }
    else if(team == match.team1.name) {
        var teamNo = 1;
    }
    else {
        var teamNo = 2;
    }

    if(MatchTimer.database.teams[team].indexOf(player) == -1) {
        return false;
    }

/*
    if(player == "SAMOBÓJ") {
        teamNo = teamNo == 1 ? 2 : 1;
    }
*/
    

    var addEvent = false;

    if(player == "SAMOBÓJ") {
        var opponentPlayer = $(".goalscreen select.opponentPlayer").val();

        if(opponentPlayer !== null) {
            MatchTimer.addEvent("goal", "Gol " + team + " (" + player + " " + opponentPlayer + ")", team, player);

            addEvent = true;
        }
    }
    else {
        MatchTimer.addEvent("goal", "Gol " + team + " (" + player + ")", team, player);

        addEvent = true;
    }


    if(addEvent) {
        if(teamNo == 1) {
            MatchTimer.data.match[MatchTimer.data.currentMatch].team1.points += 1;
        }
        else if(teamNo == 2) {
            MatchTimer.data.match[MatchTimer.data.currentMatch].team2.points += 1;
        }

        MatchTimer.refreshPointsView();
        
        MatchTimer.showScreen("gameplayscreen");
    
        $(".goalscreen .goalteam option:selected").removeAttr("selected");
        $(".goalscreen .goalplayer option:selected").removeAttr("selected");
        $(".goalscreen .opponentPlayer option:selected").removeAttr("selected");
    
        $(".goalscreen .goalteam option:disabled").prop("selected", true);
        $(".goalscreen .goalplayer option:disabled").prop("selected", true);
        $(".goalscreen .opponentPlayer option:disabled").prop("selected", true);

        $(".goalscreen div.opponentPlayer").addClass("disabled");
        
    }
    
    
}


MatchTimer.addCard = function() {
    var type = $(".cardscreen select.cardtype").val();
    var team = $(".cardscreen select.cardteam").val();
    var player = $(".cardscreen select.cardplayer").val();

    var match = MatchTimer.data.match[MatchTimer.data.currentMatch];

    if(typeof(type) == "undefined" || type == null) {
        return false;
    }

    if(team != match.team1.name && team != match.team2.name) {
        return false;
    }

    if(MatchTimer.database.teams[team].indexOf(player) == -1) {
        return false;
    }

    MatchTimer.addEvent("card", type + " " + player + " (" + team + ")");

    MatchTimer.showScreen("gameplayscreen");

    $(".cardscreen .cardtype option:selected").removeAttr("selected");
    $(".cardscreen .cardteam option:selected").removeAttr("selected");
    $(".cardscreen .cardplayer option:selected").removeAttr("selected");

    $(".cardscreen .cardtype option:disabled").prop("selected", true);
    $(".cardscreen .cardteam option:disabled").prop("selected", true);
    $(".cardscreen .cardplayer option:disabled").prop("selected", true);
}



MatchTimer.returnToMatchSelect = function() {
    $(".matchlistscreen").removeClass("disabled");
    $(".gameplayscreen").addClass("disabled");
}


MatchTimer.deleteData = function() {
    /*this.data.date = null;
    this.data.lastTime = null;
    this.data.timerTime = null;
    this.data.renderedTime = null;
    this.data.isRunning = false;
    this.data.events = [];*/

    var match = MatchTimer.data.currentMatch;

    if(MatchTimer.data.match[match].events.length == 0) {
        delete MatchTimer.data.match[match];
        MatchTimer.refreshMatchList();
        MatchTimer.showScreen("matchlistscreen");

        MatchTimer.storeData();

    }
    else {
        MatchTimer.data.match[match].lastTime = null;
        MatchTimer.data.match[match].timerTime = null;
        MatchTimer.data.match[match].renderedTime = null;
        MatchTimer.data.match[match].isRunning = false;
        MatchTimer.data.match[match].events = [];
        MatchTimer.data.match[match].team1.points = 0;
        MatchTimer.data.match[match].team2.points = 0;
    
        MatchTimer.setRenderedTime();
        MatchTimer.refreshTimerView();
        MatchTimer.refreshPointsView();
        MatchTimer.refreshEventsList();

        MatchTimer.showScreen("gameplayscreen");
    }

    
}

MatchTimer.reset = function() {
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


    $(".start").off( "click" );
    $(".start").click(function() {
        if(MatchTimer.isRunningAnyMatch()) {
            return false;
        }

        MatchTimer.addEvent("normal", "Start");
        MatchTimer.setStateRunning();

        MatchTimer.setDeleteButtonState();
        
    });;
    
    $(".stop").off( "click" );
    $(".stop").click(function() {
        MatchTimer.addEvent("normal", "Stop");
        MatchTimer.setStatePaused();

        MatchTimer.setDeleteButtonState();
        
    });
    
    $(".goal").off( "click" );
    $(".goal").click(function() {
        if(MatchTimer.data.match[MatchTimer.data.currentMatch].isRunning) {

            MatchTimer.showScreen("goalscreen");

            /*MatchTimer.addEvent("goal", "Gol");*/
        }
    });
    
    $(".card").off( "click" );
    $(".card").click(function() {
        if(MatchTimer.data.match[MatchTimer.data.currentMatch].isRunning) {

            MatchTimer.showScreen("cardscreen");

            //MatchTimer.addEvent("card", "Kartka");
        }
    });

    $(".email").off( "click" );
    $(".email").click(function() {
        if(MatchTimer.data.match[MatchTimer.data.currentMatch].isRunning) {

            MatchTimer.showScreen("emailscreen");

            //MatchTimer.addEvent("card", "Kartka");
        }
    });
}

MatchTimer.initData = function() {
    var data = localStorage.getItem('matchtimer');
    
    if(data != null) {
        this.data = JSON.parse(data);
    }
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
    //clearInterval(this.interval);
    clearInterval(this.data.match[match].interval);

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


MatchTimer.refreshPointsView = function() {
    var match = MatchTimer.data.match[MatchTimer.data.currentMatch];
    var result = match.team1.points + ":" + match.team2.points;

    $(".gameplayscreen .result.field div").text(result);
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


MatchTimer.addEvent = function(type, description, val1, val2, val3, val4) {
    var match = this.data.currentMatch;

    var event = {
        type: type,
        description: description,
        timerTime: this.data.match[match].renderedTime,
        actualTime: this.getActualTime(),
        val1: val1,
        val2: val2,
        val3: val3,
        val4: val4
    };

    console.log(val1, val2);

    this.data.match[match].events[this.data.match[match].events.length] = event;

    //MatchTimer.addEventToList(event);
    MatchTimer.refreshEventsList();

    this.storeData();

    MatchTimer.setDeleteButtonState();
}

MatchTimer.clearEventsList = function() {
    // $(".events").empty();
 }
 
MatchTimer.refreshEventsList = function() {
    var events = MatchTimer.data.match[MatchTimer.data.currentMatch].events;

    $(".gameplayscreen .events").empty();

    for(var key in events) {
        var event = events[key];
        $(".gameplayscreen .events").prepend('<div id="event_' + key + '" class="event"><div class="e_field_timer">' + event.timerTime + '</div><div class="e_field_description">' + event.description + ' (' + event.actualTime + ')</div></div>');
    
        $("#event_" + key).click(function() {

            var id = this.id.replace("event_", "");
            var event = MatchTimer.data.match[MatchTimer.data.currentMatch].events[id];
            console.log(event.type)

            if(event.type == 'goal') {

                console.log(event);
                $(".goalscreen select.goalteam").val(event.val1).change();
                $(".goalscreen select.goalplayer").val(event.val2).change();

                MatchTimer.showScreen("goalscreen");
            }
        });
    }

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

MatchTimer.sendEmail = function() {
    var email = $(".emailscreen .email_default").val();
    var email_x = $(".emailscreen .email_x").val();

    var email_y = [];

    $(".email_y:checked").each(function(i) {
        email_y[i] = $(this).val();
    });

    if(typeof(email_x) !== "undefined" && email_x.length > 0) {
        email_y[email_y.length] = email_x;
    }

    
    var senderEmail = MatchTimer.config.senderEmail;
    var securityToken = MatchTimer.config.securityToken;

    var match = this.data.match[this.data.currentMatch];
    var team1 = match.team1.name;
    var team2 = match.team2.name;
    var date = match.date;
    var events = "";

    var subject = date + ": " + team1 + " vs " + team2;
    var body = "<h1>" + team1 + " " + match.team1.points + ":" + match.team2.points + " " + team2 + "\n</h1>";

    body += "<h2>" + date + "</h2>"
    body += "<table>";

    for(var key in match.events) {
        var event = match.events[key];

        body += "<tr>"
        body += "<td>" + event.timerTime + "</td><td>" + event.description + "</td><td>" + event.actualTime + "</td>"
        body += "</tr>"
    }

    body += "</table>"

    $(".emailprogressscreen .loader").removeClass("disabled");
    $(".emailprogressscreen .error").not(".disabled").addClass("disabled");
    //MatchTimer.showScreen("emailprogressscreen");


    //Email.handleUI = true;

    Email.send(senderEmail,
        email,
        subject,
        body,
        {
            token: securityToken
        });
    
    //Email.handleUI = false;
    for(i in email_y) {
        Email.send(senderEmail,
            email_y[i],
            subject,
            body,
            {
                token: securityToken
            });
    }

    MatchTimer.showScreen("gameplayscreen");

}



MatchTimer.init();