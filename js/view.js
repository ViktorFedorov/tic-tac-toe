class View {
  $ = {}

  constructor() {
    this.$.menu = document.querySelector('[data-id="menu"]')
    this.$.menuBtn = document.querySelector('[data-id="menu-btn"]')
    this.$.menuItems = document.querySelector('[data-id="menu-items"]')
    this.$.resetBtn = document.querySelector('[data-id="reset-btn"]')
    this.$.newGameBtn = document.querySelector('[data-id="new-round-btn"]')
    this.$.squares = document.querySelectorAll('[data-id="square"]')
    this.$.modal = document.querySelector('.modal')
    this.$.modalMessage = document.getElementById('message')
    this.$.modalAgainBtn = document.querySelector('.modal-contents > button')
    this.$.turn = document.querySelector('.turn')

    this.$.menuBtn.addEventListener('click', () => {
      this.toggleMenu()
    })
  }

  // Listeners
  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener('click', handler)
  }

  bindNewRoundEvent(handler) {
    this.$.newGameBtn.addEventListener('click', handler)
  }

  bindPlayerMoveEvent(handler) {
    this.$.squares.forEach((square) =>
      square.addEventListener('click', handler)
    )
  }

  // DOM changers
  toggleMenu() {
    this.$.menuItems.classList.toggle('hidden')
    this.$.menuBtn.classList.toggle('border')

    // смена иконки открытия меню
    const icon = this.$.menuBtn.querySelector('i')
    icon.classList.toggle('fa-chevron-down')
    icon.classList.toggle('fa-chevron-up')
  }
}

export default View
