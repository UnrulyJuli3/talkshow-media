export class TemplateParamValue {
    public templateId: number;
    public fieldId: number;

    constructor(templateId: number, fieldId: number) {
        this.templateId = templateId;
        this.fieldId = fieldId;
    }
}