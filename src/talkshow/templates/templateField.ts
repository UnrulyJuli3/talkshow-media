enum FieldType {
    Audio = "A",
    Boolean = "B",
    Graphic = "G",
    Number = "N",
    String = "S"
}

export { FieldType };

class TemplateField {
    public id: number;
    public name: string;
    public type: FieldType;
    public def: string;
    public var: string;

    constructor(id: number, name: string, type: FieldType, def: string, variable: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.def = def;
        this.var = variable;
    }
}

export default TemplateField;