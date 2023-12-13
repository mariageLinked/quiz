   const quiz = [
  {
    question: "l'age dyalk",
    answers: ["18-24", "24-26", ">26",],
    goodAnswers: [0, 1], // Multiple correct answers (indexes)
  },
  {
    question: "kidayra 3ala9tk m3a din w salat ?",
    answers: ["Motadayna bzaf", "Motadayina chwya ", "Makansslich",],
    goodAnswers: [0, 1], // Multiple correct answers (indexes)
  },
  {
    question: "Chno awal haja kat attirik f ohippa dyalk ?",
    answers: ["niveau wlkhdma dyalo", "l2akhla9 w tafahom", "lmadhar dyalo"],
    goodAnswers: [1], // Multiple correct answers (indexes)
  },
  {
    question: "Style dyal lebss dyalk ?",
    answers: ["lebss 3asri w mzyer", "lbass twil mo7taram" , "foulard" , "hijab char3i"],
    goodAnswers: [1,2,3], // Multiple correct answers (indexes)
  },
  {
    question: "tol dyalk ?",
    answers: ["9el mn 150 (siri abnti tl3bi)", "150-154" , "155-165" , "kter mn 165" ],
    goodAnswers: [2], // Multiple correct answers (indexes)
  },
  {
    question: "Chakhsya dyalk ? ",
    answers: ["Extrovert", "3adi bin w bin" , "intvroert" ],
    goodAnswers: [1,2,3], // Multiple correct answers (indexes)
  },
  {
    question: "kat2amni bli drari wlbnat y9do ykono asdi9a2 ? ",
    answers: ["La", "La 3awtani" ],
    goodAnswers: [0,1], // Multiple correct answers (indexes)
  },
  {
    question: "3ndk asdi9a2 drari wla katdwi m3a drari bzaf ? ",
    answers: ["Ah", "La" ],
    goodAnswers: [1], // Multiple correct answers (indexes)
  },
  {
    question: "chno nsmiw wladna ? ",
    answers: ["knd7ek hadchi nhdro 3lih prive" ],
    goodAnswers: [0], // Multiple correct answers (indexes)
  },
  {
    question: "Ch7al mn relation mdwza f 7yatk ?",
    answers: ["0" , "1-2" , "kter mn 2", "fin ba9a zayda albatala" ],
    goodAnswers: [0,1], // Multiple correct answers (indexes)
  },
  {
    question: "Chno lhaja li darori khass tkon f charik dyalk ?",
    answers: ["Social" , "3ndo L7ya" , "yghir 3lik", "lhtimam" ],
    goodAnswers: [2,3], // Multiple correct answers (indexes)
  },
  {
    question: "Wa akhiran ?",
    answers: ["Barcawya" , "Madridia" , "makntfrjch f kora"],
    goodAnswers: [1,2], // Multiple correct answers (indexes)
  },

  // Add more questions here with multiple correct answers as needed
];
let questionIndex = -1;
const startBtn = document.querySelector(".start-button");
const quizContainer = document.querySelector(".quiz-container");
const indicator = document.querySelector(".indicator");
let answered = false;
let goodAnswers = 0;
let isIndicatorSetuped = false;
let isIndicatorActive = false;

startBtn.addEventListener("click", () => {
  hiddenPage();
  nextQuestion();
});
function hiddenPage() {
  isIndicatorActive = false;
  indicator.classList.add("hidden");
  const page = document.querySelector(".page");
  page.classList.add("hidden");
  setTimeout(() => page.remove(), 500);
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === quiz.length) {
    showFinalPage();
    return;
  }
  const page = document.createElement("div");
  page.className = "page";
  quizContainer.appendChild(page);
  const questionContainer = document.createElement("h4");
  questionContainer.className = "question";
  page.appendChild(questionContainer);
  const answerContainer = document.createElement("div");
  answerContainer.className = "answer-container";
  page.appendChild(answerContainer);
  answered = false;
  questionContainer.textContent = quiz[questionIndex].question;
  quiz[questionIndex].answers.forEach((answer, index) => {
    const element = document.createElement("button");
    element.className = "answer";
    element.textContent = answer;
    element.addEventListener("click", () => {
  if (answered) return;

  const isCorrect = quiz[questionIndex].goodAnswers.includes(index);

  if (isCorrect) {
    element.classList.add("good");
    indicator.classList.add("good");
    goodAnswers++;
  } else {
    element.classList.add("bad");
    indicator.classList.add("bad");
  }

  answered = true;

  setTimeout(() => {
    showNextBtn(page);
  }, 1100);
});




    indicator.className = "indicator hidden";
    answerContainer.appendChild(element);
    indicator.style.setProperty("--height", element.clientHeight);
    setTimeout(() => {
      isIndicatorActive = true;
    }, 500);
    element.addEventListener("mousemove", () => {
      if (answered) return;
      if (!isIndicatorActive || !isIndicatorSetuped) return;
      indicator.className = "indicator";
      const clientRect = element.getBoundingClientRect();
      indicator.style.setProperty("--y", clientRect.y);
      indicator.style.setProperty("--x", clientRect.x);
    });
  });
  const button = document.querySelector(".answer");
  const clientRect = button.getBoundingClientRect();
  indicator.style.setProperty("--y", clientRect.y - clientRect.height * 2);
  console.log(clientRect.y);
  setTimeout(() => {
    if (isIndicatorSetuped) return;
    const button = document.querySelector(".answer");
    const clientRect = button.getBoundingClientRect();
    indicator.style.setProperty("--x", clientRect.x);
    indicator.style.setProperty("--width", clientRect.width);
    setTimeout(() => {
      isIndicatorSetuped = true;
    }, 400);
  }, 500);
}
function showNextBtn(page) {
  const element = document.createElement("button");
  element.className = "next-button";
  element.addEventListener("click", () => {
    hiddenPage();
    nextQuestion();
  });
  element.textContent = "next";
  page.appendChild(element);
}
function showFinalPage() {
  const page = document.createElement("div");
  page.className = "page";
  
  let message = ""; // Initialize an empty message
  let btn = btn2="";

  if (goodAnswers === quiz.length) {
    message = '<h1 class="question">Nja7ti albatala 🎉 </h1>' ;
    btn = '<a href="https://www.facebook.com/profile.php?id=61551605451982" class="facebook-button"> <i class="fa fa-facebook" aria-hidden="true"></i>  Aji nhdro f FB';
    btn2 = '<a href="https://www.instagram.com/itsmemaaario__" class="insta-button"> <i class="fa fa-instagram" aria-hidden="true"></i>  Ola insta';
  } else {

    message = "Raji3i dorossak.";
  }

  page.innerHTML = `
  
    ${message}

    <p class="score">
      Your score is ${goodAnswers}/${quiz.length}
    </p>
    ${btn}
    ${btn2}
  `;

  quizContainer.appendChild(page);
}
