/* global $, download, localStorage, Email */

var MatchTimer = {}
MatchTimer.database = {}
MatchTimer.data = {
  match: {},
  lastRefereeName: null,
  currentMatch: null
}

MatchTimer.init = function () {
  this.initData()
  this.refreshMatchList()

  $.getJSON('data/config.json', function (data) {
    if (typeof (data) === 'undefined') {
      return false
    }

    MatchTimer.config = data

    // set emails

    if (typeof (MatchTimer.config.email) !== 'undefined') {
      $('.emailscreen form').append('<div class="listitem"><input type="checkbox" name="email" class="email_default" value="' + MatchTimer.config.email[0] + '" checked="checked" disabled="disabled"><label class="emaillist">' + MatchTimer.config.email[1] + '</label></div>')
    }

    if (typeof (MatchTimer.config.emails) !== 'undefined') {
      for (var key in MatchTimer.config.emails) {
        $('.emailscreen form').append('<div class="listitem"><input type="checkbox" class="email_y" value="' + MatchTimer.config.emails[key][0] + '"><label class="emaillist emailcheck_' + key + '">' + MatchTimer.config.emails[key][1] + '</label></div>')

        $('.emailcheck_' + key).click(function () {
          var checkbox = $(this).prev()

          if ($(checkbox).prop('checked')) {
            $(checkbox).prop('checked', false)
          } else {
            $(checkbox).prop('checked', true)
          }
        })
      }
    }

    $('.emailscreen form').append('<label>Inny:</label><input type="email" class="email_x" />')
  })

  $.getJSON('data/data.json', function (data) {
    if (typeof (data) === 'undefined') {
      return false
    }

    MatchTimer.database.teams = data.team

    $('.matchlistscreen').removeClass('disabled')

    $('.loadscreen').addClass('disabled')

    // load teams list

    for (var key in data.team) {
      var option = '<option>' + key + '</option>'

      $('.newmatchscreen .team1').append(option)

      $('.newmatchscreen .team2').append(option)
    }

    // set last referee name

    if (typeof (data.lastRefereeName) !== 'undefined' &&

        data.lastRefereeName.length > 0) {
      $('.newmatchscreen .referee').val(data.lastRefereeName)
    }
  })

  $('.gameplayscreen .title .return').click(function () {
    MatchTimer.returnToMatchSelect()
  })

  $('.newmatchscreen .title .return').click(function () {
    MatchTimer.showScreen('matchlistscreen')
  })

  $('.goalscreen .title .return').click(function () {
    MatchTimer.showScreen('gameplayscreen')

    $('.goalscreen select.goalteam').val('').change()

    $('.goalscreen select.goalplayer').val('').change()

    MatchTimer.editEvent = false
  })

  $('.goalscreen .deletegoal').click(function () {
    // MatchTimer.deleteGoal();

    MatchTimer.showScreen('confirmgoaldeletescreen')
  })

  $('.cardscreen .title .return').click(function () {
    MatchTimer.showScreen('gameplayscreen')

    $('.cardscreen select.cardtype').val('').change()

    $('.cardscreen select.cardteam').val('').change()

    $('.cardscreen select.cardplayer').val('').change()

    MatchTimer.editEvent = false
  })

  $('.cardscreen .deletecard').click(function () {
    // MatchTimer.deleteCard();

    MatchTimer.showScreen('confirmcarddeletescreen')
  })

  $('.emailscreen .title .return').click(function () {
    MatchTimer.showScreen('gameplayscreen')
  })

  $('.confirmdeletescreen .title .return').click(function () {
    MatchTimer.showScreen('gameplayscreen')
  })

  $('.confirmgoaldeletescreen .title .return').click(function () {
    MatchTimer.showScreen('goalscreen')
  })

  $('.confirmcarddeletescreen .title .return').click(function () {
    MatchTimer.showScreen('cardscreen')
  })

  // $(".emailprogressscreen .load").addClass("disabled");

  $('.emailprogressscreen .title .return').click(function () {
    MatchTimer.showScreen('gameplayscreen')
  })

  $('.confirmdeletescreen .confirmdelete').click(function () {
    MatchTimer.deleteData()

    MatchTimer.storeData()

    $('.gameplayscreen .events').empty()

    MatchTimer.setDeleteButtonState()
  })

  $('.confirmgoaldeletescreen .confirmgoaldelete').click(function () {
    MatchTimer.deleteGoal()
  })

  $('.confirmcarddeletescreen .confirmcarddelete').click(function () {
    MatchTimer.deleteCard()
  })

  $('.matchnotes').on('change keyup paste', function () {
    var match = MatchTimer.data.currentMatch

    MatchTimer.data.match[match].notes = $(this).val()
  })

  $('button.newmatch').click(function () {
    MatchTimer.showScreen('newmatchscreen')
  })

  // Team checklist
  $('button.teamChecklist').click(function () {
    MatchTimer.refreshTeamChecklist()
    MatchTimer.showScreen('teamchecklistscreen')
  })

  $('.teamchecklistscreen .title .return').click(function () {
    MatchTimer.showScreen('gameplayscreen')
  })

  $('.teamchecklistscreen .ok').click(function () {
    MatchTimer.showScreen('gameplayscreen')
  })

  $('button.addnewmatch').click(function () {
    var team1 = $('.newmatchscreen .team1').val()
    var team2 = $('.newmatchscreen .team2').val()
    var refereeName = $('.newmatchscreen .referee').val()

    if (typeof (MatchTimer.database.teams[team1]) !== 'undefined' &&
        typeof (MatchTimer.database.teams[team2]) !== 'undefined' &&
        team1 !== team2 &&
        typeof (refereeName) !== 'undefined' &&
        refereeName.length > 0) {
      MatchTimer.addMatch(team1, team2, refereeName)

      $('.newmatchscreen .team1 option:selected').removeAttr('selected')
      $('.newmatchscreen .team2 option:selected').removeAttr('selected')
      $('.newmatchscreen .team1 option:disabled').prop('selected', true)
      $('.newmatchscreen .team2 option:disabled').prop('selected', true)
    }
  })
}

