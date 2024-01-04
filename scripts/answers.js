(function () {
    const Answer = {
        quiz: null,
        results: null,
        answerTitleElement: null,
        answerOptionsElement: null,
        init() {
            checkUserData();
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');

            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                        return;
                    }
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
            this.showTest();
        },

        showTest() {
            this.answerTitleElement = document.getElementById('title');
            this.answerOptionsElement = document.getElementById('answer-question');

            const url = new URL(location.href);
            const question = this.quiz.questions;
            const testId = url.searchParams.get('id');
            const xhr = new XMLHttpRequest();
            const name = url.searchParams.get('name');
            const lastName = url.searchParams.get('lastName');
            const email = url.searchParams.get('email');
            xhr.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);
            xhr.send();
            this.results = JSON.parse(xhr.responseText);

            document.getElementById('answer-pre-title-one').onclick = () => {
                location.href = 'result.html' + location.search;
            };
            document.getElementById('answer-pre-title-two').innerText = this.quiz.name;

            document.getElementById('answer-return').onclick = () => {
                location.href = 'result.html' + location.search;
            };
            document.getElementById('human').innerHTML = 'Тест выполнил <span>' + name + ' ' + lastName + ', ' + email + '</span>';


            question.forEach((questionObj, i) => {
                const answersQuestions = document.createElement('div');
                answersQuestions.className = 'answer-question-item';

                const answersQuestionsTitle = document.createElement('div');
                answersQuestionsTitle.className = 'answer-question-title';
                const num = i + 1;
                answersQuestionsTitle.innerHTML = `<span>Вопрос ${num}: </span> ${questionObj.question}`;

                const answersOptions = document.createElement('div');
                answersOptions.className = 'answer-question-options';

                questionObj.answers.forEach((answer) => {
                    const answersOption = document.createElement('div');
                    answersOption.className = 'answer-question-option';
                    answersOption.setAttribute('id', answer.id);

                    const circleElement = document.createElement('div');
                    circleElement.className = 'answers-question-circle';

                    const answersQuestionText = document.createElement('div');
                    answersQuestionText.className = 'answers-question-text';
                    answersQuestionText.innerText = answer.answer;

                    answersOptions.appendChild(answersOption);
                    answersOption.appendChild(circleElement);
                    answersOption.appendChild(answersQuestionText);
                    answersQuestions.appendChild(answersQuestionsTitle);
                    answersQuestions.appendChild(answersOptions);
                    this.answerOptionsElement.appendChild(answersQuestions);

                });
            })
            const answersUser = JSON.parse(url.searchParams.get('result'));

            answersUser.forEach((answer, i) => {
                let answerElement = document.getElementById(answer.chosenAnswerId);
                if (this.results[i] === answer.chosenAnswerId) {
                    answerElement.classList.add('correct');
                }
                if (this.results[i] !== answer.chosenAnswerId && answer.chosenAnswerId !== null) {
                    answerElement.classList.add('incorrect');
                }
            });

        },
    }
    Answer.init();
})();

