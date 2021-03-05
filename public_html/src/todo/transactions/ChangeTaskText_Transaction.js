'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class ChangeTaskText_Transaction extends jsTPS_Transaction{
    constructor(initModel) {
        super();
        this.model = initModel;
    }

    doTransaction(item) {
        this.itemAdded = this.model.changeTask(item);
    }



}