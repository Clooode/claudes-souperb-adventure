const ingredients = [
    { src: 'assets/baguette.png', alt: 'Tomato' },
    { src: 'assets/carrots.png', alt: 'Carrot' },
    { src: 'assets/onion.png', alt: 'Onion' },
    { src: 'assets/broccoli.png', alt: 'Crouton' },
    { src: 'assets/chicken-leg.png', alt: 'Crouton' },
  ];
  
  const bowl = document.getElementById('soup-bowl');
  const placed = [];
  
  const MIN_DISTANCE = 70; // Minimum px between ingredients
  
  function getRandomPosition(maxW, maxH) {
    return {
      x: Math.random() * maxW,
      y: Math.random() * maxH
    };
  }
  
  function isTooClose(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE;
  }
  
  function placeIngredient(ingredient) {
    const bowlRect = bowl.getBoundingClientRect();
    const maxW = bowl.clientWidth - 50; // ingredient width
    const maxH = bowl.clientHeight - 50; // ingredient height
  
    let pos;
    let attempts = 0;
    do {
      pos = getRandomPosition(maxW, maxH);
      attempts++;
      if (attempts > 100) break; // Prevent infinite loops
    } while (placed.some(p => isTooClose(p, pos)));
  
    placed.push(pos);
  
    const el = document.createElement('div');
    el.classList.add('ingredient');
    el.style.left = `${pos.x}px`;
    el.style.top = `${pos.y}px`;
  
    const img = document.createElement('img');
    img.src = ingredient.src;
    img.alt = ingredient.alt;
  
    el.appendChild(img);
    bowl.appendChild(el);
  }
  
  // Place all ingredients on DOM load
  window.addEventListener('DOMContentLoaded', () => {
    ingredients.forEach(placeIngredient);
  });
  