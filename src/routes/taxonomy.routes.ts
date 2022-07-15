import { Router } from 'express';
import { FILES_FOLDER } from '../modules/config/constants';
import { generateCSVController } from '../modules/taxonomy/useCases/generateCSV';

const taxonomyRoutes = Router();

taxonomyRoutes.get('/generatecsv', (req, res) => {
    return generateCSVController.handle(req, res);
});


taxonomyRoutes.get('/download', (req, res) => {
    const { userId } = req.query;
    res.download(`${FILES_FOLDER}/${userId}-taxonomy.csv`);
}
);

export { taxonomyRoutes };
