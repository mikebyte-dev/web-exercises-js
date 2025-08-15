class ColorGenerator {
  /**
   * A generator of colors with many method to use in the DOM
   * @param {number} manyColors  How many color will be init in the app
   */
  constructor(manyColors) {
    this.colors = this.createColorList(manyColors)
  }

  /**
   * Create a list of objects colors with and id and the hexadecimal color
   * @param {number} numberOfColors
   * @returns {[]} list of colors
   */
  createColorList(numberOfColors) {
    const listOfColors = []

    for (let i = 0; i < numberOfColors; i++) {
      const color = {
        id: i,
        color: this.generateColorHex()
      }

      listOfColors.push(color)
    }

    return listOfColors
  }

  /**
   * Re-generate all the colors of the list of colors
   */
  updateColorList() {
    this.colors.forEach(e => {
      e.color = this.generateColorHex()
    })
  }


  /**
  * Return a random hexadecimal color string
  * @returns {string}
  */
  generateColorHex() {
    const hexColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
    let colorHex = ['#']

    for (let i = 6; i > 0; i--) {
      let number = Math.floor(Math.random() * hexColors.length)
      colorHex.push(hexColors[number].toString())
    }

    return colorHex.join('')
  }

  /**
  * Render <div></div> elements inside the given element with the colors in the instance
  * @param {HTMLElement} main
  */
  render(main) {
    main.innerHTML = ''
    this.colors.forEach(e => {
      main.innerHTML += `<div class='colors' style="background-color:${e.color};">${e.color}</div>`
    })
  }
}
// get my main element where the color will be rendered in different divs
const main = document.getElementById("main")
const btnRender = document.getElementById("re-render")
// Instance of the app
const app = new ColorGenerator(5)
// Render the div where the colors will be rendered
app.render(main)

btnRender.addEventListener('click', () => {
  app.updateColorList()
  app.render(main)
})

window.addEventListener("keydown", e => {
  if (e.key === " ") {
    app.updateColorList()
    app.render(main)
  }
})
