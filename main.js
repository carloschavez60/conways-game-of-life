// game constants and variables

const GAME_SPACE_WIDTH = 800
const GAME_PIXEL_WIDTH = 10 // must be a value that can divide GAME_SPACE_WIDTH
const GAME_SPACE_PIXEL_WIDTH = GAME_SPACE_WIDTH/GAME_PIXEL_WIDTH

const GAME_FRAME_DURATION = 150 // in ms

const game = {
  mainLoopIsRunning: false,
  generation: 0,
}

// entities

const cells = []
for (x = 0; x < GAME_SPACE_PIXEL_WIDTH; x++) {
  cells[x] = []
  for (y = 0; y < GAME_SPACE_PIXEL_WIDTH; y++) {
    cells[x][y] = {
      isAlive: false,
      hasToBeAlive: false,
      hasToBeDead: false,
    }
  }
}

// systems

// physics

function checkGeneration() {
  for (x = 0; x < GAME_SPACE_PIXEL_WIDTH; x++) {
    for (y = 0; y < GAME_SPACE_PIXEL_WIDTH; y++) {
      neighbors = 0
      // kill edge cells
      if (x-1>0 && x+1<GAME_SPACE_PIXEL_WIDTH && y-1>0 && y+1<GAME_SPACE_PIXEL_WIDTH) {
        if (cells[x-1][y-1].isAlive) {
          neighbors++
        }
        if (cells[x][y-1].isAlive) {
          neighbors++
        }
        if (cells[x+1][y-1].isAlive) {
          neighbors++
        }
        if (cells[x-1][y].isAlive) {
          neighbors++
        }
        if (cells[x+1][y].isAlive) {
          neighbors++
        }
        if (cells[x-1][y+1].isAlive) {
          neighbors++
        }
        if (cells[x][y+1].isAlive) {
          neighbors++
        }
        if (cells[x+1][y+1].isAlive) {
          neighbors++
        }
      }

      // Conway's Game Rules
      if (neighbors < 2 || neighbors > 3) {
        cells[x][y].hasToBeDead = true
      } else if (neighbors === 3) {
        cells[x][y].hasToBeAlive = true
      }
    }
  }
}

function changeGeneration() {
  for (x = 0; x < GAME_SPACE_PIXEL_WIDTH; x++) {
    for (y = 0; y < GAME_SPACE_PIXEL_WIDTH; y++) {
      if (cells[x][y].hasToBeAlive) {
        cells[x][y].isAlive = true
      } else if (cells[x][y].hasToBeDead) {
        cells[x][y].isAlive = false
      }

      // reset centinels
      cells[x][y].hasToBeAlive = false
      cells[x][y].hasToBeDead = false
    }
  }
}

// draw system

const canvas = document.querySelector('canvas')
canvas.width = GAME_SPACE_WIDTH
canvas.height = GAME_SPACE_WIDTH

const ctx = canvas.getContext('2d')

function drawGame() {
  drawCells()
  drawGeneration()
}

function drawCells() {
  ctx.clearRect(0, 0, GAME_SPACE_WIDTH, GAME_SPACE_WIDTH)

  ctx.fillStyle = 'white'
  for (y = 0; y < GAME_SPACE_PIXEL_WIDTH; y++) {
    for (x = 0; x < GAME_SPACE_PIXEL_WIDTH; x++) {
      if (cells[x][y].isAlive) {
        ctx.fillRect(x * GAME_PIXEL_WIDTH, y * GAME_PIXEL_WIDTH, GAME_PIXEL_WIDTH, GAME_PIXEL_WIDTH)
      }
    }
  }
}

function drawGeneration() {
  ctx.fillStyle = 'white'
  ctx.font = '20px Arial'
  ctx.fillText(`Generation: ${game.generation}`, 3, GAME_SPACE_WIDTH - 5)
}

// set initial state

function setInitialGameState() {
  for (x = 0; x < GAME_SPACE_PIXEL_WIDTH; x++) {
    cells[x] = []
    for (y = 0; y < GAME_SPACE_PIXEL_WIDTH; y++) {
      cells[x][y] = {
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

// event listeners

document.querySelector('button').addEventListener('click', setInitialGameState)

// populate world

function makeCellsAlive(...cellsCoords) {
  for (const cellCoords of cellsCoords) {
    cells[cellCoords[0]][cellCoords[1]].isAlive = true
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

  // Wtf. I just discovered it.
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
