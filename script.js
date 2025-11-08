
  
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn[data-value]");
    const message = document.getElementById("message");
    const clear = document.getElementById("clear");
    const equals = document.getElementById("equals");
    const scoreEl = document.getElementById("score");
    const levelEl = document.getElementById("level");
    const levelUpEl = document.getElementById("levelUp");

    const clickSound = document.getElementById("clickSound");
    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");

    let expression = "";
    let level = 1;
    let score = 0;
    let puzzleAnswer = 5;

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        clickSound.play();
        expression += btn.getAttribute("data-value");
        display.textContent = expression;
      });
    });

    equals.addEventListener("click", () => {
      try {
        let result = eval(expression);
        display.textContent = result;

        if (result === puzzleAnswer) {
          correctSound.play();
          display.classList.add("correct");
          setTimeout(() => display.classList.remove("correct"), 500);

          score += level * 10;
          level++;
          scoreEl.textContent = score;
          levelEl.textContent = level;

          showLevelUpMessage(generateCongratsMessage());

          buttons.forEach((btn, index) => {
            if (index < level * 4) {
              btn.disabled = false;
              btn.classList.add("unlock");
              setTimeout(() => btn.classList.remove("unlock"), 800);
            }
          });

          generatePuzzle();
        } else {
          wrongSound.play();
          display.classList.add("wrong");
          setTimeout(() => display.classList.remove("wrong"), 500);
          message.textContent = "❌ Wrong! Try again!";
        }

        expression = "";
      } catch {
        display.textContent = "Error";
        expression = "";
      }
    });

    clear.addEventListener("click", () => {
      clickSound.play();
      expression = "";
      display.textContent = "0";
    });

    function generatePuzzle() {
      const num1 = Math.floor(Math.random() * 10 + level);
      const num2 = Math.floor(Math.random() * 10 + level);
      puzzleAnswer = num1 + num2;
      setTimeout(() => {
        message.textContent = `🔒 Solve this, genius: ${num1} + ${num2} = ?`;
      }, 500);
    }

    function generateCongratsMessage() {
      const messages = [
        "🎉 Incredible! You solved it, genius!",
        "💡 Wow! Your brain is on fire!",
        "🔥 You're unstoppable!",
        "👏 Amazing! Keep it up, mastermind!",
        "🏆 Genius move, M.Hamza Azeem Shaikh would be proud!"
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }

    function showLevelUpMessage(text) {
      levelUpEl.textContent = text;
      levelUpEl.classList.add("show");
      setTimeout(() => {
        levelUpEl.classList.remove("show");
      }, 2000);
    }
  