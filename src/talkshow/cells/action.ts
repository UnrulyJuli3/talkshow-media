import { Flowchart } from "../export/flowchart";
import { ActionRef } from "./actionref";
import { AbstractCell } from "./cell";

export class ActionCell extends AbstractCell {
    public childId: number;
    public mode: string;
    public primary: ActionRef;
    public secondary: ActionRef[][] = [];

    constructor(flowchart: Flowchart, id: number, target: string, childId: number, mode: string, primary: ActionRef) {
        super(flowchart, id, target, "action");
        this.childId = childId;
        this.mode = mode;
        this.primary = primary;
    }

    public addSecondaryAction(ref: ActionRef, param2: number = 0) {
        if (!this.secondary[param2]) this.secondary[param2] = [];
        this.secondary[param2].push(ref);
    }
}