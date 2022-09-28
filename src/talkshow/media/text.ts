import { AbstractMedia, AbstractVersion } from "./abstract";

class TextMedia extends AbstractMedia {
    versions: TextVersion[] = [];

    get type(): string {
        return "text";
    }

    addVersion(idx: number, id: number, locale: string | null, tag: string, text: string) {
        this.versions.push(new TextVersion(idx, id, locale, tag, text));
    }
}

class TextVersion extends AbstractVersion { }

export { TextMedia, TextVersion };