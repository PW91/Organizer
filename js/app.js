/**
 * Created by Jacek on 2015-12-16.
 */

document.addEventListener("DOMContentLoaded", function() {
    
    var myAddTaskBtn = document.querySelector("#addTaskButton"),
        myRemoveFinishedBtn = document.querySelector("#removeFinishedTasksButton"), 
        myTaskList = document.querySelector("#taskList"),
        myCounter = document.querySelector("#counter"),
        myTaskSortedArray = [],
        i;

    myAddTaskBtn.addEventListener("click", addTaskButton);
    myRemoveFinishedBtn.addEventListener("click", removeFinishedButton);
  
//----- DEFINICJE FUNKCJI -----    

// 1. Funkcja przycisku "ADD TASK":   
    
    function addTaskButton() {
        var myTaskInput = document.querySelector("#taskInput"),
            myTaskInputValue = myTaskInput.value,
            myTaskPriority = document.querySelector("#priorityInput"),
            myTaskPriorityValue = parseInt(myTaskPriority.value);
        
        myTaskInput.value = "";
        myTaskInput.setAttribute("placeholder", "Place your task here");
        myTaskPriority.value = "";
        myTaskPriority.setAttribute("placeholder", "Give it priority (0-10)");
        
        if (myTaskInputValue.length > 5 && myTaskInputValue.length < 100 && myTaskPriorityValue >= 0 && myTaskPriorityValue <= 10) {
            var myTask = document.createElement("li"),
                myTaskHeading = document.createElement("h1"),
                myTaskPriorityField = document.createElement("h6");
                myDeleteBtn = document.createElement("button"),
                myCompleteBtn = document.createElement("button");
            
            myDeleteBtn.innerHTML = "Delete";
            myCompleteBtn.innerHTML = "Complete";
            myTaskPriorityField.innerHTML = "Priority: " + myTaskPriorityValue;
    
            myTask.appendChild(myTaskHeading);
            myTask.appendChild(myTaskPriorityField);
            myTask.appendChild(myDeleteBtn);
            myTask.appendChild(myCompleteBtn);
            myTask.setAttribute("priority-value", myTaskPriorityValue);
        
            myTaskHeading.innerHTML = myTaskInputValue;
            
            sortByPriority(myTask, myTaskPriorityValue);
            
            for (i = 0; i < myTaskSortedArray.length; i++) {
                myTaskList.appendChild(myTaskSortedArray[i]);  
            };
            
            myCompleteBtn.addEventListener("click", completeButton);
            myDeleteBtn.addEventListener("click", deleteButton);
            counter();
            
        } else if (myTaskInputValue.length > 5 && myTaskInputValue.length < 100) {      
            myTaskInput.setAttribute("placeholder", "Look below!");
            myTaskPriority.setAttribute("placeholder", "Wrong priority's value!");
        } else {
            myTaskInput.setAttribute("placeholder", "Wrong task's length!");
            myTaskPriority.setAttribute("placeholder", "Look above!");
        };  
    };

// 2. Funkcja przycisku "REMOVE FINISHED TASKS":
       
    function removeFinishedButton() {
        var myCompletedTasks = myTaskList.querySelectorAll(".completed"),
            myCompletedTasksRemovedArray = [];
        
        for (i = 0; i < myCompletedTasks.length; i++) {
            myCompletedTasks[i].parentElement.removeChild(myCompletedTasks[i]);  
        };
        
        for (i = 0; i < myTaskSortedArray.length; i++) {
            if(!(myTaskSortedArray[i].classList.contains("completed"))) {
                myCompletedTasksRemovedArray.push(myTaskSortedArray[i]);
            };  
        };
        
        myTaskSortedArray = myCompletedTasksRemovedArray;
        return(myTaskSortedArray);
    };
     
// 3. Funkcja przycisku "COMPLETE":

    function completeButton() {
        this.parentElement.classList.toggle("completed");
        counter();
    };
    
// 4. Funkcja przycisku "DELETE":
    
    function deleteButton() {
        var indexOfDeleted = myTaskSortedArray.indexOf(this.parentElement);
        myTaskSortedArray.splice(indexOfDeleted, 1);
        this.parentElement.parentElement.removeChild(this.parentElement);
                
        counter();
        return myTaskSortedArray;
    };
    
// 5. Funkcja licznika zadań niewykonanych:

    function counter() {
        var myNotCompletedTasksNumber = myTaskList.querySelectorAll("li:not(.completed)").length;
        myCounter.innerHTML = myNotCompletedTasksNumber;    
    };

// 6. Funkcja sortowania zadań po priorytetach:

    function sortByPriority(myTask, myTaskPriorityValue) {
        if (myTaskSortedArray.length === 0) {
            myTaskSortedArray.push(myTask);
            return myTaskSortedArray;
        } else {
            for (i = 0; i < myTaskSortedArray.length; i++) {
                if (myTaskPriorityValue > parseInt(myTaskSortedArray[i].getAttribute("priority-value"))) {
                    myTaskSortedArray.splice(i, 0, myTask);
                    return myTaskSortedArray;
                };
            };
            myTaskSortedArray.push(myTask);
            return myTaskSortedArray;
        };
    };
});