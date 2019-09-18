function min (a, b) {
  return a < b ? a : b
}

function resize () {
  const board = document.getElementsByClassName('content')[0].children[0]
  const width = board.clientWidth
  const height = board.clientHeight
  const margin = 16

  const table = document.getElementsByClassName('board')[0]
  const size = min(width, height) - (margin * 2)

  table.style.width = size + 'px'
  table.style.height = size + 'px'
}

document.body.onresize = resize
resize()

const score1 = document.getElementsByClassName('score1')[0]
console.log(score1)
score1.textContent = '12'
