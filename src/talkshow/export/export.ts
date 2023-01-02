// 16384

import { BundleItem, GameItem } from "../../games";
import Action from "../actions/action";
import ActionPackageRef, { ActionPackageType } from "../actions/actionPackageRef";
import Parameter, { ParameterType } from "../actions/parameter";
import { IMedia } from "../api";
import MediaFactory from "../media/factory";
import Parts from "../parts";
import Template from "../templates/template";
import TemplateField, { FieldType } from "../templates/templateField";
import { Flowchart, FlowchartData } from "./flowchart";

interface ExportData {
    f: number;
    c: number;
    w: number;
    p: number;
    timeStamp: number;
    media: string;
    packages: string;
    actions: string;
    templates: string;
    flowcharts: {
        text: string;
        data: {
            [key: string]: FlowchartData;
        };
    };
    projects: string;
    dict: string;
}

class Export {
    private bundle: BundleItem;
    private game: GameItem;

    public timestamp?: Date;
    public workspaceName?: string;
    public projectName?: string;
    public media?: IMedia[];
    public packages?: ActionPackageRef[];
    public flowcharts?: Flowchart[];
    public templates?: Template[];

    private get resourcePath() {
        return `https://talkshow-sid3r.s3.us-west-1.amazonaws.com/talkshow/${this.bundle.id}-${this.game.id}/`;
    }

    constructor(bundle: BundleItem, game: GameItem) {
        this.bundle = bundle;
        this.game = game;
    }

    private static adjust(num: number) {
        return num < 0 ? num + 16384 : num;
    }

    async load() {
        const response = await fetch(this.resourcePath + "data.json");
        const exp = await response.json() as ExportData;

        // console.log(this);
        // console.log(exp);
        this.timestamp = new Date(exp.timeStamp);

        const dict = exp.dict.split("^");
        this.workspaceName = dict[exp.w];
        this.projectName = dict[exp.p];

        this.media = MediaFactory.buildMedia(exp.media, dict, this.game.version!);

        this.flowcharts = exp.flowcharts.text ? exp.flowcharts.text.split("^").map(data => {
            const parts = new Parts(data, "|");
            const id = parts.number();
            const name = dict[parts.number()];
            const type = parts.number();
            const project = parts.number();
            return new Flowchart(id, project, type === 1, exp.flowcharts.data[id]);
        }) : [];

        const packages = exp.packages ? exp.packages.split("^").map(data => {
            const parts = new Parts(data, "|");
            const pkgid = parts.number();
            const name = dict[parts.number()];
            const type = parts.string() as ActionPackageType;
            const parent = parts.number();
            return new ActionPackageRef(type, pkgid, name);
        }) : [];

        // console.log(packages);
        this.packages = packages;

        const actions = exp.actions ? exp.actions.split("^").map(data => {
            const parts = new Parts(data, "|");
            const id = parts.number();
            const name = dict[parts.number()];
            const pkgid = parts.number();
            const pkg = packages.find(p => p.id === pkgid)!;
            const action = new Action(id, name, pkg);
            pkg.addAction(action);
            while (parts.has) action.addParameter(new Parameter(dict[parts.number()], parts.string() as ParameterType));
            return action;
        }) : [];

        // console.log(actions);

        this.templates = exp.templates ? exp.templates.split("^").map(data => {
            const parts = new Parts(data, "|");
            const tid = parts.number();
            const parent = parts.number();
            const name = dict[parts.number()];
            const params = parts.string().split("!").map(v => dict[parseInt(v)]);
            const fields = parts.string().split("!").map(fdata => {
                const fparts = new Parts(fdata, ",");
                const id = fparts.number();
                const name = dict[fparts.number()];
                const type = fparts.string() as FieldType;
                const defRaw = fparts.number();
                const def = [FieldType.Audio, FieldType.Graphic].includes(type) ? defRaw.toString() : dict[defRaw];
                return new TemplateField(id, name, type, def, dict[fparts.number()]);
            });
            return new Template(tid, name, params, fields);
        }) : [];

        // console.log(this.templates);
    }

    getAudioPath(id: number) {
        return this.resourcePath + id + ".ogg";
    }
}

export default Export;