"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxonomyModel = void 0;
class TaxonomyModel {
    constructor(searchedName, returnedName, acceptedNameOrSynonym, synonymOf, dataset, respectiveFamily) {
        this.searchedName = searchedName;
        this.returnedName = returnedName;
        this.acceptedNameOrSynonym = acceptedNameOrSynonym;
        this.synonymOf = synonymOf;
        this.dataset = dataset;
        this.respectiveFamily = respectiveFamily;
    }
}
exports.TaxonomyModel = TaxonomyModel;
