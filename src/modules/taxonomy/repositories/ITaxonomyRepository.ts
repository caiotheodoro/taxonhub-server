import { IRecord } from '../../model/WFORecord';

interface ITaxonomyRepository {
    getRecordByName(scientificName: string): Promise<IRecord>;
}

export { ITaxonomyRepository };
