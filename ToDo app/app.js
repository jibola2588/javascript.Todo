
let clear = document.querySelector('.clear');
let dateElement = document.getElementById('date');
let list = document.getElementById('list');
let input = document.getElementById('input');


let check = 'fa-check-circle';
let uncheck = 'fa-circle-thin';
let line_through = 'lineThrough';


let List ,id;


let data = localStorage.getItem("ToDo");
if(data){
    List = JSON.parse(data);
    id = List.length;
      loadList(List);
}else{
List = [];
id = 0;
}

function loadList(array){
       array.forEach(function(item){
           addToDo(item.name,item.id,item.done,item.trash);
    });
};

clear.addEventListener('click',function(){
    localStorage.clear();
    location.reload();
})


let options = {
    weekday:'long',
    month:'short',
    day:'numeric'
}
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-us',options);


function addToDo(toDo,id,done,trash){
    if(trash){ return;}

    let Done = done ? check : uncheck;
    let Line = done ? line_through : '';

    let item = `<li class="item">
             <i class="fa ${Done} co" job="complete" id="${id}"></i>
         <p class="text ${Line}">${toDo}</p>
             <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
         </li>`;
let position = 'beforeend';
list.insertAdjacentHTML(position,item)
}

document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        let toDo = input.value;

        if(toDo){
            addToDo(toDo,id,false,false);
            List.push({
                name:toDo,
                id:id,
                done:false,
                trash:false
            });
           localStorage.setItem("ToDo",JSON.stringify(List));
            id++;
        }
        input.value ='';
    }
});


function completeToDo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);

   List[element.id].done = List[element.id].done ? false : true;
}


function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash = true;
}


list.addEventListener('click',function(event){
    let element = event.target;
    var elementJob = element.attributes.job.value;
    
    if(elementJob == 'complete'){
        completeToDo(element);
    }else if(elementJob == 'delete'){
        removeToDo(element);
    }
  localStorage.setItem("ToDo",JSON.stringify(List));

});