function escapeDiacritics (str) {
  return str.replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
    .replace(/ę/g, 'e').replace(/Ę/g, 'E')
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/ń/g, 'n').replace(/Ń/g, 'N')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ś/g, 's').replace(/Ś/g, 'S')
    .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
    .replace(/ź/g, 'z').replace(/Ź/g, 'Z')
}

MatchTimer.refreshTeamChecklist = function () {
  var match = this.data.match[this.data.currentMatch]

  if (typeof match.team1.players === 'undefined') {
    match.team1.players = []
  }

  if (typeof match.team2.players === 'undefined') {
    match.team2.players = []
  }

  var db1 = this.database.teams[match.team1.name]
  var db2 = this.database.teams[match.team2.name]

  var list1 = $('.teamchecklistscreen .teamlist form.team1')
  var list2 = $('.teamchecklistscreen .teamlist form.team2')

  // Team 1
  list1.empty()
  list1.append(`<div class="teams"><div class="team field">` + match.team1.name + `</div></div>`)

  for (let i in db1) {
    if (db1[i] !== 'SAMOBÓJ') {
      let checked = match.team1.players.includes(db1[i]) ? ' checked="checked"' : ''
      list1.append(`<div class="listitem">
      <input type="checkbox" name="` + i + `"` + checked + ` team="team1"><label>` + db1[i] + `</label>
     </div>`)
    }
  }

  // Team 2
  list2.empty()
  list2.append(`<div class="teams"><div class="team field">` + match.team2.name + `</div></div>`)

  for (let i in db2) {
    if (db2[i] !== 'SAMOBÓJ') {
      let checked = match.team2.players.includes(db2[i]) ? ' checked="checked"' : ''
      list2.append(`<div class="listitem">
      <input type="checkbox" name="` + i + `"` + checked + ` team="team2"><label>` + db2[i] + `</label>
     </div>`)
    }
  }

  $('.teamchecklistscreen .listitem label').click(function () {
    var team = $(this).parent().find('input').attr('team')
    var player = $(this).text()
    var checkbox = $(this).parent().find('input')
    var checked = !checkbox[0].checked
    checkbox[0].checked = checked

    updateTeamPlayer(team, player, checked)
  })

  $('.teamchecklistscreen .listitem input').change(function () {
    var team = $(this).attr('team')
    var player = $(this).parent().find('label').text()
    var checked = $(this)[0].checked

    updateTeamPlayer(team, player, checked)
  })
}

