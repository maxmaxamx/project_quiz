const questions = [
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
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

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

    let currentQuest = questions[questionIndex]['question'];
    let quest = document.createElement('h2');
    quest.classList.add('title');
    quest.innerHTML = `${currentQuest}`;
    headerContainer.prepend(quest);

    let currentAnswers = questions[questionIndex]['answers'];
    let answ = document.createElement('ul');
    answ.classList.add('quiz-list');
    answ.setAttribute('id', 'list');
    headerContainer.append(answ);

    for (let i = 0; i < 4; i++) {
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
}

function nextQuestion() {
    const list = document.getElementById('list');
    const checkedRadio = list.querySelector('input[type="radio"]:checked');
    
    if (checkedRadio && checkedRadio.value == questions[questionIndex]['correct'].toString()) {
        score += 1;
    }
    
    if(!checkedRadio){
        let an = document.createElement('h1');
        let el = document.getElementById('red');
        if(el) 
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


    questionIndex += 1;
    const id = JSON.stringify(questionIndex);
    window.localStorage.setItem("id",id)

    if (questionIndex === questions.length) {
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
    see.innerHTML = `Ваш результат: ${score} правильных ответов из ${questions.length}`;
    headerContainer.append(see);

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
    clearPage();
    showQuestion(); 
    submitBtn.removeEventListener('click', again);
    submitBtn.addEventListener('click', nextQuestion);
}


if (performance.navigation.type === 1) {
    console.log('Страница была обновлена');
    const id = window.localStorage.getItem('id');
    questionIndex = parseInt(id);
    showQuestion();
}

