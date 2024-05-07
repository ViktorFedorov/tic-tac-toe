const App = {
  // All of our selected HTML elements
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newGameBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    modal: document.querySelector('.modal'),
    modalMessage: document.getElementById('message'),
    modalAgainBtn: document.querySelector('.modal-contents > button'),
    turn: document.querySelector('.turn')
    // playerIcon: document.querySelector('.turn i'),
    // whoIsUpText: document.querySelector('.turn p')
  },

  init() {
    App.registerEventListeners()
  },

  state: {
    moves: []
  },

  showModal(winner) {
    App.$.modal.classList.remove('hidden')
    App.$.modalMessage.textContent =
      winner === null ? 'The game is drawn' : `Player ${winner} wins!`
  },

  getGameStatus(moves) {
    const winPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9]
    ]

    const p1Moves = moves.filter((move) => move.player === 1)
    const p2Moves = moves.filter((move) => move.player === 2)

    const p1Score = p1Moves.map((item) => item.squareId).sort((a, b) => a - b)
    const p2Score = p2Moves.map((item) => item.squareId).sort((a, b) => a - b)

    // определение победителя
    let winner = null

    winPatterns.forEach((pattern) => {
      const p1wins = pattern.every((value) => p1Score.includes(value))
      const p2wins = pattern.every((value) => p2Score.includes(value))

      if (p1wins) winner = 1
      if (p2wins) winner = 2
    })

    return {
      status:
        App.state.moves.length === 9 || winner !== null
          ? 'complete'
          : 'progress',
      winner
    }
  },

  clearGameResults() {
    App.state.moves = []

    App.$.squares.forEach((square) => {
      square.replaceChildren()
    })

    App.$.turn.innerHTML = `
      <i class="fa-solid fa-x yellow"></i>
      <p class="yellow">Player 1, you're up!</p>
    `
  },

  registerEventListeners() {
    App.$.menu.addEventListener('click', (e) => {
      App.$.menuItems.classList.toggle('hidden')
    })

    // закрытие модалки
    App.$.modalAgainBtn.addEventListener('click', () => {
      App.clearGameResults()
      App.$.modal.classList.add('hidden')
    })

    //TODO
    App.$.squares.forEach((square) =>
      square.addEventListener('click', (e) => {
        // проверим был ли клик по квадрату - то есть ход
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find((move) => {
            return +move.squareId === +squareId
          })

          return existingMove !== undefined
        }

        // отменяем повторный клик по квадрату
        if (hasMove(square.id)) return

        const lastMove = App.state.moves.at(-1)
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1)

        const currentPlayer =
          App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.player)

        const nextPlayer = currentPlayer === 1 ? 2 : 1

        const squareIcon = document.createElement('i')
        const turnIcon = document.createElement('i')
        const turnLabel = document.createElement('p')

        turnLabel.textContent = `Player ${nextPlayer} you're up!`

        App.$.turn.replaceChildren(turnIcon, turnLabel)

        if (currentPlayer === 1) {
          squareIcon.classList.add('fa-solid', 'fa-x', 'yellow')

          turnIcon.classList.add('fa-solid', 'fa-o', 'turquoise')
          turnLabel.classList.add('turquoise')
        } else {
          squareIcon.classList.add('fa-solid', 'fa-o', 'turquoise')

          turnIcon.classList.add('fa-solid', 'fa-x', 'yellow')
          turnLabel.classList.add('yellow')
        }

        App.state.moves.push({
          squareId: +square.id,
          player: currentPlayer
        })

        e.target.replaceChildren(squareIcon)

        const gameStatus = App.getGameStatus(App.state.moves)

        if (gameStatus.status === 'complete') {
          App.showModal(gameStatus.winner)
        }
      })
    )

    App.$.resetBtn.addEventListener('click', (e) => console.log(e.target))
    App.$.newGameBtn.addEventListener('click', (e) => console.log(e.target))
  }
}

window.addEventListener('load', App.init)
