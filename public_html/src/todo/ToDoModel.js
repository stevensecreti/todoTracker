'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import MoveUp_Transaction from './transactions/MoveUp_Transaction.js'
import MoveDown_Transaction from './transactions/MoveDown_Transaction.js'
import RemoveItem_Transaction from './transactions/RemoveItem_Transaction.js'
import ChangeTask_Transaction from './transactions/ChangeTask_Transaction.js'
import ChangeDueDate_Transaction from './transactions/ChangeDueDate_Transaction.js'
import ChangeStatus_Transaction from './transactions/ChangeStatus_Transaction.js'

/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.addItem(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
    }

    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }

    changeTask(item){
        let itemId = item.id;
        let previousValue = item.getDescription();
        document.getElementById("task-col-" + itemId).style.display = "none";
        document.getElementById("add-list-button").style.visibility = "hidden";
        document.getElementById("inputTask-col-" + itemId).style.display = "flex";
        var textBox = document.getElementById("inputTask-col-" + itemId);
        document.getElementById("inputTask-col-" + itemId).focus();
        let TPS = this.tps;
        let modelCurrent = this;
        textBox.onblur = function(){
            let text = textBox.value;
            let transaction = new ChangeTask_Transaction(modelCurrent, item, previousValue, text);
            TPS.addTransaction(transaction);      
        }
        

    }
    doChangeTask(item, text){
        item.setDescription(text);
        document.getElementById("inputTask-col-" + item.id).style.display = "none";
        document.getElementById("task-col-" + item.id).innerHTML = text;
        document.getElementById("task-col-" + item.id).style.display = "flex";
        document.getElementById("add-list-button").style.visibility = "visible";
    }
    undoChangeTask(item, value){
        item.setDescription(value);
        this.view.viewList(this.currentList);
    }

    changeDueDateTransaction(item){
        let transaction = new ChangeDueDate_Transaction(this, item);
        this.tps.addTransaction(transaction);            
    }
    changeDueDate(item){
        let itemId = item.id;
        document.getElementById("due-date-col-" + itemId).style.display = "none";
        document.getElementById("inputDate-col-" + itemId).style.display = "flex";
        document.getElementById("add-list-button").style.visibility = "hidden";
        var dateBox = document.getElementById("inputDate-col-" + itemId);
        dateBox.focus();
        dateBox.onblur = function(){
            var date = dateBox.value;
            item.setDueDate(date);
            document.getElementById("due-date-col-" + itemId).innerHTML = date;
            document.getElementById("due-date-col-" + itemId).style.display = "flex";
            document.getElementById("inputDate-col-" + itemId).style.display = "none";
            document.getElementById("add-list-button").style.visibility = "visible";
        }
    }
    undoChangeDueDate(item, date){
        item.setDueDate(date);
        this.view.viewList(this.currentList);
    }

    changeStatusTransaction(item){
        let transaction = new ChangeStatus_Transaction(this, item);
        this.tps.addTransaction(transaction);            
    } 
    changeStatus(item){
        let itemId = item.id;
        var status = document.getElementById("status-col-" + itemId);
        var statusBox = document.getElementById("selectStatus-col-" + itemId);
        document.getElementById("add-list-button").style.visibility = "hidden";
        status.style.display = "none";
        statusBox.style.display = "flex";
        statusBox.focus();
        statusBox.onblur = function(){
            var statusVal = statusBox.value;
            item.setStatus(statusVal);
            status.innerHTML = statusVal;
            if(statusVal == "incomplete"){
                status.style.color = "yellow";
            }
            else{
                status.style.color = "cyan";
            }
            status.style.display = "flex";
            statusBox.style.display = "none";
            document.getElementById("add-list-button").style.visibility = "visible"
        }
    }
    undoChangeStatus(item, status){
        item.setStatus(status);
        this.view.viewList(this.currentList);
    }

    moveUpTransaction(item){
        let transaction = new MoveUp_Transaction(this, item);
        this.tps.addTransaction(transaction);
    }

    moveUp(item){
        let itemId = item.id;
        let currentItem = document.getElementById("todo-list-item-" + itemId);
        let switchItem = currentItem.previousSibling;
        let switchItemId = switchItem.id.substring(15);
        let list = currentItem.parentElement;
        list.insertBefore(currentItem, switchItem);
        this.currentList.swapItems(item, -1);
        if(currentItem == list.firstChild){
            document.getElementById("up-" + itemId).style.visibility = "hidden";
            document.getElementById("up-" + switchItemId).style.visibility = "visible";    
        }
        if(switchItem == list.lastChild){
            document.getElementById("down-" + itemId).style.visibility = "visible";
            document.getElementById("down-" + switchItemId).style.visibility = "hidden";
        }

    }

    moveDownTransaction(item){
        let transaction = new MoveDown_Transaction(this, item);
        this.tps.addTransaction(transaction);
    }

    moveDown(item){
        let itemId = item.id;
        let currentItem = document.getElementById("todo-list-item-" + itemId);
        let switchItem = currentItem.nextSibling;
        let switchItemId = switchItem.id.substring(15);
        let list = currentItem.parentElement;
        list.insertBefore(switchItem, currentItem);
        this.currentList.swapItems(item, 1);
        if(switchItem == list.firstChild){
            document.getElementById("up-" + itemId).style.visibility = "visible";
            document.getElementById("up-" + switchItemId).style.visibility = "hidden";    
        }
        if(currentItem == list.lastChild){
            document.getElementById("down-" + itemId).style.visibility = "hidden";
            document.getElementById("down-" + switchItemId).style.visibility = "visible";
        }
    }



    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);
        }
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItemTransaction(itemToRemove, list){
        let transaction = new RemoveItem_Transaction(this, itemToRemove, list);
        this.tps.addTransaction(transaction);
    }

    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }
    addItem(item, list, index){
        this.currentList.addItemAtIndex(item, index);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
            document.getElementById('modal').style.display = "none"; 
            document.getElementById("add-item-button").style.visibility = "hidden";
            document.getElementById("delete-list-button").style.visibility = "hidden";
            document.getElementById("close-list-button").style.visibility = "hidden";
            let indexOfList = -1;
            for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
                if (this.toDoLists[i].id === this.currentList.id) {
                    indexOfList = i;
                }
             }
            this.toDoLists.splice(indexOfList, 1);
            this.currentList = null;
            this.view.clearItemsList();
            this.view.refreshLists(this.toDoLists);
    }

    closeCurrentList(){
        let itemsListDiv = document.getElementById("todo-list-items-div");
        itemsListDiv.innerHTML = "";
        document.getElementById("add-item-button").style.visibility = "hidden";
        document.getElementById("delete-list-button").style.visibility = "hidden";
        document.getElementById("close-list-button").style.visibility = "hidden";
        document.getElementById("todo-lists-list").firstChild.style.backgroundColor = "var(--swatch-complement)";
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
    } 

    undoCheck(){
        if(this.tps.hasTransactionToUndo()){
            document.getElementById("undo-button").style.visibility = "visible";
        }
        else{
            document.getElementById("undo-button").style.visibility = "hidden";
        }
    }
    redoCheck(){
        if(this.tps.hasTransactionToRedo()){
            document.getElementById("redo-button").style.visibility = "visible";
        }
        else{
            document.getElementById("redo-button").style.visibility = "hidden";  
        }
    }
}

