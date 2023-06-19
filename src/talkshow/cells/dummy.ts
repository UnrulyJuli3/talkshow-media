import { Flowchart } from "../export/flowchart";
import { AbstractCell } from "./cell";

const typeMap: Record<string, string> = {
    A: "action",
    S: "call",
    C: "code",
    G: "goto",
    I: "input",
    L: "label",
    R: "reference",
    N: "return",
    X: "stopListening",
    T: "template"
};

export class DummyCell extends AbstractCell {
    constructor(flowchart: Flowchart, id: number, target: string, type: string) {
        super(flowchart, id, target, `dummy:${typeMap[type]}`);
    }
}