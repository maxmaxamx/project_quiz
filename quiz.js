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
            correct: 1,
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



function showQuestion() {
    clearPage();

    let themeQuestions;
    if (theme === 'art') {
        themeQuestions = questions.art;
    } else if (theme === 'programming') {
        themeQuestions = questions.programming;
    } else if (theme === 'cinema') {
        themeQuestions = questions.cinema;
    }

    if (questionIndex < themeQuestions.length) {
        const currentQuest = themeQuestions[questionIndex].question;
        const currentAnswers = themeQuestions[questionIndex].answers;

        const quest = document.createElement('h2');
        quest.classList.add('title');
        quest.innerHTML = `${currentQuest}`;
        headerContainer.prepend(quest);

        const answ = document.createElement('ul');
        answ.classList.add('quiz-list');
        answ.setAttribute('id', 'list');
        headerContainer.append(answ);

        // Добавляем варианты ответов
        for (let i = 0; i < currentAnswers.length; i++) {
            const an = document.createElement('li');
            an.innerHTML = `
                <label>
                    <input type="radio" name="answer" value="${i + 1}" />
                    ${currentAnswers[i]}
                </label>
            `;
            answ.append(an);
        }

        // Настраиваем кнопку "Следующий вопрос"
        submitBtn.innerHTML = `Показать результаты`;
        submitBtn.removeEventListener('click', nextQuestion); // Удаляем предыдущий обработчик
        submitBtn.addEventListener('click', showRes);
    } else {
        clearPage();
        showEnd();
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
    clearPage();
    clearInterval(intervalId);
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('timee'); // Удаляем сохранённое время при закрытии страницы
    });  
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


function showRes() {
    const list = document.getElementById('list');
    const radioButtons = list.querySelectorAll('input[type="radio"]');
    const checkedRadio = list.querySelector('input[type="radio"]:checked');

    let themeQuestions;

    if (theme === 'art') {
        themeQuestions = questions.art;
    } else if (theme === 'programming') {
        themeQuestions = questions.programming;
    } else if (theme === 'cinema') {
        themeQuestions = questions.cinema;
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

    let correctAnswerFound = false;
  
    for (let i = 0; i < radioButtons.length; i++) {
      const radioButton = radioButtons[i];
      const label = radioButton.parentNode; 
  
      if (radioButton.value === themeQuestions[questionIndex]['correct'].toString()) {
        label.classList.add('greenish');
        correctAnswerFound = true; 
      } else {
         label.classList.add('reddish');
      }
  
      radioButton.disabled = true; 
  
    }
  
      submitBtn.removeEventListener('click', showRes);
      submitBtn.innerHTML = `Следующий вопрос`;
      submitBtn.addEventListener('click', nextQuestion);
  
  
    if (!correctAnswerFound) {
      console.error("Правильный ответ не найден!");
    }
  }




  let minutes = 0; // Минуты
  let seconds = 30; // Секунды
  const timerElement = document.getElementById('timer');
  
  // Проверяем, есть ли сохранённое время в localStorage
  const savedTime = localStorage.getItem('timee');
  if (savedTime) {
      const [savedMinutes, savedSeconds] = savedTime.split(':').map(Number);
      minutes = savedMinutes;
      seconds = savedSeconds;
  }
  
  function updateTimer() {
      if (seconds === 0 && minutes === 0) {
          clearInterval(intervalId);
          TimeOut(); // Вызываем функцию окончания времени
      } else if (seconds === 0) {
          minutes--;
          seconds = 59;
      } else {
          seconds--;
      }
  
      // Сохраняем текущее время в localStorage
      const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      localStorage.setItem('timee', time);
  
      // Обновляем отображение таймера на странице
      timerElement.textContent = time;
  }
  
  // Запускаем таймер
  const intervalId = setInterval(updateTimer, 1000);
  
  // Функция для обработки окончания времени
  function TimeOut() {
      clearPage();
      listContainer.innerHTML = `
          <h1 class="red">ВРЕМЯ ВЫШЛО</h1>
      `;
      submitBtn.innerText = 'show'
      submitBtn.removeEventListener('click', nextQuestion); // Удаляем обработчик
      submitBtn.addEventListener('click', showEnd);
  }
  
  // Очистка состояния таймера при завершении или перезагрузке игры
  