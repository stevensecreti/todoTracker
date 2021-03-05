'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"
import AddNewItem_Transaction from "./AddNewItem_Transaction.js";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel, item, previousStatus, status) {
        super();
        this.model = initModel;
        this.item = item;
        this.previousStatus = previousStatus;
        this.status = status;
    }

    doTransaction() {
        this.model.doChangeStatus(this.item, this.status);
    }

    undoTransaction(){
        this.model.undoChangeStatus(this.item, this.previousStatus);
    }
}