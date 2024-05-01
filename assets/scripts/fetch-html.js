const loader = document.querySelector(".loader");

// Fetch JSON data from file
fetch('./assets/json/challenges.json')
    .then(response => response.json())
    .then(data => {
        // Call function to generate cards with JSON data
        console.log(data);
        generateCards(data.name);
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Function to dynamically generate cards from JSON data
function generateCards(data) {
    const mainContainer = document.querySelector('main'); // Select the main container

    mainContainer.innerHTML = '';

    // image index => number of projects
    let projectIndex = 0;

    // Loop through each project in the JSON data
    data.forEach(project => {
        // Create a card element
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('role', 'article');

        // Create an array to store the badge images
        const badgeImages = [];

        // Loop through each tag in the project
        project.tags.forEach(tag => {
            // Create an image element for each tag and push it to the badgeImages array
            const img = document.createElement('img');
            img.src = `./assets/badges/${tag.toLowerCase()}.svg`; // Assuming tag names match badge image filenames
            img.alt = tag;
            badgeImages.push(img);
        });

        // Create card content
        // Set card content
        card.innerHTML = `
    <img src="./assets/screenshots/desktop-design%20(${projectIndex}).jpg" alt="">
    <div class="card-tag">
        ${badgeImages.map(image => image.outerHTML).join('')}
    </div>
    <div class="card-text">
        <h2>${project.name}</h2>
        <p class="card-description">
            Your challenge is to build out this ${project.name} card and get it looking as close to the design as possible.
        </p>
    </div>
    <div class="card-btn">
        <a data-cursor role="button" class="github" target="_blank" href="https://github.com/RanitManik/FrontendMentor-Solutions/tree/main/${project.link}">
            <p>GitHub</p>
            <img src="./assets/icons/link.svg" alt="">
        </a>
        <a data-cursor role="button" target="_blank" href="${project.link}/index.html" class="demo">
            <p>Demo</p>
            <img src="./assets/icons/link.svg" alt="">
        </a>
    </div>
`;
        if (projectIndex === 0 || projectIndex === 1) {
            card.classList.add('object-center');
        }
        projectIndex += 1;

        // Append card to the main container
        mainContainer.appendChild(card);
    });
}


window.addEventListener("load", (e) => {
    loader.style.display = "none";
})