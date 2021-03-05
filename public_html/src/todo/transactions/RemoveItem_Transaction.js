'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"
import AddNewItem_Transaction from "./AddNewItem_Transaction.js";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class RemoveItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, item, list) {
        super();
        this.model = initModel;
        this.item = item;
        this.list = list;
        this.index = list.getIndexOfItem(this.item);
    }

    doTransaction() {
        this.model.removeItem(this.item);
    }

    undoTransaction() {
        this.model.addItem(this.item, this.list, this.index);
    }
}