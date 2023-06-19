class Parts {
    private parts: string[];

    constructor(data: string, delimiter: string) {
        this.parts = data.split(delimiter);
    }

    public get has(): boolean {
        return this.parts.length > 0;
    }

    public skip(count: number = 1): void {
        for (let i = 0; i < count; i++) {
            if (!this.has) throw new Error("No parts remaining!");
            this.parts.shift();
        }
    }

    public hasAt(index: number): boolean {
        return index >= 0 && index < this.parts.length;
    }

    public string(index?: number): string {
        if (index !== undefined) {
            if (!this.hasAt(index)) throw new Error(`No part at index ${index}`);
            return this.parts[index];
        }

        if (!this.has) throw new Error("No parts remaining!");
        return this.parts.shift()!;
    }

    public number(index?: number): number {
        return parseInt(this.string(index));
    }
}

export default Parts;