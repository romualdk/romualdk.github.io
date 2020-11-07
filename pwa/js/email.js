/* global $ */

var Email = {
  url: 'email.php'
}

Email.send = function (data) {
  $.post(this.url, data).done(function (r) {
    console.log(r)
  })
}
