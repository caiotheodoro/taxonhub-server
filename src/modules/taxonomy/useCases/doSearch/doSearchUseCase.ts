
import { TaxonomyModel } from '../../../model/Taxonomy';
import { ITaxonomyRepository } from '../../repositories/ITaxonomyRepository';


class DoSearchUseCase {
    constructor(private taxonomiesRepository: ITaxonomyRepository) { }

    async execute(data): Promise<TaxonomyModel[]> {

        return new Promise((resolve, reject) => {
            const taxonomies = [];
            data.forEach(async (line: { name1: string; name2: string; }) => {
                taxonomies.push(
                    await this.taxonomiesRepository.getRecordByName(line.name1),
                    await this.taxonomiesRepository.getRecordByName(line.name2)
                );
            }
            );
            resolve(taxonomies);
        });
    }

}

export { DoSearchUseCase };
