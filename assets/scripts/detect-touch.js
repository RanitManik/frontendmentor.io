// Check if the device has touch capability
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Apply CSS styles based on device type
if (isTouchDevice()) {
    // Touch device detected, hide cursor styles
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.cursor-dot, .cursor-outline').forEach(function (el) {
            el.style.display = 'none';
        });
    });
} else {
    // Non-touch device detected, apply cursor styles
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.cursor-dot, .cursor-outline').forEach(function (el) {
            el.style.display = 'block';
        });
    });
}
