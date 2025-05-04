import confetti from 'canvas-confetti'

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

export const fireworksConfetti = () => {
  const end = Date.now() + 3000;

  const interval = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    const position = {
      x: Math.random(),
      y: Math.random() - 0.2
    };
    
    confetti({
      particleCount: 40,
      angle: 360 * Math.random(),
      spread: 50,
      origin: position,
      colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#800080']
    });
  }, 200);
}

export const schoolColors = (colors = ['#ff5252', '#448aff']) => {
  confetti({
    particleCount: 150,
    angle: 90,
    spread: 70,
    origin: { y: 0.6 },
    colors: colors
  });
}

export const realisticCelebration = () => {
  const animationEnd = Date.now() + 5000;
  
  const interval = setInterval(() => {
    if (Date.now() > animationEnd) {
      return clearInterval(interval);
    }
    
    confetti({
      particleCount: 15,
      angle: 60,
      spread: 55,
      origin: { x: 0.05, y: 0.55 }
    });
    
    confetti({
      particleCount: 15,
      angle: 120,
      spread: 55,
      origin: { x: 0.95, y: 0.55 }
    });
  }, 150);
}

export const confettiShower = () => {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff'];
  
  const defaults = {
    origin: { y: -0.1 },
    gravity: 1.2,
    shapes: ['circle', 'square'],
    zIndex: 1000
  };
  
  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(200 * particleRatio),
      colors: colors.sort(() => Math.random() - 0.5).slice(0, 4)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.3, {
    spread: 60,
  });
  
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    
    const positions = [
      {x: 0.2, y: 0.3},
      {x: 0.5, y: 0.2},
      {x: 0.8, y: 0.3}
    ];
    
    const position = positions[Math.floor(Math.random() * positions.length)];
    
    confetti({
      ...defaults,
      particleCount: 50,
      origin: position,
      colors: colors.sort(() => Math.random() - 0.5).slice(0, 3),
      startVelocity: 30 + Math.random() * 20,
      spread: 50 + Math.random() * 50,
      scalar: 0.8 + Math.random() * 0.6,
      ticks: 300,
      decay: 0.91
    });
  }, 250);
  
  setTimeout(() => {
    fire(0.5, {
      spread: 120,
      startVelocity: 45,
      decay: 0.94,
      scalar: 1.2
    });
  }, duration - 500);
}

export default function useConfetti() {
  return {
    simpleConfetti,
    tripleConfetti,
    confettiRain,
    fireworksConfetti,
    schoolColors,
    confettiShower
  }
}