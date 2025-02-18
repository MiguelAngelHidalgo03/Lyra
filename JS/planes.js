document.addEventListener('scroll', function() {
    const hiddenElements = document.querySelectorAll('.hidden');
    
    hiddenElements.forEach(element => {
        const sectionTop = element.getBoundingClientRect().top;
        
        if (sectionTop < window.innerHeight * 0.75) {
            element.classList.add('show');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.querySelector('.anounce').classList.add('show');
    }, 80); 
});

document.addEventListener('DOMContentLoaded', function() {
    const controlButtons = document.querySelectorAll('.control-btn img');

    controlButtons.forEach(button => {
        const originalSrc = button.src;
        const hoverSrc = originalSrc.replace('.png', '-hover.png'); // Asegúrate de tener las imágenes con el sufijo '-hover'

        button.addEventListener('mouseover', () => {
            button.src = hoverSrc;
        });

        button.addEventListener('mouseout', () => {
            button.src = originalSrc;
        });
    });
});
