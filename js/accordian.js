const items = document.querySelectorAll('.accordion-item');

items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const icon = item.querySelector('.icon');

    header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all
        items.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.icon').textContent = '+';
        });

        // Open clicked one
        if (!isOpen) {
            item.classList.add('active');
            icon.textContent = '−';
        }
    });
});