document.addEventListener('DOMContentLoaded', () => {

    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const dotsNav = document.querySelector('.carousel-dots');

    let currentIndex = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        if (index === 0) dot.classList.add('active');
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    function moveToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });

    dotsNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const index = dots.findIndex(dot => dot === targetDot);
        moveToSlide(index);
    });

    const galleryItems = document.querySelectorAll('.gallery-item');

    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const slideIndex = (index % (slides.length - 1)) + 1; // handle extra items
            moveToSlide(slideIndex);
        });
    });
});