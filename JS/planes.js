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