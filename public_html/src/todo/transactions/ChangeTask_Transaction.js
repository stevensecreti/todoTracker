'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"
import AddNewItem_Transaction from "./AddNewItem_Transaction.js";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeTask_Transaction extends jsTPS_Transaction {
    constructor(initModel, item, previousValue, text){
        super();
        this.model = initModel;
        this.item = item;
        this.previousTask = previousValue;
        this.text = text;
    }

    doTransaction() {
        this.model.doChangeTask(this.item, this.text);
    }

    undoTransaction(){
        this.model.undoChangeTask(this.item, this.previousTask);
    }
}