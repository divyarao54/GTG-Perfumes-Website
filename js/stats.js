const statsSection = document.querySelector('.stats-section');
const numbers = document.querySelectorAll('.stat-number');

let hasAnimated = false;

function animateCount(el, target) {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * target);

        el.textContent = value + '%';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;

            numbers.forEach(num => {
                const target = +num.getAttribute('data-target');
                animateCount(num, target);
            });
        }
    });
}, {
    threshold: 0.4
});

observer.observe(statsSection);