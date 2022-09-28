import { IMedia } from "../api";
import { AudioMedia } from "./audio";
import { TextMedia } from "./text";

class MediaFactory {
    static buildMedia(param2: string, param3: string[], version: number): IMedia[] {
        return param2.split("^").map(loc6 => {
            const loc7 = loc6.split("|");
            const loc8 = parseInt(loc7.shift()!);
            const loc9 = loc7.shift()!;
            const loc10 = parseInt(loc7.shift()!);
            let loc11: IMedia;
            switch (loc9) {
                case "A": loc11 = new AudioMedia(loc8); break;
                case "T": loc11 = new TextMedia(loc8); break;
                default: throw new Error(`Invalid media type "${loc9}"`);
            }

            const supportsLocale = version >= 2;
            for (let i = 0; i < loc10; i++) {
                loc11.addVersion(i, parseInt(loc7.shift()!), supportsLocale ? loc7.shift()! : null, param3[parseInt(loc7.shift()!)], param3[parseInt(loc7.shift()!)]);
                loc7.shift(); // not required for our purposes (or any purposes anymore, i think)
            }

            return loc11;
        });
    }
}

export default MediaFactory;