'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {   
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;
        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            document.getElementById('modal').style.display = "block";
            document.getElementById('confirmDelete').onmousedown = function(){
                appModel.removeCurrentList();
            }
            document.getElementById('cancelDelete').onclick = function(){
                document.getElementById('modal').style.display = "none";   
            }
        }
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
        }
        document.onmousedown = function(){
            appModel.undoCheck();
            appModel.redoCheck();
        }
        document.getElementById("close-list-button").onmousedown = function(){
            appModel.closeCurrentList();
        }
    }

    addEventHandlers(list){
        let appModel = this.model;
        for(let i = 0; i < list.items.length; i++){
            let listItem = list.items[i];
            document.getElementById("task-col-" + listItem.id).onclick = function(){
                appModel.changeTask(listItem);    
            }
            document.getElementById("due-date-col-" + listItem.id).onclick = function(){
                appModel.changeDueDateTransaction(listItem);    
            }
            document.getElementById("status-col-" + listItem.id).onclick = function(){
                appModel.changeStatusTransaction(listItem);    
            }
            document.getElementById("up-" + listItem.id).onclick = function(){
                appModel.moveUpTransaction(listItem);
            }
            document.getElementById("down-" + listItem.id).onclick = function(){
                appModel.moveDownTransaction(listItem, list);    
            }
            document.getElementById("close-" + listItem.id).onclick = function(){
                appModel.removeItemTransaction(listItem, list);
            }
        }
        
        
    }

    setStatusColors(list){
        let appModel = this.model;
        for(let i = 0; i < list.items.length; i++){
            let listItem = list.items[i];
            let status = document.getElementById("status-col-" + listItem.id);
            if(listItem.getStatus() == "incomplete"){
                status.style.color = "yellow";
            }
            else{
                status.style.color = "cyan";
            }
        }
    }



    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }
}