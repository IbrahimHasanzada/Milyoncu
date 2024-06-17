let api = [];
fetch('https://raw.githubusercontent.com/zahid022/json/main/milyoncu.json')
  .then(res => res.json())
  .then(data => {
    api = data;
    callData();
  });

const title = document.getElementById("title");
const suallar = document.getElementById("suallar");
const questionsTitle = document.getElementById("questionsTitle");
const dogru = document.getElementById("dogru");
const sehv = document.getElementById("sehv");
const reload = document.getElementById("reload");

let random = 84;
let isAnswered = false

dogru.style.display = 'none';
sehv.style.display = 'none';

function callData() {
  if (api.sual && api.sual.length > 0) {
    displayQuestion(api.sual[0]);
  }

  api.sual.forEach((item, i) => {
    suallar.innerHTML = '';
    questionsTitle.innerHTML = item.s

    item.c.forEach((elem, j) => {
      suallar.innerHTML += `
        <ul class="w-full text-center">
          <li id="a${j}" onclick="clickQues(${j})" class="w-[100%] my-3 py-2 text-xl rounded-full p-3 bg-blue-700 border-2">${elem}</li>
        </ul>
      `
    })
  })
}

let trueQues = []
let falseQues = []
let say = document.getElementById("say");
let x = 1;

function clickQues(arg1) {
  if (isAnswered) return; 

  isAnswered = true;
  x++;
  say.innerHTML = x;

  const li = document.getElementById(`a${arg1}`);

 
  if (arg1 == api.sual[random].d) {
    trueQues.push(arg1);
    li.style.backgroundColor = 'green';
  } else {
    falseQues.push(arg1);
    li.style.backgroundColor = 'red';
  }

  setTimeout(() => {
    if (x < 10) {
      random = rnd(0, 84);
      const randomQuestion = api.sual[random];
      displayQuestion(randomQuestion);
    } else {
        reload.classList.remove("hidden")
      dogru.style.display = 'block';
      sehv.style.display = 'block';
      dogru.innerHTML = 'Dogru cavablarin sayi:' + trueQues.length;
      sehv.innerHTML = 'Yanlis cavablarin sayi:' + falseQues.length;
      say.innerHTML = '10';
      questionsTitle.innerHTML = `Sizin Neticeleriniz`;
      suallar.innerHTML = '';
    }
    isAnswered = false; 
  }, 800);
}

function displayQuestion(ques) {
  questionsTitle.innerHTML = ques.s;
  suallar.innerHTML = '';

  ques.c.forEach((elem, i) => {
    suallar.innerHTML += `
      <ul class="w-[100%] text-center">
        <li id="a${i}" onclick="clickQues(${i})" class="w-[100%] my-3 py-2 text-xl rounded-full p-3 bg-blue-700 border-2">${elem}</li>
      </ul>
    `;
  });
}

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
