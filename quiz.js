const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const quizQuestions = [
    {
        type: 'single',
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris'
    },
    {
        type: 'multi',
        question: 'Which of the following are programming languages?',
        options: ['JavaScript', 'HTML', 'CSS', 'Python'],
        answer: ['JavaScript', 'Python']
    },
    {
        type: 'fill',
        question: 'The largest planet in the solar system is _______.',
        answer: 'Jupiter'
    }
];

function buildQuiz() {
    const output = [];

    quizQuestions.forEach((question, index) => {
        const questionAnswers = [];

        switch (question.type) {
            case 'single':
                question.options.forEach((option) => {
                    questionAnswers.push(
                        `<label>
                            <input type="radio" name="question${index}" value="${option}">
                            ${option}
                        </label>`
                    );
                });
                break;

            case 'multi':
                question.options.forEach((option) => {
                    questionAnswers.push(
                        `<label>
                            <input type="checkbox" name="question${index}" value="${option}">
                            ${option}
                        </label>`
                    );
                });
                break;

            case 'fill':
                questionAnswers.push(
                    `<input type="text" name="question${index}" placeholder="Your answer">`
                );
                break;
        }

        output.push(
            `<div class="question">
                <p>${question.question}</p>
                <div class="options">${questionAnswers.join('')}</div>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.question');
    let numCorrect = 0;

    quizQuestions.forEach((question, index) => {
        const answerContainer = answerContainers[index];
        const userAnswer = getUserAnswer(question.type, answerContainer);

        if (checkAnswer(question, userAnswer)) {
            numCorrect++;
            answerContainer.style.color = 'green';
        } else {
            answerContainer.style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `You scored ${numCorrect} out of ${quizQuestions.length}!`;
}

function getUserAnswer(type, container) {
    switch (type) {
        case 'single':
            return container.querySelector(`input[name^="question"]:checked`)?.value || '';
        case 'multi':
            return Array.from(container.querySelectorAll(`input[name^="question"]:checked`)).map(input => input.value);
        case 'fill':
            return container.querySelector(`input[type="text"]`)?.value || '';
    }
}

function checkAnswer(question, userAnswer) {
    if (question.type === 'multi') {
        return (
            userAnswer.length === question.answer.length &&
            userAnswer.every(answer => question.answer.includes(answer))
        );
    } else {
        return userAnswer === question.answer;
    }
}

buildQuiz();

submitButton.addEventListener('click', showResults);