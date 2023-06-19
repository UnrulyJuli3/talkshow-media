import { ActionRef } from "../cells/actionref";
import { AbstractMedia, AbstractVersion } from "../media/abstract";

const selTypeMap: Record<number, string> = {
    0: "random",
    1: "order",
    2: "index",
    3: "tag",
    4: "primary"
};

const selValLoop = "Loop";

export class MediaParamValue {
    public selType: string;
    public selVal: string;
    public actionRef: ActionRef;
    public media?: AbstractMedia;
    public mediaId: number;
    public previous?: AbstractVersion;

    constructor(param1: ActionRef, param2: number, param3: number, param4: string, param5?: AbstractMedia) {
        this.mediaId = param2;
        this.actionRef = param1;
        this.selType = selTypeMap[param3];
        this.selVal = param4;
        this.media = param5;
    }
}