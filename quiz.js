const questions = {
    art: [
        {
            question: 'Кто написал знаменитую картину "Звездная ночь?"',
            answers: ["Леонардо да Винчи", "Винсент ван Гог", "Пабло Пикассо", "Клод Моне"],
            correct: 2,
        },
        {
            question: "Как называется знаменитый балет, поставленный на музыку Чайковского?",
            answers: [
                '"Лебединое озеро"',
                '"Ромео и Джульетта"',
                '"Жизель"',
                '"Щелкунчик"',
            ],
            correct: 1,
        },
        {
            question: 'Кто является автором романа "1984"',
            answers: [
                "Джордж Оруэлл",
                "Рэй Брэдбери",
                "Айн Рэнд",
                "Габриэль Гарсия Маркес",
            ],
            correct: 1,
        },
        {
            question: 'Как зовут знаменитого американского певца и композитора, известного как "Король Рок-н-Ролла"?',
            answers: [
                "Джерри Ли Льюис",
                "Чак Берри",
                "Литл Ричард",
                "Элвис Пресли"
            ],
            correct: 4,
        }
    ],
    programming: [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	}],
    cinema: [
        {
            question: 'Кто режиссер фильма "Криминальное чтиво"?',
            answers: ["Квентин Тарантино", "Мартин Скорсезе", "Стивен Спилберг", "Кристофер Нолан"],
            correct: 1,
        },
        {
            question: "Какой фильм получил Оскар как лучший фильм в 1994 году?",
            answers: [
                '"Список Шиндлера"',
                '"Парк Юрского периода"',
                '"Форрест Гамп"',
                '"Беглец"',
            ],
            correct: 3,
        },
        {
            question: 'Кто сыграл главную роль в фильме "Бойцовский клуб"?',
            answers: [
                "Брэд Питт",
                "Эдвард Нортон",
                "Хелена Бонэм Картер",
                "Все вышеперечисленные",
            ],
            correct: 4,
        },
        {
            question: 'Как называется первый полнометражный анимационный фильм студии Disney?',
            answers: [
                "Золушка",
                "Белоснежка и семь гномов",
                "Спящая красавица",
                "Бэмби"
            ],
            correct: 2,
        }
    ]
};


const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const theme = window.localStorage.getItem('theme');

let score = 0;
let questionIndex = 0;
let yourAnswers = [];

clearPage();
showQuestion();

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
    // Удаление элемента с сообщением "Выберите вариант ответа!"
    let redElement = document.getElementById('red');
    if (redElement) {
        redElement.remove();
    }
}

// function showQuestion(){
// 	let currentQuest = questions[questionIndex]['question'];
// 	let quest = document.createElement('h2');
// 	quest.classList.add('title');
// 	quest.innerHTML = `${currentQuest}`;
// 	headerContainer.prepend(quest);

// 	let currentAnswers = questions[questionIndex]['answers'];
// 	let answ = document.createElement('ul');
// 	answ.classList.add('quiz-list');
// 	answ.setAttribute('id','list')
// 	headerContainer.append(answ);


// 	for(let i = 0; i < 4; i++){
// 		let an = document.createElement('li');
// 		an.innerHTML = `
// 				<label>
// 					<input type="radio" class="answer" name="answer" />
// 					<span>${currentAnswers[i]}</span>
// 				</label>
// 		`
// 		answ.append(an);
// 	}
	
// }

function showQuestion() {
    clearPage();

    if(theme == 'art'){
        if (questionIndex < questions.art.length) {
            let currentQuest = questions.art[questionIndex]['question'];
            let quest = document.createElement('h2');
            quest.classList.add('title');
            quest.innerHTML = `${currentQuest}`;
            headerContainer.prepend(quest);

            let currentAnswers = questions.art[questionIndex]['answers'];
            let answ = document.createElement('ul');
            answ.classList.add('quiz-list');
            answ.setAttribute('id', 'list');
            headerContainer.append(answ);

            for (let i = 0; i < currentAnswers.length; i++) {
                let an = document.createElement('li');
                an.innerHTML = `
                    <label>
                        <input type="radio" class="answer" name="answer" value="${i + 1}" />
                        <span>${currentAnswers[i]}</span>
                    </label>
                `;
                answ.append(an);
            }

            submitBtn.innerHTML = `Следующий вопрос`;
            submitBtn.addEventListener('click', nextQuestion);
        } else {
            clearPage();
            showEnd();
        }
    }else if(theme == 'programming'){
        if (questionIndex < questions.programming.length) {
            let currentQuest = questions.programming[questionIndex]['question'];
            let quest = document.createElement('h2');
            quest.classList.add('title');
            quest.innerHTML = `${currentQuest}`;
            headerContainer.prepend(quest);

            let currentAnswers = questions.programming[questionIndex]['answers'];
            let answ = document.createElement('ul');
            answ.classList.add('quiz-list');
            answ.setAttribute('id', 'list');
            headerContainer.append(answ);

            for (let i = 0; i < currentAnswers.length; i++) {
                let an = document.createElement('li');
                an.innerHTML = `
                    <label>
                        <input type="radio" class="answer" name="answer" value="${i + 1}" />
                        <span>${currentAnswers[i]}</span>
                    </label>
                `;
                answ.append(an);
            }

            submitBtn.innerHTML = `Следующий вопрос`;
            submitBtn.addEventListener('click', nextQuestion);
        } else {
            clearPage();
            showEnd();
        }
    }else if(theme == 'cinema'){
        if (questionIndex < questions.cinema.length) {
            let currentQuest = questions.cinema[questionIndex]['question'];
            let quest = document.createElement('h2');
            quest.classList.add('title');
            quest.innerHTML = `${currentQuest}`;
            headerContainer.prepend(quest);

            let currentAnswers = questions.cinema[questionIndex]['answers'];
            let answ = document.createElement('ul');
            answ.classList.add('quiz-list');
            answ.setAttribute('id', 'list');
            headerContainer.append(answ);

            for (let i = 0; i < currentAnswers.length; i++) {
                let an = document.createElement('li');
                an.innerHTML = `
                    <label>
                        <input type="radio" class="answer" name="answer" value="${i + 1}" />
                        <span>${currentAnswers[i]}</span>
                    </label>
                `;
                answ.append(an);
            }

            submitBtn.innerHTML = `Следующий вопрос`;
            submitBtn.addEventListener('click', nextQuestion);
        } else {
            clearPage();
            showEnd();
        }
    }
}

