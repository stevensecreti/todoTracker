'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        document.getElementById("add-item-button").style.visibility = "visible";
        document.getElementById("delete-list-button").style.visibility = "visible";
        document.getElementById("close-list-button").style.visibility = "visible";
        
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // GET RID OF ALL THE ITEMS
        this.clearItemsList();
        
        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item'>"
                                + "<div class='task-col' id = 'task-col-" + listItem.id + "'>" + listItem.description + "</div>"
                                + "<input class='input' type = 'text' id = 'inputTask-col-" + listItem.id + "'></input>"
                                + "<div class='due-date-col' id = 'due-date-col-" + listItem.id + "' >" + listItem.dueDate + "</div>"
                                + "<input class='input' type = 'date' id = 'inputDate-col-" + listItem.id + "'></input>"
                                + "<div class='status-col' id = 'status-col-" + listItem.id + "' >" + listItem.status + "</div>"
                                + "<select class='input' id = 'selectStatus-col-" + listItem.id + "'><option value = 'complete'>Complete</option><option value = 'incomplete'>Incomplete</option></select>"
                                + "<div class='list-controls-col'>"
                                + " <div class='list-item-control material-icons' id = 'up-" + listItem.id + "'>keyboard_arrow_up</div>"
                                + " <div class='list-item-control material-icons' id = 'down-" + listItem.id + "'>keyboard_arrow_down</div>"
                                + " <div class='list-item-control material-icons' id = 'close-" + listItem.id + "'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
            itemsListDiv.innerHTML += listItemElement;
        }
        this.controller.addEventHandlers(list);
        let allLists = document.getElementById("todo-lists-list");
        var firstList = document.getElementById("todo-list-" + list.id);
        allLists.firstChild.style.backgroundColor = "var(--swatch-complement)";

        allLists.insertBefore(firstList, allLists.firstChild);
        firstList.style.backgroundColor = "var(--swatch-accent)";

        let listItems = document.getElementById("todo-list-items-div");
        let firstItemId = listItems.firstChild.id;
        let idNum = firstItemId.substring(15);
        let firstMoveUp = document.getElementById("up-" + idNum);
        firstMoveUp.style.visibility = "hidden";
        let lastItemId = listItems.lastChild.id;
        let lastIdNum = lastItemId.substring(15);
        let lastMoveDown = document.getElementById("down-" + lastIdNum);
        lastMoveDown.style.visibility = "hidden";

        this.controller.setStatusColors(list);

    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }

   

}