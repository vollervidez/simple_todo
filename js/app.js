//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily tasks.

//Create variables here.
var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
var createNewTaskElement = function(taskString) {
    //Creat list item
     var listItem = document.createElement("li");

   //input (checkbox)
    var checkBox = document.createElement("input"); //checkbox
  //label
    var label = document.createElement("label");
  //input (text)
    var editInput = document.createElement("input");//text
  //button.edit
    var editButton = document.createElement("button");
  //button.delete
    var deleteButton = document.createElement("button");

  //Each element, needs modifing
  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  //Each element, needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//Add a new task.
var addTask = function() {
  console.log("Add task...");

   //Creat a new li with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);

  //Append list item to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";

}

//Edit an existing task.
var editTask = function() {
  console.log("Edit task...");
  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");

    //if the class of the parent is .editMode
      if(containsClass) {
      //Switch from .editMode
      //label text become the input's value
        label.innerText = editInput.value;

    } else {

      //Switch to .editMode
      //input value becomes the label's text
        editInput.value = label.innerText;
    }
    //Toggle .editMode on the listItem
      listItem.classList.toggle("editMode");

}

//Delet an existing task.
var deleteTask = function() {
    console.log("delete task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //remove the parent li from the ul
  ul.removeChild(listItem);

}

//Mark a task as complete.
var taskCompleted = function() {
  console.log("task complete...");
    //Append the task li to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

//Mark a task as incomplete.
var taskIncomplete = function() {
  console.log("task incomplete...");
  //Append the task li to the #completed-tasks
  var listItem = this.parentNode;
 incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

    //bind the editTask to edit button
    editButton.onclick = editTask;

    //bind the deleteTask to delete button
    deleteButton.onclick = deleteTask;

    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX request")
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// addButton.onclick = ajaxRequest;

//Cycle over the incompleteTaskHolder ul li's
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to li's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Cycle over the completeTaskHolder ul li's
for(var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to li's children (taskIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
