// game constants and variables

const GAME_SPACE_WIDTH = 800
const GAME_PIXEL_WIDTH = 10 // must be a value that can divide GAME_SPACE_WIDTH

const GAME_SPACE_PIXEL_WIDTH = GAME_SPACE_WIDTH/GAME_PIXEL_WIDTH

const GAME_FRAME_DURATION = 150 // in ms

let game = {
  mainLoopIsRunning: false,
  generation: 0,
}

// draw system tools

const canvas = document.querySelector('canvas')
canvas.width = GAME_SPACE_WIDTH
canvas.height = GAME_SPACE_WIDTH

const ctx = canvas.getContext('2d')
ctx.fillStyle = 'white'
ctx.font = '20px Arial'

// event listeners

document.querySelector('button').addEventListener('click', setInitialGameState)

// set initial state

function setInitialGameState() {

  // entities

  let cells = []
  for (let row = 0; row < GAME_SPACE_PIXEL_WIDTH; row++) {
    cells[row] = []
    for (let col = 0; col < GAME_SPACE_PIXEL_WIDTH; col++) {
      cells[row][col] = {
        isAlive: false,
        hasToChange: false,
      }
    }
  }

  game.generation = 0

  populate(cells)

  // draw world
  drawGame(cells)

  // call first main loop
  if (!game.mainLoopIsRunning) {
    setTimeout(() => mainLoop(cells), GAME_FRAME_DURATION)
    game.mainLoopIsRunning = true
  }
}

// main loop

function mainLoop(cells) {
  // check world
  checkGeneration(cells)

  // change world
  changeGeneration(cells)
  game.generation++

  // draw world
  drawGame(cells)

  setTimeout(() => mainLoop(cells), GAME_FRAME_DURATION)
}

// systems

// check program state

function checkGeneration(cells) {
  for (let row = 0; row < GAME_SPACE_PIXEL_WIDTH; row++) {
    for (let col = 0; col < GAME_SPACE_PIXEL_WIDTH; col++) {
      neighbors = 0
      // kill edge cells
      if (row-1>0 && row+1<GAME_SPACE_PIXEL_WIDTH && col-1>0 && col+1<GAME_SPACE_PIXEL_WIDTH) {
        if (cells[row-1][col-1].isAlive) {
          neighbors++
        }
        if (cells[row-1][col].isAlive) {
          neighbors++
        }
        if (cells[row-1][col+1].isAlive) {
          neighbors++
        }
        if (cells[row][col-1].isAlive) {
          neighbors++
        }
        if (cells[row][col+1].isAlive) {
          neighbors++
        }
        if (cells[row+1][col-1].isAlive) {
          neighbors++
        }
        if (cells[row+1][col].isAlive) {
          neighbors++
        }
        if (cells[row+1][col+1].isAlive) {
          neighbors++
        }
      }
      let cell = cells[row][col]

      // Conway's Game Rules
      if ((cell.isAlive && (neighbors < 2 || neighbors > 3)) || (!cell.isAlive && neighbors === 3)) {
        cell.hasToChange = true
      }
    }
  }
}

// change program state

function changeGeneration(cells) {
  for (let row = 0; row < GAME_SPACE_PIXEL_WIDTH; row++) {
    for (let col = 0; col < GAME_SPACE_PIXEL_WIDTH; col++) {
      let cell = cells[row][col]

      if (cell.hasToChange) {
        cell.isAlive = !cell.isAlive
      }

      // reset centinel
      cell.hasToChange = false
    }
  }
}

// drawing system

function drawGame(cells) {
  drawCells(cells)
  drawGenerationText()
}

function drawCells(cells) {
  for (let row = 0; row < GAME_SPACE_PIXEL_WIDTH; row++) {
    for (let col = 0; col < GAME_SPACE_PIXEL_WIDTH; col++) {
      if (cells[row][col].isAlive) {
        ctx.fillRect(col * GAME_PIXEL_WIDTH, row * GAME_PIXEL_WIDTH, GAME_PIXEL_WIDTH, GAME_PIXEL_WIDTH)
      } else {
        ctx.clearRect(col * GAME_PIXEL_WIDTH, row * GAME_PIXEL_WIDTH, GAME_SPACE_WIDTH, GAME_SPACE_WIDTH)
      }
    }
  }
}

function drawGenerationText() {
  ctx.fillText(`Generation: ${game.generation}`, 3, GAME_SPACE_WIDTH - 5)
}

// populate world

function makeCellsAlive(cells, ...cellsCoords) {
  for (let cellCoords of cellsCoords) {
    cells[cellCoords[1]][cellCoords[0]].isAlive = true
  }
}

function populate(cells) {
  // block
  makeCellsAlive(
    cells,
    [4, 8],
    [5, 8],
    [4, 9],
    [5, 9],
  )

  // blinker
  makeCellsAlive(
    cells,
    [3, 3],
    [4, 3],
    [5, 3],
  )

  // toad
  makeCellsAlive(
    cells,
    [20, 3],
    [18, 4],
    [21, 4],
    [18, 5],
    [21, 5],
    [19, 6],
  )

  // ship
  makeCellsAlive(
    cells,
    [14, 15],
    [15, 15],
    [14, 16],
    [16, 16],
    [15, 17],
    [16, 17],
  )

  // glider
  makeCellsAlive(
    cells,
    [9, 25],
    [7, 26],
    [9, 26],
    [8, 27],
    [9, 27],
  )

  // Gosper glider gun
  makeCellsAlive(
    cells,
    [42, 20],
    [43, 20],
    [44, 21],
    [31, 22],
    [32, 22],
    [45, 22],
    [54, 22],
    [55, 22],
    [31, 23],
    [32, 23],
    [37, 23],
    [45, 23],
    [54, 23],
    [55, 23],
    [20, 24],
    [21, 24],
    [28, 24],
    [29, 24],
    [35, 24],
    [36, 24],
    [45, 24],
    [20, 25],
    [21, 25],
    [27, 25],
    [28, 25],
    [29, 25],
    [35, 25],
    [38, 25],
    [39, 25],
    [44, 25],
    [28, 26],
    [29, 26],
    [36, 26],
    [37, 26],
    [38, 26],
    [39, 26],
    [40, 26],
    [42, 26],
    [43, 26],
    [31, 27],
    [32, 27],
    [37, 27],
    [31, 28],
    [32, 28],
  )

  // Gosper glider gun ship
  makeCellsAlive(
    cells,
    [30, 10],
    [31, 10],
    [30, 11],
    [31, 11],
    [41, 8],
    [42, 8],
    [41, 9],
    [42, 9],
    [38, 10],
    [39, 10],
    [37, 11],
    [38, 11],
    [39, 11],
    [38, 12],
    [39, 12],
    [41, 13],
    [42, 13],
    [41, 14],
    [42, 14],
  )

  // It's only half a beacon.
  makeCellsAlive(
    cells,
    [6, 60],
    [7, 60],
    [8, 60],
    [12, 60],
    [13, 60],
    [14, 60],
    [4, 61],
    [9, 61],
    [11, 61],
    [16, 61],
    [4, 62],
    [9, 62],
    [11, 62],
    [16, 62],
    [4, 63],
    [9, 63],
    [11, 63],
    [16, 63],
    [6, 65],
    [7, 65],
    [8, 65],
    [12, 65],
    [13, 65],
    [14, 65],
  )
}
