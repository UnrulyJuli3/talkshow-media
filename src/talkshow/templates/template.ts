import TemplateField from "./templateField";

class Template {
    id: number;
    name: string;
    params: string[];
    fields: TemplateField[];

    constructor(id: number, name: string, params: string[], fields: TemplateField[]) {
        this.id = id;
        this.name = name;
        this.params = params;
        this.fields = fields;
    }
}

export default Template;