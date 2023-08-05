import * as models from './models';

export interface ServiceModels {
  Exercise: any;
}

export default (modelName: string) => {
  return {
    async create(item: object) {
      return models[modelName as keyof ServiceModels].create(item);
    },

    async createMany(items: object[]) {
      return models[modelName as keyof ServiceModels].insertMany(items);
    },

    async upsert(query: object, data: object) {
      return models[modelName as keyof ServiceModels].updateOne(query, data, { upsert: true });
    },

    async update(query: object, update: object) {
      return models[modelName as keyof ServiceModels].findOneAndUpdate(query, update);
    },

    async getOne(query: object) {
      return models[modelName as keyof ServiceModels].findOne(query);
    },

    async countDocuments() {
      return models[modelName as keyof ServiceModels].count();
    },

    async getMany(query: object = {}, page: number = 0, itemsPerPage: number = 10) {
      return models[modelName as keyof ServiceModels]
        .find(query)
        .skip(page * itemsPerPage)
        .limit(itemsPerPage);
    },

    async getAll(query: object = {}) {
      return models[modelName as keyof ServiceModels].find(query);
    },

    async aggregateOne(aggregationQuery: any) {
      const result = await models[modelName as keyof ServiceModels].aggregate(aggregationQuery);

      return result[0];
    },

    async aggregateMany(aggregationQuery: any, page: number = 0, itemsPerPage: number = 10) {
      return models[modelName as keyof ServiceModels]
        .aggregate(aggregationQuery)
        .skip(page * itemsPerPage)
        .limit(itemsPerPage);
    },

    async aggregateAll(aggregationQuery: any) {
      return models[modelName as keyof ServiceModels].aggregate(aggregationQuery);
    },

    async updateMany(query: object, update: object) {
      return models[modelName as keyof ServiceModels].updateMany(query, update);
    },

    async deleteOne(query: object) {
      return models[modelName as keyof ServiceModels].deleteOne(query);
    },

    async deleteMany(query: object) {
      await models[modelName as keyof ServiceModels].deleteMany(query);
    },

    async addItemToList(query: object, item: any) {
      return models[modelName as keyof ServiceModels].findOneAndUpdate(query, { $addToSet: item }, { new: true });
    },

    async removeItemsFromList(query: object, item: any) {
      return models[modelName as keyof ServiceModels].updateMany(query, { $pull: item }, { new: true });
    },

    async removeItemFromList(query: object, item: any) {
      return models[modelName as keyof ServiceModels].findOneAndUpdate(query, { $pull: item }, { new: true });
    },

    async getMostRecent(query: object) {
      const items = await models[modelName as keyof ServiceModels].find(query).sort({ createdAt: -1 }).limit(1);

      return items[0] ? items[0] : null;
    },
  };
};
