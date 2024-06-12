document.addEventListener("DOMContentLoaded", (e) => {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";

    fetch("./assets/json/challenges.json")
        .then(response => response.json())
        .then(data => {
            generateCards(data.name);
            const lazyImages = document.querySelectorAll('img.lazy');
            lazyImages.forEach(lazyLoad);
        })
        .catch(error => console.error("Error fetching JSON:", error));

    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-solutions');
                    img.setAttribute('src', src);
                    img.classList.remove('lazy');
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };
});

// Function to dynamically generate cards from JSON data
function generateCards(data) {
    const mainContainer = document.querySelector("main"); // Select the main container

    mainContainer.innerHTML = "";

    // image index => number of projects
    let projectIndex = 1;

    // Loop through each project in the JSON data
    data.forEach(project => {
        // Create a card element
        const card = document.createElement("card");
        card.classList.add("card");
        card.setAttribute("role", "article");

        // Create an array to store the badge images
        const badgeImages = [];

        // Loop through each tag in the project
        project.tags.forEach(tag => {
            // Create an image element for each tag and push it to the badgeImages array
            const img = document.createElement("img");
            img.src = `./assets/badges/${tag.toLowerCase()}.svg`; // Assuming tag names match badge image filenames
            img.alt = tag;
            badgeImages.push(img);
        });

        // Create the image container div
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container", "blur-load");
        imageContainer.style.backgroundImage = `url("./assets/desktop-design__compressed/desktop-design (${projectIndex}).jpg")`;
        imageContainer.style.backgroundPosition = project.position;

        // Create the img element
        const img = document.createElement("img");
        img.style.objectPosition = project.position;
        img.classList.add("lazy");
        img.loading = "lazy";
        img.setAttribute("data-solutions", `./assets/desktop-design__original/desktop-design (${projectIndex}).jpg`);
        img.alt = "";
        img.addEventListener("load", () => {
            imageContainer.classList.add("loaded");
        })

        // Append the img to the image container
        imageContainer.appendChild(img);

        // Create card content
        card.innerHTML = `
            <div class="card-tag">
                ${badgeImages.map(image => image.outerHTML).join("")}
            </div>
            <div class="card-text">
                <h2>${project.name}</h2>
                <p class="card-description">
                    Your challenge is to build out this ${project.name} card and get it looking as close to the design as possible.
                </p>
            </div>
            <div class="card-btn">
                <a data-cursor role="button" class="github" target="_blank" href="https://github.com/RanitManik/FrontendMentor-Solutions/tree/main/solutions/${project.link}">
                    <p>GitHub</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z"/>
                    <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z"/>
                    </svg>
                </a>
                <a data-cursor role="button" target="_blank" href="solutions/${project.link}/index.html" class="demo">
                    <p>Demo</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z"/>
                    <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z"/>
                    </svg>
                </a>
            </div>
        `;

        // Append the image container to the card
        card.insertBefore(imageContainer, card.firstChild);

        // Increment the project index
        projectIndex += 1;

        // Append card to the main container
        mainContainer.appendChild(card);
    });
}
