document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope")
  const letter = document.getElementById("letter")
  const surpriseButton = document.getElementById("surpriseButton")

  // Function to open the envelope and show the letter
  function openEnvelope() {
    envelope.classList.add("envelope-open")

    // Wait for the envelope flap animation to complete
    setTimeout(() => {
      envelope.classList.add("envelope-hidden")
      letter.classList.add("letter-visible")
    }, 600)
  }

  // Function to close the letter and show the envelope
  function closeLetter() {
    letter.classList.remove("letter-visible")

    // Wait for the letter to hide before showing the envelope
    setTimeout(() => {
      envelope.classList.remove("envelope-hidden")
      envelope.classList.remove("envelope-open")
    }, 1000)
  }

  // Función para crear globos
  function createBalloon() {
    const balloon = document.createElement('div')
    balloon.className = 'balloon'
    
    // Colores de globos
    const colors = ['#ff69b4', '#ff9ff3', '#feca57', '#ff9f43', '#ff6b6b', '#48dbfb', '#1dd1a1']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    
    // Estilo del globo
    balloon.style.background = `radial-gradient(circle at 30% 30%, white 5%, ${randomColor} 60%)`
    balloon.style.left = `${Math.random() * 100}%`
    balloon.style.width = `${30 + Math.random() * 30}px`
    balloon.style.height = `${40 + Math.random() * 30}px`
    
    // Agregar el globo al documento
    document.body.appendChild(balloon)
    
    // Eliminar el globo después de la animación
    setTimeout(() => {
      balloon.remove()
    }, 6000)
  }
  
  // Función para crear confeti
  function createConfetti() {
    const confetti = document.createElement('div')
    confetti.className = 'confetti'
    
    // Colores de confeti
    const colors = ['#ff69b4', '#feca57', '#48dbfb', '#1dd1a1', '#ff9f43', '#ff6b6b']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    
    // Estilo del confeti
    confetti.style.background = randomColor
    confetti.style.left = `${Math.random() * 100}%`
    confetti.style.width = `${5 + Math.random() * 10}px`
    confetti.style.height = `${5 + Math.random() * 10}px`
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0'
    
    // Rotación aleatoria
    const rotation = Math.random() * 360
    confetti.style.transform = `rotate(${rotation}deg)`
    
    // Agregar el confeti al documento
    document.body.appendChild(confetti)
    
    // Eliminar el confeti después de la animación
    setTimeout(() => {
      confetti.remove()
    }, 4000)
  }
  
  // Función para lanzar la animación de sorpresa
  function launchSurprise() {
    // Crear múltiples globos y confeti
    for (let i = 0; i < 15; i++) {
      setTimeout(createBalloon, i * 200)
      
      // Crear más confeti que globos
      for (let j = 0; j < 3; j++) {
        setTimeout(createConfetti, i * 200 + (j * 70))
      }
    }
  }

  // Event listeners
  envelope.addEventListener("click", openEnvelope)
  surpriseButton.addEventListener("click", launchSurprise)
  
  // Cerrar la carta al hacer clic fuera de ella
  document.addEventListener("click", (event) => {
    // Verificar si el clic fue fuera de la carta y no en el sobre ni en el botón de sorpresa
    if (!letter.contains(event.target) && 
        !envelope.contains(event.target) && 
        event.target !== surpriseButton && 
        !surpriseButton.contains(event.target) &&
        letter.classList.contains("letter-visible")) {
      closeLetter()
    }
  })
  
  // Agregar animación sutil al tulipán
  const tulip = document.querySelector(".tulip")
  
  // Reproducir música de fondo automáticamente (opcional)
  // backgroundMusic.volume = 0.5
  // backgroundMusic.play().catch(error => console.log("Autoplay prevented:", error))
})
