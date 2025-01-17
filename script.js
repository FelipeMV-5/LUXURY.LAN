// Archivo: script.js
document.querySelectorAll('.stat-number').forEach(stat => {
    const updateCounter = () => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;

        const increment = target / 100;

        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 20);
        } else {
            stat.innerText = target;
        }
    };

    updateCounter();
});