function updateTeamPlayer (team, player, checked) {
  var match = MatchTimer.data.match[MatchTimer.data.currentMatch]

  if (checked) {
    match[team].players.push(player)
    match[team].players.sort()
  } else {
    const index = match[team].players.indexOf(player)
    if (index > -1) {
      match[team].players.splice(index, 1)
    }
  }

  // remove duplicates
  match[team].players = [...new Set(match[team].players)]

  MatchTimer.storeData()
}

MatchTimer.addMatch = function (team1, team2, refereeName) {
  var id = team1 + '_' + team2 + '_' + MatchTimer.getActualDate()
  id = escapeDiacritics(id)
  id = id.replace(/[^0-9a-z_]/gi, '')

  if (typeof (this.data.match[id]) !== 'undefined') {
    return false
  } else {
    this.data.match[id] = {
      date: MatchTimer.getActualDate(),
      interval: null,
      lastTime: null,
      timerTime: 0,
      renderedTime: null,
      isRunning: false,
      notes: 'Uwagi:\n',
      team1: {
        name: team1,
        points: 0
      },
      team2: {
        name: team2,
        points: 0
      },
      refereeName: refereeName,
      events: []
    }
    this.data.lastRefereeName = refereeName
  }

  this.storeData()
  this.refreshMatchList()
  this.showScreen('matchlistscreen')
}

MatchTimer.refreshMatchList = function () {
  $('.matcheslist .teams').remove()

  for (var key in this.data.match) {
    var id = 'match_' + key

    if (typeof (this.data.match[key]) !== 'undefined') {
      var date = this.data.match[key].date
      var team1 = this.data.match[key].team1.name
      var team2 = this.data.match[key].team2.name
      var button = '<div id="' + id + '" class="teams">' +
            '<div class="date">' + date + '</div>' +
            '<div>' +
            '<div class="team field"><div>' + team1 + '</div></div>' +
            '<div class="vs field"><div>vs</div></div>' +
            '<div class="team field"><div>' + team2 + '</div></div>' +
            '<div style="clear: left"></div>' +
            '</div>' +
            '</div>'

      $('.matcheslist').append(button)

      $('#' + id).click(function () {
        var key = $(this).attr('id')
        key = key.replace('match_', '')
        MatchTimer.setMatch(key)
      })
    }
  }
}

MatchTimer.isRunningAnyMatch = function () {
  var i = 0

  for (var key in this.data.match) {
    if (this.data.match[key].isRunning) {
      i++
    }
  }

  return i > 0
}

MatchTimer.showScreen = function (screenName) {
  $('.screen').not('.disabled').addClass('disabled')
  $('.screen.' + screenName).removeClass('disabled')
  window.scrollTo(0, 0)
}

MatchTimer.setDeleteButtonState = function () {
  var match = this.data.currentMatch

  if (typeof (this.data.match[match]) === 'undefined') {
    return false
  }

  var isactive = this.data.match[match].events.length > 0

  if (isactive && !this.data.match[match].isRunning) {
    // DELETE MATCH

    var button = $('.controls .delete')

    $(button).removeClass('inactive')
    $(button).off('click')
    $(button).click(function () {
      MatchTimer.showScreen('confirmdeletescreen')
    })

    // EMAIL MATCH

    button = $('.controls .email')

    $(button).removeClass('inactive')
    $(button).off('click')
    $(button).click(function () {
      MatchTimer.showScreen('emailscreen')
      $('.emailscreen .email').val('')
    })

    // DOWNLOAD MATCH

    button = $('.controls .download')

    $(button).removeClass('inactive')
    $(button).off('click')
    $(button).click(function () {
      var match = MatchTimer.data.match[MatchTimer.data.currentMatch]

      if (match.events.length > 0) {
        var html = getMatchHtml(match)
        download(html, match.date + ' ' + match.team1.name + ' vs ' + match.team2.name + '.html', 'text/html')
      }
    })
  } else {
    $(button).addClass('inactive')
    $(button).off('click')
    $(button).click(function () { return false })
  }
}

