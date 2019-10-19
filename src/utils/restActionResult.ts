export class RestActionResult {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;

    constructor(base: string) {
        this.REQUEST = `${base}__REQUEST`;
        this.SUCCESS = `${base}__SUCCESS`;
        this.FAILURE = `${base}__FAILURE`;
    }
}
