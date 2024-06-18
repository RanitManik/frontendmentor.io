const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 400, fill: "forwards"});
});

document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorOutline.style.opacity = "0";
})
document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";
})