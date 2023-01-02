import { IMedia } from "../api";
import Parts from "../parts";
import { AudioMedia } from "./audio";
import { TextMedia } from "./text";

class MediaFactory {
    static buildMedia(param2: string, param3: string[], version: number): IMedia[] {
        return param2.split("^").map(loc6 => {
            const parts = new Parts(loc6, "|");
            const loc8 = parts.number();
            const loc9 = parts.string();
            const loc10 = parts.number();
            let loc11: IMedia;
            switch (loc9) {
                case "A": loc11 = new AudioMedia(loc8); break;
                case "T": loc11 = new TextMedia(loc8); break;
                default: throw new Error(`Invalid media type "${loc9}"`);
            }

            const supportsLocale = version >= 2;
            for (let i = 0; i < loc10; i++) {
                loc11.addVersion(i, parts.number(), supportsLocale ? parts.string() : null, param3[parts.number()], param3[parts.number()]);
                parts.skip(); // not required for our purposes (or any purposes anymore, i think)
            }

            return loc11;
        });
    }
}

export default MediaFactory;