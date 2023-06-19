import Action from "../actions/action";
import { ActionCell } from "./action";
import { Timing } from "./timing";

export class ActionRef {
    public timing: Timing;
    public values: any[] = [];
    public valueMap: Record<string, any> = {};
    public action: Action;
    public parentCell?: ActionCell;
    // public primary: boolean;

    constructor(action: Action, timing: Timing) {
        this.action = action;
        this.timing = timing;
    }

    public setValueClassic(param1: number, param2: any) {
        this.values[param1] = param2;
    }

    public setValue(param1: number, key: string, value: any) {
        this.setValueClassic(param1, value);
        this.valueMap[key] = value;
    }
}