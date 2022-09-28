import { AbstractMedia, AbstractVersion } from "./abstract";

class AudioMedia extends AbstractMedia {
    versions: AudioVersion[] = [];

    get type(): string {
        return "audio";
    }

    addVersion(idx: number, id: number, locale: string | null, tag: string, text: string) {
        this.versions.push(new AudioVersion(idx, id, locale, tag, text));
    }
}

class AudioVersion extends AbstractVersion { }

export { AudioMedia, AudioVersion };