function nextQuestion() {
    const list = document.getElementById('list');
    const checkedRadio = list.querySelector('input[type="radio"]:checked');

    if(theme == 'art'){
        if (checkedRadio && checkedRadio.value == questions.art[questionIndex]['correct'].toString()) {
            score += 1;
        }  
    }else if(theme == 'programming'){
        if (checkedRadio && checkedRadio.value == questions.programming[questionIndex]['correct'].toString()) {
            score += 1;
        } 
    }else if(theme == 'cinema'){
        if (checkedRadio && checkedRadio.value == questions.cinema[questionIndex]['correct'].toString()) {
            score += 1;
        }      
    }

    if (!checkedRadio) {
        let an = document.createElement('h1');
        let el = document.getElementById('red');
        if (el)
            return;
        an.setAttribute('id', 'red');
        an.innerText = "Выберите вариант ответа!";
        listContainer.append(an);
        return;
    } else {
        let redElement = document.getElementById('red');
        if (redElement) {
            redElement.remove();
        }
    }


    yourAnswers.push(parseInt(checkedRadio.value));
    questionIndex += 1;
    const id = JSON.stringify(questionIndex);
    window.localStorage.setItem("id", id)
    console.log(yourAnswers);
    if (questionIndex === 4) {
        clearPage();
        showEnd();
        return;
    }

    clearPage();
    showQuestion();
    
}

function showEnd() {
    let end = document.createElement('h2');
    end.classList.add('title');
    end.innerHTML = `Викторина Окончена!`;
    headerContainer.prepend(end);

    let see = document.createElement('h2');
    see.innerHTML = `Ваш результат: ${score} правильных ответов из ${questions.art.length}`;
    headerContainer.append(see);

    let your = document.createElement("ul");
    your.classList.add('ullist');
    let themeQuestions = null;
    if(theme == 'art'){
        themeQuestions = questions.art;
    }else if(theme == 'programming'){
        themeQuestions = questions.programming;
    }else if(theme == 'cinema'){
        themeQuestions = questions.cinema;
    }

    for (let i = 0; i < yourAnswers.length; i++) { 
        let yourA = document.createElement("li");
        yourA.classList.add('lilist');
        
        let s = themeQuestions[i]["answers"][yourAnswers[i] - 1]; 
        if (themeQuestions[i].correct == yourAnswers[i]) {
            yourA.classList.add('greenish');
        } else {
            yourA.classList.add('reddish');
        }
        
        yourA.innerHTML = `${s}`;
        your.appendChild(yourA);
        
    }
    headerContainer.appendChild(your);
    
    questionIndex = 0;

    const id = JSON.stringify(questionIndex);
    window.localStorage.setItem("id",id)


    submitBtn.innerHTML = `Сыграть заново`;
    submitBtn.removeEventListener('click', nextQuestion);
    submitBtn.addEventListener('click', again); 
}

function again() {
    score = 0; 
    questionIndex = 0; 
    window.location.reload();    
    clearPage();
    showQuestion(); 
    submitBtn.removeEventListener('click', again);
    submitBtn.addEventListener('click', nextQuestion);
}


// function showRes() {
//     const list = document.getElementById('list');
//     const radioButtons = list.querySelectorAll('input[type="radio"]');
  
//     let correctAnswerFound = false; 
  
//     for (let i = 0; i < radioButtons.length; i++) {
//       const radioButton = radioButtons[i];
//       const label = radioButton.parentNode; 
  
//       if (radioButton.value === questions[questionIndex]['correct'].toString()) {
//         label.classList.add('correct');
//         correctAnswerFound = true; 
//       } else {
//          label.classList.add('wrong');
//       }
  
//       radioButton.disabled = true; 
  
//     }
  
//       submitBtn.removeEventListener('click', showRes);
//       submitBtn.innerHTML = `Следующий вопрос`;
//       submitBtn.addEventListener('click', nextQuestion);
  
  
//     if (!correctAnswerFound) {
//       console.error("Правильный ответ не найден!");
//     }
//   }
  

if (performance.navigation.type === 1) {
    const id = window.localStorage.getItem('id');
    questionIndex = parseInt(id);
    showQuestion();
}

addEventListener("popstate",function(e){
    alert('yeees!');
},false);

  
