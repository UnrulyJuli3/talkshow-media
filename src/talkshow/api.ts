export interface IMedia {
    id: number;
    versions: IMediaVersion[];
    get type(): string;
    get numVersions(): number;
    addVersion(idx: number, id: number, locale: string | null, tag: string, text: string): any;
    filteredVersions(text: string, queries: string[]): IMediaVersion[];
};

export interface IMediaVersion {
    idx: number;
    id: number;
    locale?: string;
    tag: string;
    source: string;
    text: string;
    metadata: Map<string, string | undefined>;
};