MatchTimer.setMatch = function (key) {
  this.data.currentMatch = key

  this.reset()

  $('#team1 div').text(this.data.match[key].team1.name)
  $('#team2 div').text(this.data.match[key].team2.name)
  $('#refereeName').text(this.data.match[key].refereeName)
  $('.gameplayscreen').removeClass('disabled')
  $('.matchlistscreen').addClass('disabled')

  MatchTimer.setDeleteButtonState()

  $('.matchnotes').val(this.data.match[key].notes)

  $('.goalscreen select.goalteam').empty()
  $('.goalscreen select.goalteam').append('<option disabled selected></option>')
  $('.goalscreen select.goalteam').append('<option>' + this.data.match[key].team1.name + '</option>')
  $('.goalscreen select.goalteam').append('<option>' + this.data.match[key].team2.name + '</option>')
  $('.goalscreen select.goalteam').change(function () {
    var team = $(this).val()

    if (typeof (MatchTimer.database.teams[team]) !== 'undefined') {
      $('.goalscreen select.goalplayer').empty()
      $('.goalscreen select.goalplayer').append('<option disabled selected></option>')

      for (var key in MatchTimer.database.teams[team]) {
        $('.goalscreen select.goalplayer').append('<option>' + MatchTimer.database.teams[team][key] + '</option>')
      }
    }
  })

  $('.goalscreen select.goalplayer').change(function () {
    var player = $('.goalscreen select.goalplayer').val()

    if (player === 'SAMOBÓJ') {
      var team = $('.goalscreen select.goalteam').val()
      var match = MatchTimer.data.match[MatchTimer.data.currentMatch]
      var opponentTeam = null

      if (team === match.team1.name) {
        opponentTeam = match.team2.name
      } else if (team === match.team2.name) {
        opponentTeam = match.team1.name
      }

      if (typeof (MatchTimer.database.teams[opponentTeam]) !== 'undefined') {
        $('.goalscreen select.opponentPlayer').empty()
        $('.goalscreen select.opponentPlayer').append('<option disabled selected></option>')

        for (var key in MatchTimer.database.teams[opponentTeam]) {
          $('.goalscreen select.opponentPlayer').append('<option>' + MatchTimer.database.teams[opponentTeam][key] + '</option>')
        }
      }

      $('.goalscreen div.opponentPlayer').removeClass('disabled')
    } else {
      $('.goalscreen div.opponentPlayer').not('disabled').addClass('disabled')
    }
  })

  $('.goalscreen button.addgoal').click(function () {
    MatchTimer.addGoal()
  })

  // card selects

  $('.cardscreen select.cardteam').empty()
  $('.cardscreen select.cardteam').append('<option disabled selected></option>')
  $('.cardscreen select.cardteam').append('<option>' + this.data.match[key].team1.name + '</option>')
  $('.cardscreen select.cardteam').append('<option>' + this.data.match[key].team2.name + '</option>')
  $('.cardscreen select.cardteam').change(function () {
    var team = $(this).val()

    if (typeof (MatchTimer.database.teams[team]) !== 'undefined') {
      $('.cardscreen select.cardplayer').empty()
      $('.cardscreen select.cardplayer').append('<option disabled selected></option>')

      for (var key in MatchTimer.database.teams[team]) {
        $('.cardscreen select.cardplayer').append('<option>' + MatchTimer.database.teams[team][key] + '</option>')
      }
    }
  })

  $('.cardscreen button.addcard').click(function () {
    MatchTimer.addCard()
  })

  $('.emailscreen button.sendemail').click(function () {
    MatchTimer.sendEmail()
  })

  MatchTimer.refreshEventsList()
  MatchTimer.refreshPointsView()
}

