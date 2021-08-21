// select elements 
const clear = document.querySelector(".clear");
const dataElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.getElementById("add_btn")

// classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST , id ;

// get item from local storage

let data = localStorage.getItem("TODO");
// clear
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

// check data not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one cause elements are already there in the list
    loadList(LIST); //load list
}else{

    LIST =[];
    id=0

}

// load items to the ui
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);  //loading previous saved data

    })
}






// show date 

const option = {weekday:"short", month:"short", day:"numeric"}

const today = new Date();
dataElement.innerHTML = today.toLocaleDateString("en-US", option);

// add to do function

function addToDo(toDo, id, done, trash){
    if(trash){
        return;
    }
    const DONE = done ? CHECK:UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">
                        ${toDo}
                    </p>
                    <i class="fa fa-trash-o de" job="delete" id="0"></i>
                </li>
    `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);


}

// add  an item tp list 

add.addEventListener("click", function(e){
   
        const toDo = input.value;

        // if the input is not empty
        if (toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash:false
            });
            
            // get item from local storage(must be added where array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++
        }
        input.value ="";
    
})

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);

    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false:true;



}

// remove todo 

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


// target the item created dynimically

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element LIST
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete"){
        completeToDo(element);
    }else if (elementJob == "delete"){
        removeToDo(element);
    }
    
    // get item from local storage(must be added where array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST))

})
// console.log(localStorage.getItem("TODO"));

// get random quotes

fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(data => {
    // console.log(`${data.content} —${data.author}`)
    document.getElementById("quote").innerHTML =data.content
  })
  

