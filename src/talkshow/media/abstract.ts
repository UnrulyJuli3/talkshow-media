import { IMedia, IMediaVersion } from "../api";

const strip = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

abstract class AbstractMedia implements IMedia {
    id: number;
    versions: IMediaVersion[] = [];

    constructor(id: number) {
        this.id = id;
    }

    abstract get type(): string;

    abstract addVersion(idx: number, id: number, locale: string | null, tag: string, text: string): any;

    filteredVersions(text: string, queries: string[]) {
        const query = strip(text);
        return this.versions.filter(version => {
            if (!query) return true;
            const queryList: string[] = [];
            if (queries.includes("id")) queryList.push(version.id.toString());
            if (queries.includes("tag")) queryList.push(...version.tag.split(","));
            if (queries.includes("text")) queryList.push(version.text);
            return queryList.some(ref => strip(ref).includes(query));
        });
    }

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