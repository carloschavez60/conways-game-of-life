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

// event listeners

document.querySelector('button').addEventListener('click', setInitialGameState)

// set initial state

function setInitialGameState() {
  for (row = 0; row < GAME_SPACE_PIXEL_WIDTH; row++) {
    cells[row] = []
    for (col = 0; col < GAME_SPACE_PIXEL_WIDTH; col++) {
      cells[row][col] = {
        isAlive: false,
        hasToBeAlive: false,
        hasToBeDead: false,
      }
    }
  }
  game.generation = 0

  populate()

  // draw world
  drawGame()

  // call first main loop
  if (!game.mainLoopIsRunning) {
    setTimeout(mainLoop, GAME_FRAME_DURATION)
    game.mainLoopIsRunning = true
  }
}

// main loop

function mainLoop() {
  // check world
  checkGeneration()

  // change world
  changeGeneration()
  game.generation++

  // draw world
  drawGame()

  setTimeout(mainLoop, GAME_FRAME_DURATION)
}

// entities

let cells = []
for (row = 0; row < GAME_SPACE_PIXEL_WIDTH; row++) {
  cells[row] = []
  for (col = 0; col < GAME_SPACE_PIXEL_WIDTH; col++) {
    cells[row][col] = {
      isAlive: false,
      hasToBeAlive: false,
      hasToBeDead: false,
    }
  }
}

// systems

// physics system

function checkGeneration() {
  for (row = 0; row < GAME_SPACE_PIXEL_WIDTH; row++) {
    for (col = 0; col < GAME_SPACE_PIXEL_WIDTH; col++) {
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

      // Conway's Game Rules
      if (neighbors < 2 || neighbors > 3) {
        cells[row][col].hasToBeDead = true
      } else if (neighbors === 3) {
        cells[row][col].hasToBeAlive = true
      }
    }
  }
}

function changeGeneration() {
  for (row = 0; row < GAME_SPACE_PIXEL_WIDTH; row++) {
    for (col = 0; col < GAME_SPACE_PIXEL_WIDTH; col++) {
      if (cells[row][col].hasToBeAlive) {
        cells[row][col].isAlive = true
      } else if (cells[row][col].hasToBeDead) {
        cells[row][col].isAlive = false
      }

      // reset centinels
      cells[row][col].hasToBeAlive = false
      cells[row][col].hasToBeDead = false
    }
  }
}

// draw system

function drawGame() {
  drawCells()
  drawGeneration()
}

function drawCells() {
  ctx.clearRect(0, 0, GAME_SPACE_WIDTH, GAME_SPACE_WIDTH)

  ctx.fillStyle = 'white'
  for (row = 0; row < GAME_SPACE_PIXEL_WIDTH; row++) {
    for (col = 0; col < GAME_SPACE_PIXEL_WIDTH; col++) {
      if (cells[row][col].isAlive) {
        ctx.fillRect(col * GAME_PIXEL_WIDTH, row * GAME_PIXEL_WIDTH, GAME_PIXEL_WIDTH, GAME_PIXEL_WIDTH)
      }
    }
  }
}

function drawGeneration() {
  ctx.fillStyle = 'white'
  ctx.font = '20px Arial'
  ctx.fillText(`Generation: ${game.generation}`, 3, GAME_SPACE_WIDTH - 5)
}

// populate world

function makeCellsAlive(...cellsCoords) {
  for (let cellCoords of cellsCoords) {
    cells[cellCoords[1]][cellCoords[0]].isAlive = true
  }
}

function populate() {
  // block
  makeCellsAlive(
    [4, 8],
    [5, 8],
    [4, 9],
    [5, 9],
  )

  // blinker
  makeCellsAlive(
    [3, 3],
    [4, 3],
    [5, 3],
  )

  // toad
  makeCellsAlive(
    [20, 3],
    [18, 4],
    [21, 4],
    [18, 5],
    [21, 5],
    [19, 6],
  )

  // ship
  makeCellsAlive(
    [14, 15],
    [15, 15],
    [14, 16],
    [16, 16],
    [15, 17],
    [16, 17],
  )

  // glider
  makeCellsAlive(
    [9, 25],
    [7, 26],
    [9, 26],
    [8, 27],
    [9, 27],
  )

  // Gosper glider gun
  makeCellsAlive(
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
    [6, 40],
    [7, 40],
    [8, 40],
    [12, 40],
    [13, 40],
    [14, 40],
    [4, 41],
    [9, 41],
    [11, 41],
    [16, 41],
    [4, 42],
    [9, 42],
    [11, 42],
    [16, 42],
    [4, 43],
    [9, 43],
    [11, 43],
    [16, 43],
    [6, 45],
    [7, 45],
    [8, 45],
    [12, 45],
    [13, 45],
    [14, 45],
  )
}
