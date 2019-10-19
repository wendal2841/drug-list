import { RestActionResult } from './restActionResult';

export class RestActionType {
    GET: RestActionResult;
    POST: RestActionResult;
    PUT: RestActionResult;
    DELETE: RestActionResult;

    constructor(entityName: string) {
        this.GET = new RestActionResult(`${entityName}__GET`);
        this.POST = new RestActionResult(`${entityName}__POST`);
        this.PUT = new RestActionResult(`${entityName}__PUT`);
        this.DELETE = new RestActionResult(`${entityName}__DELETE`);
    }
}
