const sections = document.querySelectorAll('.galeria');

// Crea un observador para detectar cuándo las secciones entran en la vista
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Agrega la clase 'visible' al entrar en la vista
        }
    });
});

// Aplica el observador a cada sección
sections.forEach(section => {
    observer.observe(section);
});