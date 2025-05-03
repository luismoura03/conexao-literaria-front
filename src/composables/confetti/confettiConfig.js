import confetti from 'canvas-confetti'

// Exportação direta das funções individuais
export const simpleConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

export const tripleConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  })

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0}
    });
  }, 250)

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1}
    });
  }, 400)
}

export const confettiRain = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if(timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration)

    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.1, y: 0.5 }
    })

    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.9, y: 0.5 }
    })
  }, 250)
}

// Manter a exportação do composable para compatibilidade
export default function useConfetti() {
  return {
    simpleConfetti,
    tripleConfetti,
    confettiRain
  }
}