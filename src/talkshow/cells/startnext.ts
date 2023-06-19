import Action from "../actions/action";
import { ActionRef } from "./actionref";
import { Timing } from "./timing";

const startNextActionId = -99999;

export class StartNextActionRef extends ActionRef {
    public targetFlow: number;
    public targetCell: number;

    constructor(targetFlow: number, targetCell: number, timing: Timing) {
        super(new Action(startNextActionId, "StartNext"), timing);
        this.targetFlow = targetFlow;
        this.targetCell = targetCell;
    }
}