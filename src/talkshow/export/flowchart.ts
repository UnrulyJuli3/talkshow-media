// import Parts from "../parts";

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
    id: number;
    project: number;
    isSubroutine: boolean;
    name?: string;

    constructor(id: number, project: number, isSubroutine: boolean, data: FlowchartData) {
        this.id = id;
        this.project = project;
        this.isSubroutine = isSubroutine;
        this.parseFlowchartData(data);
    }

    parseFlowchartData(exp: FlowchartData) {
        // const dict = exp.dict.split("^");
        this.name = exp.fname;

        /* const cells = exp.cells.split("^").map(data => {
            const parts = new Parts(data, "|");
            const id = parts.number();
            const loc8 = dict[parts.number()];
            const type = parts.string();
            switch (type) {
                // Action cell
                case "A": {
                    // param1 (flowchart), loc7 (id), loc8, parts, param3 (dict)

                    break;
                }
                default:
                    return false;
            }
        }).filter(c => c !== false); */
    }
}

export { Flowchart };
// { Flowchart, Subroutine }