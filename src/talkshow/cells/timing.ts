export class Timing {
    public fromStart: boolean;
    public time: number;

    constructor(fromStart: boolean, time: number) {
        this.fromStart = fromStart;
        this.time = time;
    }
}