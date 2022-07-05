import { wfoRepository } from '../../../wfo/repositories';
import { DoSearchController } from './doSearchController';
import { DoSearchUseCase } from './doSearchUseCase';

const generateCSVUseCase = new DoSearchUseCase(wfoRepository);
const generateCSVController = new DoSearchController(generateCSVUseCase);

export { generateCSVUseCase };
export { generateCSVController };
