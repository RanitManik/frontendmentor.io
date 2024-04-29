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

    // Loop through each project in the JSON data
    data.forEach(project => {
        // Create a card element
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('role', 'article');

        // Create card content
        // Set card content
        card.innerHTML = `
    <img src="./${project.link}/Screen%20Shot.png" alt=""> 
    <div class="card-tag">
        <img src="assets/badges/html5.svg" alt="">
        <img src="assets/badges/css3.svg" alt="">
        <img src="assets/badges/javascript.svg" alt="">
        <img src="assets/badges/tailwindcss.svg" alt="">
        <img src="assets/badges/404.svg" alt="">
    </div>
    <div class="card-text">
        <h2>${project.name}</h2>
        <p class="card-description">
            Your challenge is to build out this ${project.name} card and get it looking as close to the design as possible.
        </p>
    </div>
    <div class="card-btn">
        <a role="button" class="github" target="_blank" href="https://github.com/RanitManik/FrontendMentor-Solutions/${project.link}">
            <p>GitHub</p>
            <img src="./assets/icons/link.svg" alt="">
        </a>
        <a role="button" target="_blank" href="${project.link}/index.html" class="demo">
            <p>Demo</p>
            <img src="./assets/icons/link.svg" alt="">
        </a>
    </div>
`;

        // Append card to the main container
        mainContainer.appendChild(card);
    });
}
