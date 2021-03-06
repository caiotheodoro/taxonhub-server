import cors from 'cors';
import express from 'express';
import swaggerUi from "swagger-ui-express";
import managerCron from './manager-cron';
import swaggerDocument from './swagger.json'
import { checkVersionAndUpdate } from './modules/routines/checkVersionAndUpdate';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (_, res) => res.send('API UP'));

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server running on port ${process.env.PORT || 3333}`);

    //wfoRepository.updateDatabasePhaseStatus(EMetaTableValues.needToCheck);

    (async () => {
        await checkVersionAndUpdate();
    })();

    managerCron.run();
});
