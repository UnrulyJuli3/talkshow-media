import { MediaParamValue } from "../actions/mediaparamvalue";
import { TemplateParamValue } from "../actions/templateparamvalue";
import { ActionCell } from "../cells/action";
import { ActionRef } from "../cells/actionref";
import { AbstractCell } from "../cells/cell";
import { DummyCell } from "../cells/dummy";
import { StartNextActionRef } from "../cells/startnext";
import { Timing } from "../cells/timing";
import Parts from "../parts";
import Export from "./export";

export interface FlowchartData {
    cells: string;
    media: string;
    dict: string;
    fname: string;
    pname: string;
}

export interface SubroutineData extends FlowchartData {
    c: number;
    params: string;
}

class Flowchart {
    private exp: Export;
    id: number;
    project: number;
    isSubroutine: boolean;
    name?: string;
    public media?: string;
    public dict?: string;
    public cells: AbstractCell[] = [];
    private readableDict: string[] = [];

    constructor(exp: Export, id: number, project: number, isSubroutine: boolean, data: FlowchartData) {
        this.exp = exp;
        this.id = id;
        this.project = project;
        this.isSubroutine = isSubroutine;
        this.parseFlowchartData(data);
    }

    private parseFlowchartData(exp: FlowchartData) {
        this.name = exp.fname;
        this.media = exp.media;
        this.dict = exp.dict;
        this.readableDict = this.dict.split("^");

        this.cells = exp.cells.split("^").map(data => {
            const parts = new Parts(data, "|");
            const id = parts.number();
            const loc8 = this.readableDict[parts.number()];
            const type = parts.string();
            switch (type) {
                // Action cell
                case "A": {
                    // param1 (flowchart), loc7 (id), loc8, parts, param3 (dict)
                    const childId = parts.number(0);
                    const primaryData = parts.string(1);
                    const mode = parts.string(2);
                    const cell = new ActionCell(this, id, loc8, childId, mode, this.buildActionRef(primaryData));
                    const partsString3 = parts.string(3);
                    if (partsString3) {
                        if (mode === "L") {
                            partsString3.split("~").forEach(loc11 => cell.addSecondaryAction(this.buildActionRef(loc11)));
                        } else {
                            const loc12 = new Parts(partsString3, ",");
                            while (loc12.has) {
                                const loc14 = loc12.number();
                                const loc10 = loc12.string().split("~");
                                loc10.forEach(loc11 => cell.addSecondaryAction(this.buildActionRef(loc11), loc14));
                            }
                        }
                    }
                    return cell;
                }
                default: {
                    return new DummyCell(this, id, loc8, type);
                }
            }
        }) as AbstractCell[];
    }

    private buildActionRef(data: string): ActionRef {
        // console.log(data);

        const parts = new Parts(data, "!");
        const actionType = parts.string(0);
        if (actionType === "N") {
            const targetFlow = parts.string(1) ? parts.number(1) : this.id,
                targetCell = parts.number(2);

            const loc6 = new Timing(parts.string(3) === "S", parts.number(4));
            return new StartNextActionRef(targetFlow, targetCell, loc6);
        }

        // make this CueTiming if parts.string(2) === "C"
        const loc6 = new Timing(parts.hasAt(2) ? parts.string(2) === "S" : true, parts.hasAt(3) ? parts.number(3) : 0);

        const loc5 = new ActionRef(this.exp.getAction(parts.number(0))!, loc6);
        if (parts.hasAt(1) && parts.string(1)) this.setActionProperties(loc5, parts.string(1));
        return loc5;
    }

    private setActionProperties(param1: ActionRef, param2: string) {
        // console.log(param1);
        param2.split("#").forEach((loc4, loc5) => {
            // console.log(loc4);
            if (loc4.startsWith("T")) {
                const loc6 = new Parts(loc4, "*");
                param1.setValueClassic(loc5, new TemplateParamValue(loc6.number(1), loc6.number(2)));
            } else {
                const loc7 = param1.action.getParameter(loc5);
                let value: any = loc4;
                switch (loc7.type) {
                    case "A":
                    case "G":
                    case "T":
                        const loc9 = new Parts(loc4, "*");
                        const mediaId = loc9.number();
                        value = new MediaParamValue(param1, mediaId, loc9.number(), this.readableDict[loc9.number()], this.exp.media?.find(m => m.id === mediaId));
                        break;
                    case "B":
                        value = loc4 === "1";
                        break;
                    case "N":
                        value = parseFloat(loc4);
                        break;
                    case "L":
                    case "S":
                        value = this.readableDict[parseInt(loc4)];
                        break;
                }
                param1.setValue(loc5, loc7.name, value);
            }
        });
    }
}

export { Flowchart };
// { Flowchart, Subroutine }