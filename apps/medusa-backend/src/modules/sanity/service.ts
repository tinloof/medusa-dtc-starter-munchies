import {
  ModuleJoinerConfig,
  ProductCategoryDTO,
  ProductCollectionDTO,
  ProductDTO,
} from "@medusajs/types";
import {
  createClient,
  FirstDocumentMutationOptions,
  SanityClient,
} from "@sanity/client";

const SyncDocumentTypes = {
  PRODUCT: "product",
  CATEGORY: "category",
  COLLECTION: "collection",
} as const;

type SyncDocumentTypes =
  (typeof SyncDocumentTypes)[keyof typeof SyncDocumentTypes];

type SyncDocumentInputs<T> = T extends "product"
  ? ProductDTO
  : T extends "category"
    ? ProductCategoryDTO
    : T extends "collection"
      ? ProductCollectionDTO
      : never;

type SanityOptions = {
  api_token: string;
  project_id: string;
  api_version: string;
  dataset: "production" | "development";
  type_map?: Record<SyncDocumentTypes, string>;
  studio_url?: string;
};

type TransformationMap<T> = Record<
  SyncDocumentTypes,
  (data: SyncDocumentInputs<T>) => any
>;

type InjectedDependencies = {};

export default class SanityModuleService {
  private client: SanityClient;
  private studioUrl?: string;
  private typeMap: Record<SyncDocumentTypes, string>;
  private createTransformationMap: TransformationMap<SyncDocumentTypes>;
  private updateTransformationMap: TransformationMap<SyncDocumentTypes>;

  constructor({}: InjectedDependencies, options: SanityOptions) {
    this.client = createClient({
      projectId: options.project_id,
      apiVersion: options.api_version,
      dataset: options.dataset,
      token: options.api_token,
    });

    this.studioUrl = options.studio_url;
    this.typeMap = Object.assign(
      {},
      {
        [SyncDocumentTypes.PRODUCT]: "product",
        [SyncDocumentTypes.CATEGORY]: "category",
        [SyncDocumentTypes.COLLECTION]: "collection",
      },
      options.type_map || {},
    );

    this.createTransformationMap = {
      [SyncDocumentTypes.PRODUCT]: this.transformProductForCreate,
      [SyncDocumentTypes.CATEGORY]: this.transformCategoryForCreate,
      [SyncDocumentTypes.COLLECTION]: this.transformCollectionForCreate,
    };

    this.updateTransformationMap = {
      [SyncDocumentTypes.PRODUCT]: this.transformProductForUpdate,
      [SyncDocumentTypes.CATEGORY]: this.transformCategoryForUpdate,
      [SyncDocumentTypes.COLLECTION]: this.transformCollectionForUpdate,
    };
  }

  async upsertSyncDocument<T extends SyncDocumentTypes>(
    type: T,
    data: SyncDocumentInputs<T>,
  ) {
    const existing = await this.client.getDocument(data.id);
    if (existing) {
      return await this.updateSyncDocument(type, data);
    }

    return await this.createSyncDocument(type, data);
  }

  async createSyncDocument<T extends SyncDocumentTypes>(
    type: T,
    data: SyncDocumentInputs<T>,
    options?: FirstDocumentMutationOptions,
  ) {
    const doc = this.createTransformationMap[type](data);
    return await this.client.create(doc, options);
  }

  async updateSyncDocument<T extends SyncDocumentTypes>(
    type: T,
    data: SyncDocumentInputs<T>,
  ) {
    const operations = this.updateTransformationMap[type](data);
    return await this.client.patch(data.id, operations).commit();
  }

  async deleteSyncDocument<T extends SyncDocumentTypes>(type: T, id: string) {
    return await this.client.delete(id);
  }

  __joinerConfig(): ModuleJoinerConfig {
    return {
      serviceName: "sanity",
      primaryKeys: ["id"],
      linkableKeys: {},
      alias: [
        {
          name: "sanity",
        },
      ],
    };
  }

  async getStudioLink(
    type: string,
    id: string,
    config: { explicit_type?: boolean } = {},
  ) {
    const resolvedType = config.explicit_type ? type : this.typeMap[type];
    if (!this.studioUrl) {
      throw new Error("No studio URL provided");
    }
    return `${this.studioUrl}/structure/${resolvedType};${id}`;
  }

  async list(filter, config) {
    const data = await this.client.getDocuments(filter.id);

    return data.map((doc) => ({
      id: doc._id,
      ...doc,
    }));
  }

  private transformProductForUpdate = (product: ProductDTO) => {
    return {
      set: {
        internalTitle: product.title,
        pathname: { _type: "slug", current: "/products/" + product.handle },
      },
    };
  };

  private transformCategoryForUpdate = (category: ProductCategoryDTO) => {
    return {
      set: {
        internalTitle: category.name,
        pathname: { _type: "slug", current: "/categories/" + category.handle },
        // parent_category: category.parent_category_id
        //   ? {
        //       _type: "reference",
        //       _ref: category.parent_category_id,
        //     }
        //   : undefined,
        // children_categories: category.category_children.map((child) => {
        //   if (!child.id) return;
        //   return { _type: "reference", _ref: child.id };
        // }),
      },
    };
  };
  private transformCollectionForUpdate = (collection: ProductCollectionDTO) => {
    return {
      set: {
        internalTitle: collection.title,
        pathname: {
          _type: "slug",
          current: "/collections/" + collection.handle,
        },
      },
    };
  };

  private transformProductForCreate = (product: ProductDTO) => {
    return {
      _type: this.typeMap[SyncDocumentTypes.PRODUCT],
      _id: product.id,
      internalTitle: product.title,
      pathname: { _type: "slug", current: "/products/" + product.handle },
    };
  };
  private transformCategoryForCreate = (category: ProductCategoryDTO) => {
    return {
      _type: this.typeMap[SyncDocumentTypes.CATEGORY],
      _id: category.id,
      internalTitle: category.name,
      pathname: { _type: "slug", current: "/categories/" + category.handle },
      // parent_category: {
      //   _type: "reference",
      //   _ref: category.parent_category_id,
      // },
      // children_categories: category.category_children.map((child) => ({
      //   _type: "reference",
      //   _ref: child.id,
      //   _key: child.id,
      // })),
    };
  };
  private transformCollectionForCreate = (collection: ProductCollectionDTO) => {
    return {
      _type: this.typeMap[SyncDocumentTypes.COLLECTION],
      _id: collection.id,
      internalTitle: collection.title,
      pathname: { _type: "slug", current: "/collections/" + collection.handle },
    };
  };
}
