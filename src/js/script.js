//Creates Variables
//Times and Labels for the entire pomodoro sequence
const MINUTES = [25, 5, 25, 5, 25, 5, 25, 20];
const MODE = ["Focus", "Break", "Focus", "Break", "Focus", "Break", "Focus", "Extended Break"];

//Starting point for timer
let i = 0;
let time = MINUTES[0] * 60;

//Brings in elements from html and stores them to use later
const display = document.getElementById('displayTimer');
const start = document.getElementById('startSession');
const end = document.getElementById('endSession');
const mode = document.getElementById('displayMode');

//Variable to hold the id of setInterval 
let clear;

//Constant variables for the tasks feature
const task_text_box = document.getElementById('textBox');
const add_button = document.getElementById('addButton');
const tasks_output = document.getElementById('displayText');

//Changes the text of the html 
display.innerHTML = `${MINUTES[0]}:00`;
mode.innerHTML = `${MODE[0]}`;

//When the 'Start Session' button is pressed, we begin the timer
start.addEventListener('click', function(){
    task_text_box.style.display = 'none';
    add_button.style.display = 'none';
    start.style.display = 'none';
    end.style.display = 'inline';
    clear = setInterval(updateTimer, 1000);
});

//When the 'End Session' button is pressed, we reset the html elements and the timer
end.addEventListener('click', function(){
    task_text_box.style.display = 'inline';
    add_button.style.display = 'inline';
    start.style.display = 'inline';
    end.style.display = 'none';
    clearInterval(clear);
    i = 0;
    display.innerHTML = `${MINUTES[0]}:00`;
    mode.innerHTML = `${MODE[0]}`;
    time = MINUTES[0] * 60;
})

//Updates the timer so that the correct time is displayed. Also updates to the next part of the sequence when the timer is up
function updateTimer(){
    if(time == -1){
        alert(`${MODE[i]} is over!`);
        updateMode();
    }

    let minutes = Math.floor( time / 60);
    let seconds = time % 60;

    seconds = (seconds < 10)? ('0' + seconds): seconds;

    display.innerHTML = `${minutes}:${seconds}`;

    time--;
}

//Updates the sequence to the next part and sets the time accordingly
function updateMode(){
    i++;
    i = (i % 8 == 0)? 0:i;
    
    if(i == 0){
        alert("congratulation you finished one entire session");
    }

    display.innerHTML = `${MINUTES[i]}:00`;
    mode.innerHTML = `${MODE[i]}`;
    time = MINUTES[i] * 60;
}

//Code for Tasks

add_button.addEventListener('click',function(){
    var paragraph = document.createElement('p');
    paragraph.innerHTML = task_text_box.value;
    tasks_output.appendChild(paragraph);
    task_text_box.value = "";

    paragraph.addEventListener('click',function(){
        paragraph.style.textDecoration = "line-through";
    });

    paragraph.addEventListener('dblclick',function(){
        tasks_output.removeChild(paragraph);
    });
})