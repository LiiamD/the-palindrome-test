const checkButton = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const result = document.getElementById("result");

const jonasAudio = document.getElementById("jonas-audio");
const thomasAudio = document.getElementById("thomas-audio");
const bonusAudio = document.getElementById("bonus-audio");
const malusAudio = document.getElementById("malus-audio");
const gameOverAudio = document.getElementById("game-over-audio");
const successAudio = document.getElementById("success-audio");

const scorePoint = document.getElementById("score-point");
const scoreResult = document.getElementById("score-result");
const scoreEnd = document.getElementById("score-end");

const usedValues = [];

let score = 0;

function cleanInputString(str) {
  const regex = /[^a-zA-ZÀ-ÿ0-9\s-]/g;
  return str.replace(regex, "").toLowerCase().replace(/\s+/g, "");
}

function invertedString(str) {
  let inverted = "";
  for (let i = str.length - 1; i >= 0; i--) {
  inverted += str[i];
  }
  return inverted;
}

function strPal(str){
  const string = cleanInputString(str);
  const reversed = invertedString(string);
  return string === reversed; 
}

function noSpeChar(str){
  const regex = /[^a-zA-ZÀ-ÿ0-9\s-]/;
  return regex.test(str);
}

function oneCharPal(str){
  return /^([\w\s-])\1*$/.test(str);  // Vérifie si la chaîne est composée d'un seul caractère répété
}

function noShortChar(str){
  const shortCharRegex = /\b(\w{2,3})\1{2,}\b/i;   // Vérifie si la chaîne contient un mot court répété trois fois ou plus
  const repeatCharRegex = /(\w{2})\1+/; // Vérifie si deux caractères consécutifs sont répétés
  const longCharRegex = /(.)\1{2,}/i;  // Vérifie si un caractère est répété plus de deux fois
  return shortCharRegex.test(str) || repeatCharRegex.test(str) || longCharRegex.test(str); 
}

function playAudio(audioElement) {
   audioElement.muted = false;
   audioElement.currentTime = 0;
   audioElement.play().catch(error => {
   console.error("Erreur lors de la lecture de l'audio:", error);
 });
}


 checkButton.addEventListener("click", () => {
if (textInput.value === ""){
  alert("Veuillez indiquer une valeur");
} else if (noSpeChar(textInput.value)){
  alert("Veuillez n'utiliser que des lettres et des chiffres.");
} else if (oneCharPal(cleanInputString(textInput.value))){
  alert("La valeur ne doit pas être composée que d'un seul et même caractère. Essayez-en une autre.")
} else if (noShortChar(cleanInputString(textInput.value))){
  alert("La valeur ne doit pas contenir de courts motifs répétitifs ou des lettres excessivement répétées. Essayez-en une autre.");
} else if (cleanInputString(textInput.value).length > 25) {
  alert("La valeur ne doit pas dépasser 25 caractères.");
} else if (usedValues.includes(cleanInputString(textInput.value).toLowerCase())) {
  alert("Cette valeur a déjà été utilisée. Essayez-en une autre.");
} else {
  const resultPal = strPal(textInput.value);
  if (resultPal) {
  result.textContent = `${textInput.value} est un palindrome`;
  scoreLengthPoint();
  resultBoxColor();
  bonusAudio.muted = false;
  playAudio(bonusAudio);
  } else if (textInput.value.toLowerCase() === "thomas") {
     result.textContent = `${textInput.value} est un P...alindrome...?`; 
     thomasAudio.muted = false;
     playAudio(thomasAudio);
     scorePoint.style.display = "none";
} else if (textInput.value.toLowerCase() === "jonas") {
    result.textContent = `${textInput.value} est un P...rophète !`;
    jonasAudio.muted = false;
    playAudio(jonasAudio);
    scorePoint.style.display = "none";
} else {
    result.textContent = `${textInput.value} n'est pas un palindrome`;
    score -= 10;
  scoreResult.innerText = score;
  scorePoint.style.color = "rgb(202, 38, 71)"; // rouge
  scoreResult.style.display = "block";
  scoreResult.textContent = `SCORE: ${scoreResult.innerText}`;
  scorePoint.textContent = "-10";
  resultBoxColor();
  malusAudio.muted = false;
  playAudio(malusAudio);
  }
  usedValues.push(cleanInputString(textInput.value).toLowerCase()); // Ajoute la valeur au tableau usedValues
  textInput.value = ""; // Réinitialise le champ de saisie pour une nouvelle valeur

  scorePoint.classList.remove("animate");
    void scorePoint.offsetWidth; // Forcer un reflow pour relancer l'animation
    scorePoint.classList.add("animate");

    gameScore();
 }
});


textInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Empêche le comportement par défaut
      if( textInput.value === ""){
        alert("Veuillez indiquer une valeur");
      } else if (noSpeChar(textInput.value)){
        alert("Veuillez n'utiliser que des lettres et des chiffres.");
      } else if (oneCharPal(cleanInputString(textInput.value))){
        alert("La valeur ne doit pas être composée que d'un seul et même caractère. Essayez-en une autre.")
      } else if (noShortChar(cleanInputString(textInput.value))){
        alert("La valeur ne doit pas contenir de courts motifs répétitifs ou des lettres excessivement répétées. Essayez-en une autre.");
      } else if (cleanInputString(textInput.value).length > 25) {
        alert("La valeur ne doit pas dépasser 25 caractères.");
      } else if (usedValues.includes(cleanInputString(textInput.value).toLowerCase())) {
        alert("Cette valeur a déjà été utilisée. Essayez-en une autre.");
      } else {
        const resultPal = strPal(textInput.value);
        if (resultPal) {
        result.textContent = `${textInput.value} est un palindrome`;
        scoreLengthPoint();
        resultBoxColor();
        bonusAudio.muted = false;
        playAudio(bonusAudio);
        } else if (textInput.value.toLowerCase() === "thomas") {
           result.textContent = `${textInput.value} est un P...alindrome...?`;
           thomasAudio.muted = false; 
           playAudio(thomasAudio);
           scorePoint.style.display = "none"
      } else if (textInput.value.toLowerCase() === "jonas") {
        result.textContent = `${textInput.value} est un P...rophète !`;
        jonasAudio.muted = false;
        playAudio(jonasAudio);
        scorePoint.style.display = "none"
        } else {
          result.textContent = `${textInput.value} n'est pas un palindrome`;
          score -= 10;
          scoreResult.innerText = score;
          scorePoint.style.color = "rgb(202, 38, 71)"; // rouge
          scoreResult.style.display = "block";
          scoreResult.textContent = `SCORE: ${scoreResult.innerText}`;
          scorePoint.textContent = "-10";
          resultBoxColor();
          malusAudio.muted = false;
          playAudio(malusAudio);
        }
        usedValues.push(cleanInputString(textInput.value).toLowerCase()); // Ajoute la valeur au tableau usedValues
        textInput.value = ""; // Réinitialise le champ de saisie pour une nouvelle valeur

        scorePoint.classList.remove("animate");
        void scorePoint.offsetWidth; // Forcer un reflow pour relancer l'animation
        scorePoint.classList.add("animate");
    
        gameScore();
       }
      }
    });

    function resultBoxColor() {
      if (score === 0) {
        scoreResult.style.background = "rgb(256, 256, 256)";
        scoreResult.style.color = "rgb(0, 0, 0)";
      } else if (score < 0) {
        scoreResult.style.background = "rgb(202, 38, 71)"; /* "rgb(178, 10, 10)" */ // rouge
        scoreResult.style.color = "rgb(256, 256, 256)";
      } else {
        scoreResult.style.background = "rgb(42, 238, 42)"; // vert
        scoreResult.style.color = "rgb(256, 256, 256)";
      }
    }

    function scoreLengthPoint() {
      if(cleanInputString(textInput.value).length >= 20){
        score += 5;
        scoreResult.innerText = score;
        scorePoint.style.color = "rgb(42, 238, 42)";
        scorePoint.style.display = "block";
        scoreResult.style.display = "block";
        scoreResult.textContent = `SCORE: ${scoreResult.innerText}`;
        scorePoint.textContent = "+5";
      } else if (cleanInputString(textInput.value).length <= 3) {
        score += 1;
        scoreResult.innerText = score;
        scorePoint.style.color = "rgb(256, 256, 256)";
        scorePoint.style.display = "block";
        scoreResult.style.display = "block";
        scoreResult.textContent = `SCORE: ${scoreResult.innerText}`;
        scorePoint.textContent = "+1";
      } else {
        score += 3;
        scoreResult.innerText = score;
        scorePoint.style.color = "rgb(250, 236, 31)"; // jaune
        scorePoint.style.display = "block";
        scoreResult.style.display = "block";
        scoreResult.textContent = `SCORE: ${scoreResult.innerText}`;
        scorePoint.textContent = "+3";
      }
    }

    function gameScore(event) {
      if (score <= -50){
        scoreEnd.style.display = "block";
        scoreEnd.textContent = "Game over";
        checkButton.style.display = "none";
        textInput.style.display = "none";
        document.body.style.background = "#bd2828";
        gameOverAudio.muted = false;
        playAudio(gameOverAudio);
        scoreResult.innerHTML = `<span id="restart-text" class="bold">Restart</span> <br> ${scoreResult.innerText}`;
        restart();
      } else if (score >= 20) {
        scoreEnd.style.display = "block";
        scoreEnd.textContent = "Success!";
        checkButton.style.display = "none";
        textInput.style.display = "none";
        document.body.style.background = "rgb(255, 213, 0)"; //"#ffda05"
        successAudio.muted = false;
        playAudio(successAudio);
        scoreResult.innerHTML = `<span id="restart-text" class="bold">Restart</span> <br> ${scoreResult.innerText}`;
        restart()
      }
    }

    function restart() {
      const restartText = document.getElementById("restart-text");
      restartText.addEventListener("click", () => {
      location.reload()
    })
  }

