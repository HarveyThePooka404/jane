//working on her mind 

let jane = {};

//Loading local JSON
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("./mind.json", function (text) {
    var data = JSON.parse(text);
    jane.mind = data;

});


// submit on enter

document.querySelector("#theInput").addEventListener("keydown", function (e) {
    if (e.which == 13 && !e.shiftKey) {
        e.preventDefault();
        addUsertext(e);
    }
});

// sets up the users input and bot response
const input = document.querySelector("#theInput");
const chatbot = document.querySelector(".chatbot");
const box = document.querySelector(".conversationwrapper");
const text = document.querySelector(".conversationText");

input.addEventListener("change", addUsertext);

function addUsertext(e) {
    let i = e.target.value;
    let typed = document.createElement("p");
    typed.innerHTML = i;
    typed.classList.add("userInput");
    text.appendChild(typed);

    input.value = "";

    let caseRemoved = i.toLowerCase();
    
    botAnswering(caseRemoved);
}


function botAnswering(userSaid) {

    let j = findAnswer(userSaid);

    if (typeof j == "undefined") {
        j = "I am not sure what you mean";
    }

    let botAnswer = document.createElement("p");
    botAnswer.innerHTML = j;
    botAnswer.classList.add("chatbot");
    text.appendChild(botAnswer);
    botAnswer.scrollIntoView();
}

//NOTE FOR JSON STRUCTURE: 
// the first sentence in the array spoken MUST BE the key of the answers
// For example: greetings [first in the spoken.greetings] is the same as jane.mind.answers.GREETINGS


function findAnswer(userSaid) {

    let userString = userSaid;

    for (let keys of Object.entries(jane.mind.spoken)) {
        for (let array of Object.values(keys)[1]) {
            if (array.includes(userString)) {

                console.log(keys);

                // copy paste from here for "brain"
                for (let type of Object.entries(jane.mind.answers)) {
                    if (type[0] == keys[0]) {

                        let randomNumber = Math.floor(Math.random() * type[1].length);
                        let stringAnswer = type[1][randomNumber];

                        return stringAnswer;
                    }
                }
            }
        }
    }
}

//previous version for exact match was 
/* for (let value of Object.values(jane.mind.spoken)) */