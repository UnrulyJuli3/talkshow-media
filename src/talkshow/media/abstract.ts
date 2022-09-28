import { IMedia, IMediaVersion } from "../api";

abstract class AbstractMedia implements IMedia {
    id: number;
    versions: IMediaVersion[] = [];

    constructor(id: number) {
        this.id = id;
    }

    abstract get type(): string;

    abstract addVersion(idx: number, id: number, locale: string | null, tag: string, text: string): any;

    get numVersions() {
        return this.versions.length;
    }
}

abstract class AbstractVersion implements IMediaVersion {
    idx: number;
    id: number;
    locale?: string;
    tag: string;
    source: string;
    text: string;
    metadata: Map<string, string | undefined>;

    constructor(idx: number, id: number, locale: string | null, tag: string, text: string) {
        this.idx = idx;
        this.id = id;
        if (locale) this.locale = locale;
        this.tag = tag;
        this.metadata = new Map();
        this.source = text;
        this.text = text.replace(/\[([^=]*?)(?:=(.*?))?\]/g, (substring, key, value) => {
            // value can be undefined for something like "[Unsubtitled]"
            this.metadata.set(key, value);
            return "";
        }).trim();
    }
}

export { AbstractMedia, AbstractVersion };