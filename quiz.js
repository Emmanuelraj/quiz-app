import {quizData} from "./data.js";

let N = quizData.length;
let currentIndex = -1;
const outputArr =[];
const baselabels = 'abcdefghijklmnopqrstuvwxyz'; // Alphabet for labels
let correctAns = 0;
let result =false;



function init(){
    
    currentIndex++;
    const headerEl = document.querySelector("h1");
    const question = quizData[currentIndex].question;
    headerEl.innerHTML = question;
    const choices = quizData[currentIndex];
    const choiceArr =[];
    // iterate the JSONArray
    for(let key in choices)
    {
        if(`${key}` !== "correct" && `${key}` !== "question" ){
           // console.log(`${key}: ${choices[key]}`); printing key and values
            choiceArr.push(`${choices[key]}`);
        }
    }
    const divChoiceEl = document.getElementById("quiz-container");
    // Build the HTML for the choices
    let choiceHtml ='';
    choiceArr.forEach((choice, index)=>{
       choiceHtml +=`<div>
       <input type="radio" name="quiz-option" id="${index}" value="${choice}">
       <label for="option${index}">${choice}</label>
       </div>`;
    })
    divChoiceEl.innerHTML = choiceHtml;

    // Add an event listener to the container to capture the clicked option
    divChoiceEl.addEventListener('change', function(event)
    {
        //console.log(event.target.id);
    })
}



function submitFn(){  
    const buttonEl = document.querySelector("button"); 
   const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
   if(!selectedOption)
   {
    alert('Please select an option before submitting.');
   }else {
    const charAtZero = baselabels[selectedOption.id];
    if(result===false){
        outputArr.push(charAtZero);
    }
      
    //console.log(quizData[currentIndex]+" : "+charAtZero);
     //console.log("currentIndex"+currentIndex) 
     if(quizData.length-1===currentIndex && result===false){
             buttonEl.textContent = "Finish";
             console.log(outputArr) 
             result = true;          
         }
     if(currentIndex<quizData.length-1){    
         init();
     }
     if(buttonEl.textContent === "Finish"){
        console.log("finish");
        giveResults();
        const headerEl = document.querySelector("h1");
        headerEl.innerHTML = "You answered " + correctAns + "/" + N + " correctly";
        const divChoiceEl = document.getElementById("quiz-container");
        divChoiceEl.innerHTML ="";
        buttonEl.textContent = "Reload";
        
        buttonEl.addEventListener('click', function(event){
            // Reload the page
            window.location.reload();
        })
        
     }

   
     
   }    
}


function giveResults()
{

    for(let idx in quizData)
    {
        console.log(quizData[idx].correct+":"+outputArr[idx])
      if(quizData[idx].correct === outputArr[idx]){
           correctAns++;
      } 
    }
    console.log("correct"+correctAns)
}

window.onload = init;
window.submitFn = submitFn; 