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

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
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
    // Сохраняем выбранный ответ перед очисткой страницы
    let selectedAnswer = null;
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
    if (checkedRadio) {
        selectedAnswer = checkedRadio.value; // Сохраняем значение выбранного radio button
    }

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

        // Восстанавливаем выбранный ответ
        if (selectedAnswer && selectedAnswer == (i + 1)) {
            an.querySelector('input[type="radio"]').checked = true;
        }
    }

	console.log(checkedRadio);
}

function nextQuestion(){
	questionIndex +=1;
	const list = document.getElementById('list')
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	console.log(checkedRadio);
	clearPage();
	showQuestion();
}


