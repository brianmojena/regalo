/**
 * Sistema de partículas para animaciones de celebración
 * Crea efectos visuales cuando el jugador completa un nivel
 */

class ParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        
        // Opciones por defecto
        this.options = {
            particleCount: options.particleCount || 100,
            colors: options.colors || ['#ffaad4', '#d16ba5', '#9370db', '#86a8e7', '#5ffbf1'],
            minSize: options.minSize || 5,
            maxSize: options.maxSize || 15,
            minSpeed: options.minSpeed || 1,
            maxSpeed: options.maxSpeed || 3,
            duration: options.duration || 3000, // duración en ms
            gravity: options.gravity || 0.1,
            fadeOut: options.fadeOut !== undefined ? options.fadeOut : true
        };
    }
    
    // Iniciar la animación de partículas
    start(x, y) {
        this.particles = [];
        this.running = true;
        
        // Crear partículas
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: x || this.canvas.width / 2,
                y: y || this.canvas.height / 2,
                size: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
                color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
                vx: (Math.random() - 0.5) * this.options.maxSpeed * 2,
                vy: (Math.random() - 0.5) * this.options.maxSpeed * 2 - 2, // Impulso inicial hacia arriba
                alpha: 1,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 5
            });
        }
        
        // Iniciar la animación
        this.lastTime = Date.now();
        this.startTime = this.lastTime;
        this.animate();
        
        // Detener después de la duración especificada
        setTimeout(() => {
            this.running = false;
        }, this.options.duration);
    }
    
    // Función de animación
    animate() {
        if (!this.running) return;
        
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // en segundos
        this.lastTime = currentTime;
        
        // Calcular progreso para el desvanecimiento
        const progress = (currentTime - this.startTime) / this.options.duration;
        
        // Limpiar el canvas (opcional, depende si queremos mantener lo que había antes)
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Actualizar y dibujar partículas
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Actualizar posición
            p.x += p.vx;
            p.y += p.vy;
            p.vy += this.options.gravity; // Aplicar gravedad
            p.rotation += p.rotationSpeed;
            
            // Desvanecer si está activado
            if (this.options.fadeOut) {
                p.alpha = Math.max(0, 1 - progress);
            }
            
            // Dibujar partícula
            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            
            // Dibujar formas variadas (corazones, estrellas, círculos)
            const shapeType = i % 3; // Alternar entre diferentes formas
            
            if (shapeType === 0) {
                // Dibujar corazón
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                const size = p.size * 0.8;
                this.drawHeart(0, 0, size);
                this.ctx.fill();
            } else if (shapeType === 1) {
                // Dibujar estrella
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.drawStar(0, 0, 5, p.size * 0.5, p.size * 0.2);
                this.ctx.fill();
            } else {
                // Dibujar círculo
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            this.ctx.restore();
        }
        
        // Continuar la animación
        if (this.running) {
            requestAnimationFrame(() => this.animate());
        }
    }
    
    // Función para dibujar un corazón
    drawHeart(x, y, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size / 4);
        this.ctx.bezierCurveTo(
            x, y - size / 2,
            x - size / 2, y - size / 2,
            x - size / 2, y - size / 4
        );
        this.ctx.bezierCurveTo(
            x - size / 2, y,
            x, y + size / 2,
            x, y + size / 2
        );
        this.ctx.bezierCurveTo(
            x, y + size / 2,
            x + size / 2, y,
            x + size / 2, y - size / 4
        );
        this.ctx.bezierCurveTo(
            x + size / 2, y - size / 2,
            x, y - size / 2,
            x, y - size / 4
        );
    }
    
    // Función para dibujar una estrella
    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
        }
        
        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
    }
    
    // Detener la animación
    stop() {
        this.running = false;
    }
}