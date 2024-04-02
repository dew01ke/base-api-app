import { ExceptionBase } from './exception.base';
import {
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from './exception.codes';

export class NotFoundException extends ExceptionBase {
    public static readonly message: string = 'Not found';

    public constructor(message: string = NotFoundException.message) {
        super(message);
    }

    public readonly code: string = NOT_FOUND;
}

export class InternalServerErrorException extends ExceptionBase {
    public static readonly message: string = 'Internal server error';

    public constructor(message: string = InternalServerErrorException.message) {
        super(message);
    }

    public readonly code: string = INTERNAL_SERVER_ERROR;
}
