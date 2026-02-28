const API_KEY = "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"

async function generateQuiz(){

let notes = document.getElementById("notesInput").value

if(notes === ""){
alert("Paste notes first")
return
}

document.getElementById("loading").innerText = "Generating quiz with AI..."

let response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + API_KEY
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"You generate quiz questions from study notes."
},
{
role:"user",
content:`Create 5 multiple choice questions from these notes. 
Return JSON format like:
[
{question:"",options:["","","",""],answer:0}
]

Notes:
${notes}`
}
]

})

})

let data = await response.json()

let text = data.choices[0].message.content

let quiz = JSON.parse(text)

renderQuiz(quiz)

}

function renderQuiz(quiz){

let form = document.getElementById("quizForm")

form.innerHTML=""

quiz.forEach((q,i)=>{

form.innerHTML += `

<div class="quizCard">

<p><b>${i+1}. ${q.question}</b></p>

<label>
<input type="radio" name="q${i}" value="0"> ${q.options[0]}
</label><br>

<label>
<input type="radio" name="q${i}" value="1"> ${q.options[1]}
</label><br>

<label>
<input type="radio" name="q${i}" value="2"> ${q.options[2]}
</label><br>

<label>
<input type="radio" name="q${i}" value="3"> ${q.options[3]}
</label>

</div>

`

})

window.currentQuiz = quiz

document.getElementById("submitBtn").style.display="block"

document.getElementById("loading").innerText=""

}

function calculateScore(){

let score = 0

currentQuiz.forEach((q,i)=>{

let selected =
document.querySelector(`input[name="q${i}"]:checked`)

if(selected && parseInt(selected.value) === q.answer){
score++
}

})

document.getElementById("result").innerText =
`Score: ${score}/${currentQuiz.length}`

}
