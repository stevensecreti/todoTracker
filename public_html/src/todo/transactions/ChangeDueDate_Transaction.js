'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"
import AddNewItem_Transaction from "./AddNewItem_Transaction.js";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDueDate_Transaction extends jsTPS_Transaction {
    constructor(initModel, item, previousValue, date) {
        super();
        this.model = initModel;
        this.item = item;
        this.previousDate = previousValue;
        this.date = date;
    }

    doTransaction() {
        this.model.doChangeDueDate(this.item, this.date);
    }

    undoTransaction(){
        this.model.undoChangeDueDate(this.item, this.previousDate);
    }
}