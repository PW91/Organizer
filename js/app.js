"use strict";

document.addEventListener("DOMContentLoaded", function() {
    
    var myAddTaskBtn = document.querySelector("#organizer-add-task-button"),
        myRemoveFinishedBtn = document.querySelector("#organizer-remove-finished-tasks-button"), 
        myAllTabs = document.querySelectorAll(".note-trapezoid"),
        myAllNotes = document.querySelectorAll(".note"),   
        myAllTaskLists = document.querySelectorAll(".note-content-task-list"),
        myMainTaskArray = [[],[],[]];
    
// EVENT LISTENERS:

    // ADD TASK BUTTON:
    myAddTaskBtn.addEventListener("click", function () {
        myMainTaskArray = addTaskButton(myMainTaskArray);
    })
    
    // REMOVE ALL FINISHED TASKS BUTTON:
    myRemoveFinishedBtn.addEventListener("click", function () {
        myMainTaskArray = removeFinishedButton(myMainTaskArray);
    })
    
    // TABS:
    for (var i = 0; i < myAllTabs.length; i++) {
        myAllTabs[i].addEventListener("click", function() {
            removeSelectedClass();        
            this.parentElement.classList.add("selected"); 
        })
    }

// FUNCTION DEFINITIONS:  

    // ADD TASK BUTTON FUNCTION:

    function addTaskButton(myMainTaskArray) {

        event.preventDefault();

        var myTaskInput = document.querySelector("#organizer-task-input"),
            myTaskInputValue = myTaskInput.value,
            myTaskPriority = document.querySelector("#organizer-priority-input"),
            myTaskPriorityValue = parseInt(myTaskPriority.value),
            myTaskCategory = document.querySelector("#organizer-category-input"),
            myTaskCategoryValue = myTaskCategory.value.toLowerCase(),
            arrayIndex;

        myTaskInput.value = "";
        myTaskInput.setAttribute("placeholder", "Place your task here");
        myTaskPriority.value = "none";
        myTaskCategory.value = "none";

        switch (myTaskCategoryValue) {
            case "home":
                arrayIndex = 0;
                break;
            case "work":
                arrayIndex = 1;
                break;
            case "other":
                arrayIndex = 2;
                break;
        }

        if (myTaskInputValue.length > 0 && myTaskInputValue.length < 500 && !isNaN(myTaskPriorityValue) && myTaskCategoryValue !== "none") {
            var myTask = document.createElement("li"),
                myTaskHeading = document.createElement("h5"),
                myTaskPriorityField = document.createElement("h6"),
                myDeleteBtn = document.createElement("button"),
                myCompleteBtn = document.createElement("button");

            myDeleteBtn.innerHTML = "Delete";
            myDeleteBtn.dataset.category = arrayIndex;
            myCompleteBtn.innerHTML = "Complete";
            myTaskPriorityField.innerHTML = "Priority: " + myTaskPriorityValue;

            myTask.appendChild(myTaskHeading);
            myTask.appendChild(myTaskPriorityField);
            myTask.appendChild(myDeleteBtn);
            myTask.appendChild(myCompleteBtn);
            myTask.setAttribute("priority-value", myTaskPriorityValue);

            myTaskHeading.innerHTML = myTaskInputValue;

            myMainTaskArray = sorting(myMainTaskArray, arrayIndex, myTask, myTaskPriorityValue);

            for (var i=0; i< myMainTaskArray[arrayIndex].length; i++) {
                myAllTaskLists[arrayIndex].appendChild(myMainTaskArray[arrayIndex][i]);
            }
            
            removeSelectedClass();

            myAllNotes[arrayIndex].classList.add("selected");  

            counter();

            myCompleteBtn.addEventListener("click", completeButton);
            myDeleteBtn.addEventListener("click", deleteButton);

            return myMainTaskArray; 

        } else if (myTaskInputValue.length >= 500) {
            myTaskInput.setAttribute("placeholder", "Your task is too long!");
            return myMainTaskArray;
        } else {
            myTaskInput.setAttribute("placeholder", "Please fill all the fields!");
            return myMainTaskArray;
        }
    }

    // COMPLETE BUTTON FUNCTION:

    function completeButton() {
        this.parentElement.classList.toggle("completed");
        if (this.innerHTML === "Complete") {
            this.innerHTML = "Redo";
        } else {
            this.innerHTML = "Complete";
        }
        counter();
    }

    // TASK COUNTER FUNCTION:   

    function counter() {
        var myCounter = document.querySelector(".organizer-counter"),
            myNotesContainer = document.querySelector(".notes-container"),
            myNotCompletedTasksNumber = myNotesContainer.querySelectorAll("li:not(.completed)").length;
        
        myCounter.innerHTML = myNotCompletedTasksNumber;    
    }

    // REMOVE ALL FINISHED TASKS BUTTON FUNCTION:

    function removeFinishedButton(myMainTaskArray) {
        event.preventDefault();
        
        var myCompletedTasks = document.querySelectorAll(".completed"),
            myCompletedTasksRemovedArray = [[],[],[]];

        for (var i = 0; i < myCompletedTasks.length; i++) {
            myCompletedTasks[i].parentElement.removeChild(myCompletedTasks[i]);  
        };

        for (var i = 0; i < myMainTaskArray.length; i++) {
            for (var j = 0; j<myMainTaskArray[i].length; j++) {
                if(!(myMainTaskArray[i][j].classList.contains("completed"))) {  
                    myCompletedTasksRemovedArray[i].push(myMainTaskArray[i][j]);
                }
            }
        }
        myMainTaskArray = myCompletedTasksRemovedArray;
        return myMainTaskArray;
    }   

    // SORTING FUNCTION:

    function sorting (myMainTaskArray, arrayIndex, myTask, myTaskPriorityValue) {
        if (myMainTaskArray[arrayIndex].length === 0) {
            myMainTaskArray[arrayIndex].push(myTask);
            return myMainTaskArray;
        } else {
            for (var i = 0; i < myMainTaskArray[arrayIndex].length; i++) {
                if (myTaskPriorityValue > parseInt(myMainTaskArray[arrayIndex][i].getAttribute("priority-value"))) {
                    myMainTaskArray[arrayIndex].splice(i, 0, myTask);
                    return myMainTaskArray;
                }
            }
        myMainTaskArray[arrayIndex].push(myTask); 
        return myMainTaskArray;
        }
    }

    // DELETE BUTTON FUNCTION:

    function deleteButton() {
        var arrayIndex = this.dataset.category,
            indexOfDeleted = myMainTaskArray[arrayIndex].indexOf(this.parentElement);

        myMainTaskArray[arrayIndex].splice(indexOfDeleted, 1);
        this.parentElement.parentElement.removeChild(this.parentElement);
        counter();
    }
    
    // REMOVE SELECTED CLASS FUNCTION:
    
    function removeSelectedClass() {
        for (var i=0; i < myAllNotes.length; i++) {
            myAllNotes[i].classList.remove("selected");  
        } 
    }
})