MatchTimer.addGoal = function () {
  var team = $('.goalscreen select.goalteam').val()
  var player = $('.goalscreen select.goalplayer').val()
  var match = MatchTimer.data.match[MatchTimer.data.currentMatch]

  if (team !== match.team1.name && team !== match.team2.name) {
    return false
  }

  if (MatchTimer.database.teams[team].indexOf(player) === -1) {
    return false
  }

  // Edytuj
  var addEvent = false

  if (MatchTimer.editEvent === true) {
    if (player === 'SAMOBÓJ') {
      var opponentPlayer = $('.goalscreen select.opponentPlayer').val()

      if (opponentPlayer !== null) {
        MatchTimer.addEvent('goal', 'Gol ' + team + ' (' + player + ' ' + opponentPlayer + ')', team, player)

        addEvent = true
      }
    } else {
      MatchTimer.addEvent('goal', 'Gol ' + team + ' (' + player + ')', team, player)

      addEvent = true
    }

    MatchTimer.refreshPointsView()
    MatchTimer.showScreen('gameplayscreen')

    $('.goalscreen .goalteam option:selected').removeAttr('selected')
    $('.goalscreen .goalplayer option:selected').removeAttr('selected')
    $('.goalscreen .opponentPlayer option:selected').removeAttr('selected')
    $('.goalscreen .goalteam option:disabled').prop('selected', true)
    $('.goalscreen .goalplayer option:disabled').prop('selected', true)
    $('.goalscreen .opponentPlayer option:disabled').prop('selected', true)
    $('.goalscreen div.opponentPlayer').addClass('disabled')
  } else { // Dodaj
    addEvent = false

    if (player === 'SAMOBÓJ') {
      opponentPlayer = $('.goalscreen select.opponentPlayer').val()

      if (opponentPlayer !== null) {
        MatchTimer.addEvent('goal', 'Gol ' + team + ' (' + player + ' ' + opponentPlayer + ')', team, player)

        addEvent = true
      }
    } else {
      MatchTimer.addEvent('goal', 'Gol ' + team + ' (' + player + ')', team, player)

      addEvent = true
    }

    if (addEvent) {
      MatchTimer.refreshPointsView()
      MatchTimer.showScreen('gameplayscreen')

      $('.goalscreen .goalteam option:selected').removeAttr('selected')
      $('.goalscreen .goalplayer option:selected').removeAttr('selected')
      $('.goalscreen .opponentPlayer option:selected').removeAttr('selected')
      $('.goalscreen .goalteam option:disabled').prop('selected', true)
      $('.goalscreen .goalplayer option:disabled').prop('selected', true)
      $('.goalscreen .opponentPlayer option:disabled').prop('selected', true)
      $('.goalscreen div.opponentPlayer').addClass('disabled')
    }
  }
}

MatchTimer.addCard = function () {
  var type = $('.cardscreen select.cardtype').val()
  var team = $('.cardscreen select.cardteam').val()
  var player = $('.cardscreen select.cardplayer').val()
  var match = MatchTimer.data.match[MatchTimer.data.currentMatch]

  if (typeof (type) === 'undefined' || type == null) {
    return false
  }

  if (team !== match.team1.name && team !== match.team2.name) {
    return false
  }

  if (MatchTimer.database.teams[team].indexOf(player) === -1) {
    return false
  }

  if (MatchTimer.editEvent === true) {
    // Edytuj

    MatchTimer.addEvent('card', type + ' ' + player + ' (' + team + ')', type, team, player)
    MatchTimer.showScreen('gameplayscreen')

    $('.cardscreen .cardtype option:selected').removeAttr('selected')
    $('.cardscreen .cardteam option:selected').removeAttr('selected')
    $('.cardscreen .cardplayer option:selected').removeAttr('selected')
    $('.cardscreen .cardtype option:disabled').prop('selected', true)
    $('.cardscreen .cardteam option:disabled').prop('selected', true)
    $('.cardscreen .cardplayer option:disabled').prop('selected', true)
  } else {
    // Dodaj

    MatchTimer.addEvent('card', type + ' ' + player + ' (' + team + ')', type, team, player)
    MatchTimer.showScreen('gameplayscreen')

    $('.cardscreen .cardtype option:selected').removeAttr('selected')
    $('.cardscreen .cardteam option:selected').removeAttr('selected')
    $('.cardscreen .cardplayer option:selected').removeAttr('selected')
    $('.cardscreen .cardtype option:disabled').prop('selected', true)
    $('.cardscreen .cardteam option:disabled').prop('selected', true)
    $('.cardscreen .cardplayer option:disabled').prop('selected', true)
  }
}

MatchTimer.returnToMatchSelect = function () {
  $('.matchlistscreen').removeClass('disabled')
  $('.gameplayscreen').addClass('disabled')
}

MatchTimer.deleteData = function () {
  var match = MatchTimer.data.currentMatch

  if (MatchTimer.data.match[match].events.length === 0) {
    delete MatchTimer.data.match[match]

    MatchTimer.refreshMatchList()
    MatchTimer.showScreen('matchlistscreen')
    MatchTimer.storeData()
  } else {
    MatchTimer.data.match[match].lastTime = null
    MatchTimer.data.match[match].timerTime = null
    MatchTimer.data.match[match].renderedTime = null
    MatchTimer.data.match[match].isRunning = false
    MatchTimer.data.match[match].events = []
    MatchTimer.data.match[match].team1.points = 0
    MatchTimer.data.match[match].team2.points = 0

    MatchTimer.setRenderedTime()
    MatchTimer.refreshTimerView()
    MatchTimer.refreshPointsView()
    MatchTimer.refreshEventsList()
    MatchTimer.showScreen('gameplayscreen')
  }
}

