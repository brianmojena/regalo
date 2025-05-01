/**
 * Juego Caminos del Corazón
 * Un juego de puzzles donde se unen puntos para revelar figuras románticas
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const levelTitle = document.getElementById('level-title');
    const levelDescription = document.getElementById('level-description');
    const resetBtn = document.getElementById('reset-btn');
    const hintBtn = document.getElementById('hint-btn');
    const soundToggle = document.getElementById('sound-toggle');
    const musicToggle = document.getElementById('music-toggle');
    const celebration = document.getElementById('celebration');
    const celebrationMessage = document.getElementById('celebration-message');
    const nextLevelBtn = document.getElementById('next-level-btn');
    
    // Sonidos
    const connectSound = document.getElementById('connect-sound');
    const completeSound = document.getElementById('complete-sound');
    const backgroundMusic = document.getElementById('background-music');
    
    // Crear sistema de partículas
    const particleSystem = new ParticleSystem(canvas, {
        particleCount: 150,
        colors: ['#ffaad4', '#d16ba5', '#9370db', '#86a8e7', '#5ffbf1'],
        duration: 5000
    });
    
    // Variables del juego
    let currentLevel = 0;
    let points = [];
    let connections = [];
    let selectedPointIndex = -1;
    let hintTimeout = null;
    let soundEnabled = true;
    let musicEnabled = false;
    let gameCompleted = false;
    
    // Ajustar tamaño del canvas
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawGame();
    }
    
    // Inicializar el juego
    function initGame() {
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        loadLevel(currentLevel);
        
        // Event listeners
        canvas.addEventListener('mousedown', handleCanvasClick);
        canvas.addEventListener('touchstart', handleCanvasTouch, { passive: false });
        canvas.addEventListener('mousemove', handleCanvasMove);
        canvas.addEventListener('touchmove', handleCanvasTouch, { passive: false });
        resetBtn.addEventListener('click', resetLevel);
        hintBtn.addEventListener('click', showHint);
        nextLevelBtn.addEventListener('click', nextLevel);
        soundToggle.addEventListener('change', toggleSound);
        musicToggle.addEventListener('change', toggleMusic);
        
        // Iniciar con sonidos activados y música desactivada
        soundEnabled = soundToggle.checked;
        musicEnabled = musicToggle.checked;
        if (musicEnabled) {
            backgroundMusic.volume = 0.3;
            backgroundMusic.play().catch(e => console.log('Error al reproducir música:', e));
        }
    }
    
    // Cargar nivel
    function loadLevel(levelIndex) {
        if (levelIndex >= LEVELS.length) {
            // Todos los niveles completados
            gameCompleted = true;
            celebrationMessage.textContent = "¡Has completado todos los niveles! ¡Gracias por jugar!";
            celebration.classList.remove('hidden');
            nextLevelBtn.style.display = 'none';
            if (soundEnabled) completeSound.play();
            return;
        }
        
        const level = LEVELS[levelIndex];
        levelTitle.textContent = level.title;
        levelDescription.textContent = level.description;
        
        // Convertir puntos relativos a coordenadas absolutas
        points = level.points.map(point => ({
            x: point.x * canvas.width,
            y: point.y * canvas.height,
            radius: 15,
            color: '#9370db',
            hoverColor: '#d16ba5',
            isHovered: false
        }));
        
        connections = [];
        selectedPointIndex = -1;
        drawGame();
    }
    
    // Dibujar el juego
    function drawGame() {
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar conexiones existentes
        if (connections.length > 0) {
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // Crear degradado para las líneas
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#d16ba5');
            gradient.addColorStop(0.5, '#86a8e7');
            gradient.addColorStop(1, '#5ffbf1');
            ctx.strokeStyle = gradient;
            
            ctx.beginPath();
            const firstPoint = points[connections[0]];
            ctx.moveTo(firstPoint.x, firstPoint.y);
            
            for (let i = 1; i < connections.length; i++) {
                const point = points[connections[i]];
                ctx.lineTo(point.x, point.y);
            }
            
            ctx.stroke();
        }
        
        // Dibujar línea temporal si hay un punto seleccionado
        if (selectedPointIndex !== -1 && mousePosition) {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#9370db80'; // Semi-transparente
            ctx.moveTo(points[selectedPointIndex].x, points[selectedPointIndex].y);
            ctx.lineTo(mousePosition.x, mousePosition.y);
            ctx.stroke();
        }
        
        // Dibujar puntos
        points.forEach((point, index) => {
            // Determinar si el punto está conectado
            const isConnected = connections.includes(index);
            const isLast = connections.length > 0 && connections[connections.length - 1] === index;
            
            // Dibujar círculo exterior (aura)
            ctx.beginPath();
            ctx.fillStyle = isConnected ? (isLast ? '#d16ba580' : '#9370db50') : 'rgba(255, 255, 255, 0.3)';
            ctx.arc(point.x, point.y, point.radius + 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Dibujar punto
            ctx.beginPath();
            ctx.fillStyle = point.isHovered ? point.hoverColor : (isConnected ? '#d16ba5' : point.color);
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Añadir número al punto
            ctx.fillStyle = '#fff';
            ctx.font = '16px Sacramento';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(index + 1, point.x, point.y);
        });
    }
    
    // Posición del mouse/touch
    let mousePosition = null;
    
    // Manejar clic en el canvas
    function handleCanvasClick(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        checkPointSelection(x, y);
    }
    
    // Manejar eventos touch
    function handleCanvasTouch(e) {
        e.preventDefault();
        if (e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            
            if (e.type === 'touchstart') {
                checkPointSelection(x, y);
            } else if (e.type === 'touchmove') {
                mousePosition = { x, y };
                updateHoveredPoints(x, y);
                drawGame();
            }
        }
    }
    
    // Manejar movimiento del mouse
    function handleCanvasMove(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        mousePosition = { x, y };
        updateHoveredPoints(x, y);
        drawGame();
    }
    
    // Actualizar estado de hover de los puntos
    function updateHoveredPoints(x, y) {
        points.forEach(point => {
            const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
            point.isHovered = distance <= point.radius;
        });
    }
    
    // Verificar selección de punto
    function checkPointSelection(x, y) {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
            
            if (distance <= point.radius) {
                // Si es el primer punto o es adyacente al último punto seleccionado
                // Modificación: permitir conectar el último punto con el primero para cerrar la figura
                if (connections.length === 0 || 
                    (connections.length === points.length - 1 && i === connections[0]) || 
                    (i !== connections[connections.length - 1])) {
                    
                    // Añadir conexión
                    connections.push(i);
                    selectedPointIndex = i;
                    
                    // Reproducir sonido de conexión
                    if (soundEnabled) {
                        connectSound.currentTime = 0;
                        connectSound.play().catch(e => console.log('Error al reproducir sonido:', e));
                    }
                    
                    // Verificar si el nivel está completo
                    checkLevelCompletion();
                }
                break;
            }
        }
        
        drawGame();
    }
    
    // Verificar si el nivel está completo
    function checkLevelCompletion() {
        const level = LEVELS[currentLevel];
        
        // Verificar si todos los puntos están conectados
        if (connections.length === level.points.length) {
            // Verificar si el orden es correcto
            let isCorrect = true;
            
            // Comparar cada conexión con el índice esperado
            for (let i = 0; i < connections.length; i++) {
                if (connections[i] !== i) {
                    isCorrect = false;
                    break;
                }
            }
            
            if (isCorrect) {
                // Nivel completado
                setTimeout(() => {
                    celebrateLevelCompletion();
                }, 500);
            }
        }
    }
    
    // Celebrar completar el nivel
    function celebrateLevelCompletion() {
        const level = LEVELS[currentLevel];
        celebrationMessage.textContent = level.celebrationMessage;
        celebration.classList.remove('hidden');
        
        // Reproducir sonido de completado
        if (soundEnabled) {
            completeSound.play().catch(e => console.log('Error al reproducir sonido:', e));
        }
        
        // Iniciar animación de partículas
        particleSystem.start(canvas.width / 2, canvas.height / 2);
    }
    
    // Pasar al siguiente nivel
    function nextLevel() {
        currentLevel++;
        celebration.classList.add('hidden');
        particleSystem.stop();
        loadLevel(currentLevel);
    }
    
    // Reiniciar nivel actual
    function resetLevel() {
        connections = [];
        selectedPointIndex = -1;
        drawGame();
    }
    
    // Mostrar pista
    function showHint() {
        // Resaltar el siguiente punto a conectar
        if (connections.length < points.length) {
            const nextPointIndex = connections.length % points.length;
            const nextPoint = points[nextPointIndex];
            
            // Efecto visual de pista
            const originalColor = nextPoint.color;
            nextPoint.color = '#ff0000';
            drawGame();
            
            // Restaurar después de un tiempo
            clearTimeout(hintTimeout);
            hintTimeout = setTimeout(() => {
                nextPoint.color = originalColor;
                drawGame();
            }, 1000);
        }
    }
    
    // Activar/desactivar sonidos
    function toggleSound() {
        soundEnabled = soundToggle.checked;
    }
    
    // Activar/desactivar música
    function toggleMusic() {
        musicEnabled = musicToggle.checked;
        
        if (musicEnabled) {
            backgroundMusic.volume = 0.3;
            backgroundMusic.play().catch(e => console.log('Error al reproducir música:', e));
        } else {
            backgroundMusic.pause();
        }
    }
    
    // Iniciar el juego
    initGame();
});