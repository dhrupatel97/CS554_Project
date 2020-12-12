import { Request, Response } from 'express';
export interface MulterRequest extends Request {
    file: any;
}
