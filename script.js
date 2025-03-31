document.addEventListener('DOMContentLoaded', function() {
    // Crear corazones flotantes en el fondo
    createHearts();
    
    // Animación para la línea de tiempo
    animateTimeline();
    
    // Botón de mensaje especial
    const messageBtn = document.getElementById('message-btn');
    const specialMessage = document.getElementById('special-message');
    
    messageBtn.addEventListener('click', function() {
        specialMessage.classList.remove('hidden');
        setTimeout(() => {
            specialMessage.classList.add('show');
            createHeartBurst();
        }, 100);
    });
    
    // Animación para las tarjetas de razones
    animateReasonCards();
});

// Función para crear corazones flotantes en el fondo
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-bg');
    const numberOfHearts = 50;
    
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.opacity = Math.random() * 0.5 + 0.1;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.position = 'absolute';
        heart.style.animation = `float ${Math.random() * 6 + 4}s ease-in-out infinite`;
        
        heartsContainer.appendChild(heart);
    }
}

// Función para animar la línea de tiempo
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
}

// Función para animar las tarjetas de razones
function animateReasonCards() {
    const reasonCards = document.querySelectorAll('.reason-card');
    
    reasonCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
        
        // Añadir animación de latido al corazón
        const heartIcon = card.querySelector('i');
        setInterval(() => {
            heartIcon.style.animation = 'heartBeat 1.5s ease';
            setTimeout(() => {
                heartIcon.style.animation = '';
            }, 1500);
        }, 3000 + (index * 500));
    });
}

// Función para crear una explosión de corazones
function createHeartBurst() {
    const messageSection = document.querySelector('.message');
    const burstContainer = document.createElement('div');
    burstContainer.classList.add('heart-burst');
    burstContainer.style.position = 'absolute';
    burstContainer.style.top = '50%';
    burstContainer.style.left = '50%';
    burstContainer.style.transform = 'translate(-50%, -50%)';
    burstContainer.style.zIndex = '-1';
    burstContainer.style.pointerEvents = 'none';
    
    messageSection.style.position = 'relative';
    messageSection.appendChild(burstContainer);
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 2 + 1;
        
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.opacity = '1';
        heart.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;
        
        burstContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5)`;
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    setTimeout(() => {
        burstContainer.remove();
    }, 3000);
}

// Añadir funcionalidad para hacer que las fotos sean interactivas
document.addEventListener('DOMContentLoaded', function() {
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            alert('Puedes reemplazar esto con tus fotos favoritas editando el HTML. ¡Personaliza esta página con tus recuerdos especiales!');
        });
    });
});