MatchTimer.reset = function () {
  var match = this.data.currentMatch

  this.setRenderedTime()
  this.refreshTimerView()
  this.initEventsList()

  // init

  if (this.data.match[match].isRunning) {
    this.setStateRunning()
  } else {
    this.setStatePaused()
  }

  $('.start').off('click')

  $('.start').click(function () {
    if (MatchTimer.isRunningAnyMatch()) {
      return false
    }

    MatchTimer.addEvent('normal', 'Start')
    MatchTimer.setStateRunning()
    MatchTimer.setDeleteButtonState()
  })

  $('.stop').off('click')

  $('.stop').click(function () {
    MatchTimer.addEvent('normal', 'Stop')
    MatchTimer.setStatePaused()
    MatchTimer.setDeleteButtonState()
  })

  $('.goal').off('click')

  $('.goal').click(function () {
    if (MatchTimer.data.match[MatchTimer.data.currentMatch].isRunning) {
      $('.goalscreen .deletegoal').not('.disabled').addClass('disabled')

      MatchTimer.showScreen('goalscreen')
    }
  })

  $('.card').off('click')

  $('.card').click(function () {
    if (MatchTimer.data.match[MatchTimer.data.currentMatch].isRunning) {
      $('.cardscreen .deletecard').not('.disabled').addClass('disabled')

      MatchTimer.showScreen('cardscreen')
    }
  })

  $('.email').off('click')

  $('.email').click(function () {
    if (MatchTimer.data.match[MatchTimer.data.currentMatch].isRunning) {
      MatchTimer.showScreen('emailscreen')
    }
  })
}

MatchTimer.initData = function () {
  var data = localStorage.getItem('matchtimer')

  if (data != null) {
    this.data = JSON.parse(data)
  }
}

MatchTimer.storeData = function () {
  localStorage.setItem('matchtimer', JSON.stringify(this.data))
}

MatchTimer.setRenderedTime = function () {
  var match = this.data.currentMatch

  const numOfMinutes = Math.floor(this.data.match[match].timerTime / 60)
  const numOfSeconds = this.data.match[match].timerTime % 60
  var minutes = numOfMinutes >= 10 ? numOfMinutes : '0' + numOfMinutes
  var seconds = numOfSeconds >= 10 ? numOfSeconds : '0' + numOfSeconds

  this.data.match[match].renderedTime = minutes + ':' + seconds
}

MatchTimer.initTimer = function () {

}

MatchTimer.setStateRunning = function () {
  var match = this.data.currentMatch
  this.data.match[match].isRunning = true
  clearInterval(this.data.match[match].interval)

  var d = new Date()
  this.data.match[match].lastTime = d.getTime()
  this.data.match[match].interval = setInterval(MatchTimer.incrementTimer, 1000)

  $('.stop').removeClass('disabled')
  $('.start').addClass('disabled')
  $('.goal').removeClass('inactive')
  $('.card').removeClass('inactive')

  this.storeData()
}

MatchTimer.setStatePaused = function () {
  var match = this.data.currentMatch

  this.data.match[match].isRunning = false

  clearInterval(this.data.match[match].interval)

  $('.start').removeClass('disabled')
  $('.stop').addClass('disabled')
  $('.goal').addClass('inactive')
  $('.card').addClass('inactive')

  this.storeData()
}

MatchTimer.incrementTimer = function () {
  var match = MatchTimer.data.currentMatch

  if (MatchTimer.data.match[match].isRunning === false) {
    return false
  }

  var d = new Date()
  var t = d.getTime()

  MatchTimer.data.match[match].timerTime += Math.round((t - MatchTimer.data.match[match].lastTime) / 1000)
  MatchTimer.data.match[match].lastTime = t
  MatchTimer.setRenderedTime()
  MatchTimer.refreshTimerView()
  MatchTimer.storeData()
}

MatchTimer.refreshTimerView = function () {
  var match = this.data.currentMatch

  $('.timer').text(MatchTimer.data.match[match].renderedTime)
}

