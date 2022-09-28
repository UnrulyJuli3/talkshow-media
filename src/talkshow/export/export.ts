// 16384

import { BundleItem, GameItem } from "../../games";
import { IMedia } from "../api";
import MediaFactory from "../media/factory";

type ExportData = {
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
            [key: string]: any; // maybe add more defs here for flowchart data in the future, instead of "any"
        };
    };
    projects: string;
    dict: string;
};

class Export {
    private bundle: BundleItem;
    private game: GameItem;
    media?: IMedia[];

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
        const data = await response.json() as ExportData;

        const dict = data.dict.split("^");
        this.media = MediaFactory.buildMedia(data.media, dict, this.game.version!);
    }

    getAudioPath(id: number) {
        return this.resourcePath + id + ".ogg";
    }
}

export default Export;