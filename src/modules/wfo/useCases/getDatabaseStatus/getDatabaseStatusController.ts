import { Request, Response } from 'express';
import { DefaultResponse } from '../../../http/defaultResponse';

import { GetDatabaseStatusUseCase } from './getDatabaseStatusUseCase';

class GetDatabaseStatusController {
    constructor(private getDatabaseStatusUseCase: GetDatabaseStatusUseCase) {}

    async handle(_request: Request, response: Response): Promise<Response> {
        const data: DefaultResponse<unknown> =
            await this.getDatabaseStatusUseCase.executeResponse();

        return response.status(data.status).json(data);
    }
}

export { GetDatabaseStatusController };
