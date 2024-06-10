// Check if the device has touch capability
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Apply CSS styles based on device type
document.addEventListener('DOMContentLoaded', function () {
    if (!isTouchDevice()) {
        // Non-touch device detected, show custom cursor
        document.querySelectorAll('.cursor-dot, .cursor-outline').forEach(function (el) {
            el.style.display = 'block';
        });
    }
});
