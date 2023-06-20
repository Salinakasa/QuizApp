// GET
fetch('http://localhost:3000/QuestionList')
.then(response => response.json())
.then(data => {
    loadQuestion(data);
})

const quizContainer = document.getElementById("containerList");
function loadQuestion(quizData) {
    for (let i of quizData) {
        let div = document.createElement("div");
        div.classList.add("container-ques");
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.id+1 + ". " + i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
        <div><input type="radio" value="${i.options[0]}" id="${i.options[0]}" name="options${i.id}"><label for="${i.options[0]}">${i.options[0]}</label></div>
        <div><input type="radio" value="${i.options[1]}" id="${i.options[1]}" name="options${i.id}"><label for="${i.options[1]}">${i.options[1]}</label></div>
        <div><input type="radio" value="${i.options[2]}" id="${i.options[2]}" name="options${i.id}"><label for="${i.options[2]}">${i.options[2]}</label></div>
        <div><input type="radio" value="${i.options[3]}" id="${i.options[3]}" name="options${i.id}"><label for="${i.options[3]}">${i.options[3]}</label></div>
    `;
        quizContainer.appendChild(div);
    }

    document.getElementById("submitAns").addEventListener("click", function() {
        let correctAns = 0;
        for (let i = 0; i < quizData.length; i++) {
            let question = quizData[i];
            if(document.querySelector('input[name="options' + question.id + '"]:checked')) {
                let selectedOption = document.querySelector('input[name="options' + question.id + '"]:checked').value;
                if(selectedOption && selectedOption === question.correct) {
                    correctAns++;
                }
            }
            else {
                alert("Please select answer for question " + parseInt(question.id+1));
                return;
            }
        }
        quizContainer.innerHTML = "Your Score is: " + correctAns+ "/"+ quizData.length;
        submitAns.remove();
      });
}


document.getElementById("gotoQuesform").addEventListener("click", function() {
    quizContainer.innerHTML = `
        <label class="block mb-2">Add the question</label>
        <input type="text" id="addedQues" placeholder="Question..." class="rounded-lg px-3 py-2 w-full">
        <br/>
        <br/>
        <label class="block mb-2">Add the answers</label>
        <input type="text" id="addedOpt1" placeholder="Answer1..." class="rounded-lg px-3 py-2 w-full mb-2 block">
        <input type="text" id="addedOpt2" placeholder="Answer2..." class="rounded-lg px-3 py-2 w-full mb-2 block">
        <input type="text" id="addedOpt3" placeholder="Answer3..." class="rounded-lg px-3 py-2 w-full mb-2 block">
        <input type="text" id="addedOpt4" placeholder="Answer4..." class="rounded-lg px-3 py-2 w-full mb-2 block">
        <br/>
        <br/>
        <label class="block mb-2">Add the correct answer</label>
        <input type="text" id="correctOpt" placeholder="Correct answer" class="rounded-lg px-3 py-2 w-full mb-2 block">
    `;
    addQues.classList.remove("hidden");
    gotoQuesform.remove();
    submitAns.remove();
});

function postReq(data) {
    fetch("http://localhost:3000/QuestionList", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        location.reload();
    })
}

document.getElementById("addQues").addEventListener("click", function() {
    if(addedQues.value && addedOpt1.value && addedOpt2.value && correctOpt.value && addedOpt3.value && addedOpt4.value) {
        let correctAns = document.getElementById("correctOpt").value;
        let AnsList = [`${document.getElementById("addedOpt1").value}`,`${document.getElementById("addedOpt2").value}`,`${document.getElementById("addedOpt3").value}`,`${document.getElementById("addedOpt4").value}`];
        checkMatch(correctAns, AnsList);
    }
    else {
        alert("Please fill in the question, options and correct option");
    }
});

function checkMatch(inputValue, valueList) {
    if (valueList.includes(inputValue)) {
        postReq({"question": `${document.getElementById("addedQues").value}`, "options": [`${document.getElementById("addedOpt1").value}`,`${document.getElementById("addedOpt2").value}`,`${document.getElementById("addedOpt3").value}`,`${document.getElementById("addedOpt4").value}`], "correct": `${document.getElementById("correctOpt").value}`});
    } else {
        alert("Please fill the correct answer matching atleast one of the options");
    }
}