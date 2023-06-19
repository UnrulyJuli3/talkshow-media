/* enum ParameterType {
    Audio = "A",
    Boolean = "B",
    Graphic = "G",
    List = "L",
    Number = "N",
    String = "S",
    Text = "T"
} */

// export { ParameterType };

class Parameter {
    public name: string;
    public type: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    /* public get isMedia() {
        return [ParameterType.Audio, ParameterType.Graphic, ParameterType.Text].includes(this.type);
    }

    public get isLoadableMedia() {
        return [ParameterType.Audio, ParameterType.Graphic].includes(this.type);
    } */
}

export default Parameter;