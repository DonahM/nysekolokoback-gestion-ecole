/* eslint-disable prettier/prettier */

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export default class CustomPrismaRequestError{
    code: string;
    message: string;
    key: Record<string, unknown>;
    constructor(error: PrismaClientKnownRequestError) {
        this.code = error.code
        this.key = error.meta
        if (this.code === 'P2002') {
            this.message = 'Unique constraint failed on the constraint'
        }
        if (this.code === 'P2003') {
            this.message = 'Unique constraint failed on the constraint'
        }
    }
}
