// Get element off the DOM
// Take the container of the project links to render the projects cards
const sectionProjects = document.getElementById("section-projects");
// Take a paragraph to show information about the projects
const infoP = document.getElementById("info-paragraph");

window.addEventListener("load", () => {
  // TODO: change  the tag to the html and put here onle the change of class to hide or show the action
  // sectionProjects.innerHTML =

  console.log("loading ...");
});

/**
 * @typedef {object} Project
 * @property {string} id - Un identificador único para el proyecto.
 * @property {string} name - El nombre del proyecto.
 * @property {string} directory - La ruta relativa al directorio del proyecto.
 * @property {string} description - Una breve descripción del proyecto.
 * @property {string} img - La ruta a una imagen de miniatura.
 */

/**
 * Render inside of sectionProjects the cards elements every project
 * @param {Project[]} projects
 * @param {HTMLElement} container
 */
function renderProjects(projects, container) {
  // Check if the projects array is empty
  if (!projects || projects.length === 0) {
    container.innerHTML = "<p>No projects found.</p>";
    return;
  }
  container.innerHTML = ""; // Clear the container before rendering
  // Loop through the object and create the links
  projects.forEach((project) => {
    // Create a new link element)
    console.log(`Project Id: ${project.id} Name: ${project.name}`);

    container.innerHTML += `
        <article id=${project.id} class="card-projects" href="">
          <img src="" alt="" />
          <label for="">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
          </label>
        </article>`;
  });
}

//  API fetch
// Path to your JSON file
const jsonProjects = "../data/projects.json";

// Use an async function to handle the request cleanly
async function loadProjets() {
  try {
    // 1. Make the request to the file
    const response = await fetch(jsonProjects);

    // 2. Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 3. Convert the responso to JSON
    // This returns a promise that resolves with the array of objects
    return response.json();
  } catch (error) {
    // Catch and handle any errors that migth occur
    console.log("Error loading the JSON file:", error);
  }
}

// Execute the fuction loops to load the projects
const projects = await loadProjets();

renderProjects(projects, sectionProjects);
