document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('luxuryForm');
    const successMessage = document.getElementById('formSuccess');
    const fadeElements = document.querySelectorAll('.js-fade-element');

    // ==========================================================================
    // 1. ВЫСОКОПРОИЗВОДИТЕЛЬНАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ
    // ==========================================================================
    const observerOptions = {
        root: null,
        threshold: 0.08, 
        rootMargin: '0px 0px -20px 0px'
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        appearanceObserver.observe(el);
    });

    // ==========================================================================
    // 2. ОБРАБОТКА ФОРМЫ С ДВОЙНЫМ СИНХРОННЫМ КАДРОМ РЕНДЕРИНГА
    // ==========================================================================
    if (form && successMessage) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            form.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            form.style.opacity = '0';
            form.style.transform = 'translateY(-12px)';
            
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        successMessage.style.opacity = '1';
                    });
                });
                
            }, 350);
        });
    }
});

