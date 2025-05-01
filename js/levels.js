/**
 * Definición de niveles para el juego Caminos del Corazón
 * Cada nivel contiene puntos que deben conectarse en orden y un mensaje de celebración
 */

const LEVELS = [
    // Nivel 1: Corazón
    {
        title: "Nivel 1: Corazón",
        description: "Une los puntos en el orden correcto para revelar un corazón.",
        points: [
            { x: 0.5, y: 0.3 },  // Punto superior del corazón
            { x: 0.65, y: 0.2 },  // Curva superior derecha
            { x: 0.8, y: 0.35 },  // Lado derecho superior
            { x: 0.7, y: 0.55 },  // Lado derecho medio
            { x: 0.5, y: 0.8 },  // Punta inferior
            { x: 0.3, y: 0.55 },  // Lado izquierdo medio
            { x: 0.2, y: 0.35 },  // Lado izquierdo superior
            { x: 0.35, y: 0.2 },  // Curva superior izquierda
            { x: 0.5, y: 0.3 }   // Volver al inicio para cerrar
        ],
        celebrationMessage: "Tú completas mi mundo",
        revealImage: null  // Se puede agregar una imagen para revelar
    },
    // Nivel 2: Estrella
    {
        title: "Nivel 2: Estrella",
        description: "Une los puntos para formar una estrella brillante.",
        points: [
            { x: 0.5, y: 0.2 },  // Punta superior
            { x: 0.3, y: 0.6 },  // Izquierda inferior
            { x: 0.8, y: 0.4 },  // Derecha superior
            { x: 0.2, y: 0.4 },  // Izquierda superior
            { x: 0.7, y: 0.6 },  // Derecha inferior
            { x: 0.5, y: 0.2 }   // Volver al inicio
        ],
        celebrationMessage: "Eres mi estrellita",
        revealImage: null
    },
    // Nivel 3: Palabra LOVE
    {
        title: "Nivel 3: LOVE",
        description: "Une los puntos para formar la palabra LOVE.",
        points: [
            // L
            { x: 0.2, y: 0.3 },
            { x: 0.2, y: 0.7 },
            { x: 0.3, y: 0.7 },
            // O
            { x: 0.4, y: 0.3 },
            { x: 0.5, y: 0.3 },
            { x: 0.5, y: 0.7 },
            { x: 0.4, y: 0.7 },
            { x: 0.4, y: 0.3 },
            // V
            { x: 0.6, y: 0.3 },
            { x: 0.65, y: 0.7 },
            { x: 0.7, y: 0.3 },
            // E
            { x: 0.8, y: 0.3 },
            { x: 0.8, y: 0.7 },
            { x: 0.9, y: 0.7 },
            { x: 0.8, y: 0.5 },
            { x: 0.9, y: 0.5 },
            { x: 0.8, y: 0.3 },
            { x: 0.9, y: 0.3 }
        ],
        celebrationMessage: "Te amo de aqui a la luna y de vuelta",
        revealImage: null
    }
];