MatchTimer.refreshPointsView = function () {
  var match = MatchTimer.data.match[MatchTimer.data.currentMatch]

  match.team1.points = 0
  match.team2.points = 0

  for (var i in match.events) {
    if (match.events[i].type === 'goal' && match.events[i].val1 === match.team1.name) {
      match.team1.points += 1
    } else if (match.events[i].type === 'goal' && match.events[i].val1 === match.team2.name) {
      match.team2.points += 1
    }
  }

  var result = match.team1.points + ':' + match.team2.points

  $('.gameplayscreen .result.field div').text(result)
}

MatchTimer.getActualDate = function () {
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  return yyyy + '-' + mm + '-' + dd
}

MatchTimer.getActualTime = function () {
  var d = new Date()
  var hours = d.getHours()
  var minutes = d.getMinutes()

  minutes = minutes >= 10 ? minutes : '0' + minutes

  return hours + ':' + minutes
}

MatchTimer.addEvent = function (type, description, val1, val2, val3, val4) {
  var match = this.data.currentMatch

  var event = {
    type: type,
    description: description,
    timerTime: this.data.match[match].renderedTime,
    actualTime: this.getActualTime(),
    val1: val1,
    val2: val2,
    val3: val3,
    val4: val4
  }

  if (MatchTimer.eventId > 0) {
    event.timerTime = this.data.match[match].events[MatchTimer.eventId].timerTime
    event.actualTime = this.data.match[match].events[MatchTimer.eventId].actualTime

    this.data.match[match].events[MatchTimer.eventId] = event
  } else {
    this.data.match[match].events[this.data.match[match].events.length] = event
  }

  MatchTimer.eventId = null
  MatchTimer.editEvent = false
  MatchTimer.refreshEventsList()

  this.storeData()

  MatchTimer.setDeleteButtonState()
}

MatchTimer.refreshEventsList = function () {
  var events = MatchTimer.data.match[MatchTimer.data.currentMatch].events

  $('.gameplayscreen .events').empty()

  for (var key in events) {
    var event = events[key]

    $('.gameplayscreen .events').prepend('<div id="event_' + key + '" class="event"><div class="e_field_timer">' + event.timerTime + '</div><div class="e_field_description">' + event.description + ' (' + event.actualTime + ')</div></div>')

    $('#event_' + key).click(function () {
      var id = this.id.replace('event_', '')

      var event = MatchTimer.data.match[MatchTimer.data.currentMatch].events[id]

      if (event.type === 'goal') {
        $('.goalscreen select.goalteam').val(event.val1).change()
        $('.goalscreen select.goalplayer').val(event.val2).change()

        MatchTimer.editEvent = true
        MatchTimer.eventId = id
        MatchTimer.prevVal1 = event.val1
        MatchTimer.prevVal2 = event.val2

        $('.goalscreen .deletegoal').removeClass('disabled')

        MatchTimer.showScreen('goalscreen')
      }

      if (event.type === 'card') {
        $('.cardscreen select.cardtype').val(event.val1).change()
        $('.cardscreen select.cardteam').val(event.val2).change()
        $('.cardscreen select.cardplayer').val(event.val3).change()

        MatchTimer.editEvent = true
        MatchTimer.eventId = id
        MatchTimer.prevVal1 = event.val1
        MatchTimer.prevVal2 = event.val2
        MatchTimer.prevVal3 = event.val3

        $('.cardscreen .deletecard').removeClass('disabled')

        MatchTimer.showScreen('cardscreen')
      }
    })
  }
}

MatchTimer.addEventToList = function (event) {
  $('.events').prepend('<div class="event"><div class="e_field_timer">' + event.timerTime + '</div><div class="e_field_description">' + event.description + ' (' + event.actualTime + ')</div></div>')
}

MatchTimer.initEventsList = function () {
  var match = this.data.currentMatch

  for (var i in this.data.events) {
    this.addEventToList(this.data.match[match].events[i])
  }
}

MatchTimer.deleteGoal = function () {
  if (MatchTimer.editEvent === true && this.data.match[this.data.currentMatch].events[MatchTimer.eventId].type === 'goal') {
    this.data.match[this.data.currentMatch].events.splice(MatchTimer.eventId, 1)

    MatchTimer.refreshEventsList()
    MatchTimer.refreshPointsView()
    MatchTimer.showScreen('gameplayscreen')

    $('.goalscreen select.goalteam').val('').change()
    $('.goalscreen select.goalplayer').val('').change()

    MatchTimer.editEvent = false
  }
}

