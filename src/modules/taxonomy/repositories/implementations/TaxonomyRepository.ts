import { IRecord } from '../../../model/WFORecord';
import { WfoRepository } from '../../../wfo/repositories/implementations/WfoRepository';

import { ITaxonomyRepository } from '../ITaxonomyRepository';

class TaxonomyRepository implements ITaxonomyRepository {
    constructor(private wfoRepository: WfoRepository) {}

    async getRecordByName(scientificName: string): Promise<IRecord> {
        return this.wfoRepository.getRecordByName(scientificName);
    }
}

export { TaxonomyRepository };
