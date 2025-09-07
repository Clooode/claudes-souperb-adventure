const questions = [
    {
      question: "What's my favourite colour scheme?",
      options: ["Pink and green", "Orange and blue", "Purple and green", "Pink and red"],
      correct: "Pink and green"
    },


    {
        question: "Which of these breads were invented the most recently?",
        options: ["Ciabatta", "Foccaccia", "Scrolls", "Damper"],
        correct: "Ciabatta"
      },

    {
      question: "What's the oldest soup recipe in history (that we know of) for?",
      options: ["Millet soup", "Hippopotamus broth", "Vegetable broth", "Beef broth"],
      correct: "Hippopotamus broth"
    },
    {
      question: "What is the total number of contracted basis functions (s, px, py and pz) used when carrying out a Hartree-Fock calculation on fluorobenzene C6H5F using the 6-31G basis set?",
      options: ["73", "108", "106", "82"],
      correct: "73"
    },
    {
      question: "Which of the following methods is not used to improve the convergence behaviour when solving the Hartree-Fock equations?",
      options: ["Modifying the energy of the virtual orbitals when constructing the Fock operator, through level-shifting",
      "Combining the results of multiple steps to estimate the most accurate Fock operator matrix for the following step",
      "Carefully choosing the initial set of coefficients cij, so that the 'guess' for the wavefunction is as close as possible to the final Hartree-Fock wavefunction",
      "Re-calculating some of the two-electron integrals  at each step"],
    correct: "Re-calculating some of the two-electron integrals at each step"
    }
,
    {
        question: "Assuming the airspeed velocity of an unladen swallow is inversely proportional to its average weight divided by the wingspan squared, which bird is faster?",
        options: ["African 'Mosque' swallow", "European 'Barn' swallow"],
        correct: "European 'Barn' swallow"
      },


  ];
  
  let currentQuestion = 0;

  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-button");
  const quizContainer = document.getElementById("quiz-container");
  const questionEl = document.querySelector(".question");
  const answerContainer = document.getElementById("answer-container");
  
  startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
  });
  
  const bgColors = [
    "#FFB3BA", // Pastel Red/Pink
    "#FFDFBA", // Pastel Orange/Peach
    "#FFFFBA", // Pastel Yellow
    "#BAFFC9", // Pastel Green/Mint
    "#BAE1FF", // Pastel Blue
    "#DAB6FF"  // Pastel Purple/Lavender
  ];
  
  const textColors = [
    "#7F3A3A", // Darker dusty red
    "#7F5A3A", // Darker dusty orange
    "#7F7F3A", // Darker dusty yellow/olive
    "#3A7F4B", // Darker dusty green
    "#3A4B7F", // Darker dusty blue
    "#5A3A7F"  // Darker dusty purple
  ];

  function setTheme(index) {
    if (index === 0) {
      // First question: white text on black bg
      document.documentElement.style.setProperty("--bg-color", "#000000");
      document.documentElement.style.setProperty("--text-color", "#FFFFFF");
    } else {
      const colorIndex = (index - 1) % bgColors.length;
      document.documentElement.style.setProperty("--bg-color", bgColors[colorIndex]);
      document.documentElement.style.setProperty("--text-color", textColors[colorIndex]);
    }
  }
  
    
  function playRandomWrongSound() {
    const sound = wrongSounds[Math.floor(Math.random() * wrongSounds.length)];
    sound.currentTime = 0; // Reset if played before
    sound.play();
  }

  function playRightSounds() {
    const sound = rightSounds[Math.floor(Math.random() * rightSounds.length)];
    sound.currentTime = 0; // Reset if played before
    sound.play();
  }
  

  const wrongSounds = [
    new Audio('sounds/oof.mp3'),
    new Audio('sounds/womp.mp3'),
    new Audio('sounds/sponge.mp3')
  ];

const rightSounds = [
    new Audio('sounds/sparkle.mp3')
]

  function loadQuestion() {
    if (currentQuestion >= questions.length) {
        // Optional: add a small delay before redirect
        setTimeout(() => {
          window.location.href = "soup.html";
        }, 1000); // waits 1 second so the sound can play
        return;
      }
      
    setTheme(currentQuestion);
  
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answerContainer.innerHTML = "";
  
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => {
        if (option === q.correct) {
            playRightSounds();
          currentQuestion++;
          loadQuestion();
        } else {
            playRandomWrongSound();
            btn.textContent = "Try Again!";
            setTimeout(() => btn.textContent = option, 1000);            
        }
      });
      answerContainer.appendChild(btn);
    });
  }
  


  