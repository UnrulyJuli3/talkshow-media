import ActionPackageRef from "./actionPackageRef";
import Parameter from "./parameter";

class Action {
    public id: number;
    public name: string;
    public pkg: ActionPackageRef;
    public params: Parameter[] = [];
    // private primaryMediaParamIdx: number = -1;
    private indices: Map<string, number> = new Map();

    constructor(id: number, name: string, pkg: ActionPackageRef) {
        this.id = id;
        this.name = name;
        this.pkg = pkg;
    }

    public addParameter(param: Parameter) {
        this.indices.set(param.name, this.params.length);
        this.params.push(param);
    }

    public getParameterIndex(name: string) {
        return this.indices.get(name);
    }
}

export default Action;