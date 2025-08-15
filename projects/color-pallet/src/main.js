// get my main element where the color will be render in different divs
const main = document.getElementById('main')

const generator = new ColorGenerator()

// how many color will be rendered in the main of the page
let numberOfColors = 3

// Render the div where the colors will be rendered
for (let i = 0; i <= numberOfColors; i++) {
  main.innerHTML += `
  <div class="colors" style="background-color:${generator.generateColorHex()}">${i} color</div>
  `
}

class ColorGenerator {
  constructor() {
    this.colors = []
    this.hexColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  }

  generateColorHex() {
    let colorHex

    for (let i = 6; i > 0; i--) {

      colorHex += this.hexColors[Math.round(Math.random() * 16)]
    }
  }
}