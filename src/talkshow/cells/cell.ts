import { Flowchart } from "../export/flowchart";

export class AbstractCell {
    public id: number;
    public target?: string;
    private flowchart: Flowchart;
    private type: string;

    constructor(flowchart: Flowchart, id: number, target: string, type: string) {
        this.flowchart = flowchart;
        this.id = id;
        if (target) this.target = target;
        this.type = type;
    }
}