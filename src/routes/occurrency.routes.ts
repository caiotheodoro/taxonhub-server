import { Router } from 'express';
import { getOccurrencyController } from '../../../occurrency/useCases/getOccurrency';
import { FILES_FOLDER } from '../../../config/constants';
const ocurrencyRoutes = Router();

ocurrencyRoutes.get('/generatecsv', (req, res) => {
    return getOccurrencyController.handle(req, res);
});

ocurrencyRoutes.get('/download', (req, res) => {
    const { userId } = req.query;
    res.download(`${FILES_FOLDER}/${userId}-occurrency.csv`);
}
);


export { ocurrencyRoutes };
