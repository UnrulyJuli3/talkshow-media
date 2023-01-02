import Action from "./action";

enum ActionPackageType {
    Internal = "I",
    Swf = "S",
    Code = "C"
}

export { ActionPackageType };

class ActionPackageRef {
    public type: ActionPackageType;
    public id: number;
    public name: string;
    public actions: Action[] = [];

    constructor(type: ActionPackageType, id: number, name: string) {
        this.type = type;
        this.id = id;
        this.name = name;
    }

    public addAction(action: Action) {
        this.actions.push(action);
    }
}

export default ActionPackageRef;