MatchTimer.deleteCard = function () {
  if (MatchTimer.editEvent === true && this.data.match[this.data.currentMatch].events[MatchTimer.eventId].type === 'card') {
    this.data.match[this.data.currentMatch].events.splice(MatchTimer.eventId, 1)

    MatchTimer.refreshEventsList()
    MatchTimer.showScreen('gameplayscreen')

    $('.cardscreen select.cardtype').val('').change()
    $('.cardscreen select.cardteam').val('').change()
    $('.cardscreen select.cardplayer').val('').change()

    MatchTimer.editEvent = false
  }
}

MatchTimer.sendEmail = function () {
  var email = $('.emailscreen .email_default').val()
  var emailX = $('.emailscreen .email_x').val()
  var emailY = []

  $('.email_y:checked').each(function (i) {
    emailY[i] = $(this).val()
  })

  if (typeof (emailX) !== 'undefined' && emailX.length > 0) {
    emailY[emailY.length] = emailX
  }

  var senderEmail = MatchTimer.config.senderEmail
  var match = this.data.match[this.data.currentMatch]
  var subject = match.date + ': ' + match.team1.name + ' vs ' + match.team2.name
  var body = getMatchHtml(match)

  $('.emailprogressscreen .loader').removeClass('disabled')
  $('.emailprogressscreen .error').not('.disabled').addClass('disabled')

  Email.send({
    to: email,
    from: senderEmail,
    fromName: 'Karta sędziego',
    subject: subject,
    body: body
  })

  for (let i in emailY) {
    Email.send({
      to: emailY[i],
      from: senderEmail,
      fromName: 'Karta sędziego',
      subject: subject,
      body: body
    })
  }

  MatchTimer.showScreen('gameplayscreen')
}

/**
 * MATCH HTML FILE
 */
function getMatchHtml (match) {
  var html =
  `<html>
    <head>
      <meta charset="utf-8">
      <title>${match.date} : ${match.team1.name} vs ${match.team2.name}</title>
      <style type="text/css">
        html,
        body {
          font-family: Helvetica Neue, sans-serif;
        }

        .wrapper {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 600px;
        }

        @media screen and (max-width: 500px) {
          .wrapper {
            width: 100%;
            margin: 0;
          }
        }

        h1, h2, h3 {
          text-align: center;
        }

        table {
          border-collapse: collapse;
          margin-bottom: 16px;
          width: 100%
        }
        
        table, th, td {
          border: 1px solid black;
        }

        td {
          padding: 4px 8px;
        }
      </style>
    </head>
  <body>
  <div class="wrapper">
    <h1>
      <span class="team1">${match.team1.name}</span> 
      <span class="team1_points">${match.team1.points}</span>
      : 
      <span class="team2_points">${match.team2.points}</span> 
      <span class="team2">${match.team2.name}</span>
    </h1>
    <h2><span class="date">${match.date}</span></h2>
    <h3>Sędzia: <span class="referee">${match.refereeName}</span></h3>`

  if (typeof match.team1.players !== 'undefined' || typeof match.team2.players !== 'undefined') {
    var n = Math.max(match.team1.players.length, match.team2.players.length)

    if (n > 0) {
      html +=
      `<table class="players">
      <tr>
        <th colspan="2">Skład drużyn</th>
      </tr>
      <tr>
        <th>${match.team1.name}</th>
        <th>${match.team2.name}</th>
      </tr>`

      for (var nn = 0; nn < n; nn++) {
        var p1 = typeof match.team1.players[nn] !== 'undefined' ? match.team1.players[nn] : ''
        var p2 = typeof match.team2.players[nn] !== 'undefined' ? match.team2.players[nn] : ''
        html +=
        `<tr>
          <td class="team1 player">${p1}</td>
          <td class="team2 player">${p2}</td>
        </tr>`
      }

      html += `</table>`
    }
  }

  if (match.events.length > 0) {
    html += `<table class="events">
    <tr>
      <th colspan="3">Zdarzenia</th>
    </tr>`

    for (var key in match.events) {
      var event = match.events[key]
      html +=
      `<tr class="event">
        <td class="timerTime">${event.timerTime}</td>
        <td class="description">${event.description}</td>
        <td class="actualTime">${event.actualTime}</td>
      </tr>`
    }

    html += `</table>`
  }

  html += `<pre class="notes">${match.notes}</pre>`

  html +=
  `</div>
  </body>
  </html>`

  return html
}

MatchTimer.init()
