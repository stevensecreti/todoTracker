'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"
import AddNewItem_Transaction from "./AddNewItem_Transaction.js";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel, item) {
        super();
        this.model = initModel;
        this.item = item;
        this.previousStatus = this.item.getStatus();
    }

    doTransaction() {
        this.model.changeStatus(this.item);
    }

    undoTransaction(){
        this.model.undoChangeStatus(this.item, this.previousStatus);
    }
}