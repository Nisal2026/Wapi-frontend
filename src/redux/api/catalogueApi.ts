import { AvailableCatalogue, Catalogue, Pagination, Product } from "@/src/types/components/catalogue";
import { baseApi } from "./baseApi";

export const catalogueApi = baseApi.enhanceEndpoints({ addTagTypes: ["Catalogue", "Product"] }).injectEndpoints({
  endpoints: (builder) => ({
    getWABACatalogs: builder.query<{ success: boolean; data: { data: AvailableCatalogue[]; paging?: { cursors: { before: string; after: string } } } }, { waba_id: string }>({
      query: ({ waba_id }) => `/catalogue/waba/${waba_id}/catalogs`,
      providesTags: ["Catalogue"],
    }),
    syncCatalogs: builder.mutation<{ success: boolean; message: string }, { waba_id: string }>({
      query: ({ waba_id }) => ({
        url: `/catalogue/waba/${waba_id}/sync-catalogs`,
        method: "POST",
      }),
      invalidatesTags: ["Catalogue"],
    }),
    linkCatalogToWABA: builder.mutation<{ success: boolean; message: string; data: Catalogue }, { waba_id: string; catalog_id: string }>({
      query: (data) => ({
        url: "/catalogue/link-catalog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Catalogue"],
    }),
    getLinkedCatalogs: builder.query<{ success: boolean; data: { catalogs: Catalogue[]; pagination: Pagination } }, { waba_id: string; search?: string; page?: number; limit?: number }>({
      query: ({ waba_id, ...params }) => ({
        url: `/catalogue/waba/${waba_id}/linked-catalogs`,
        params,
      }),
      providesTags: ["Catalogue"],
    }),
    getProductsFromCatalog: builder.query<{ success: boolean; data: { products: Product[]; pagination: Pagination } }, { catalog_id: string; search?: string; page?: number; limit?: number }>({
      query: ({ catalog_id, ...params }) => ({
        url: `/catalogue/catalog/${catalog_id}/products`,
        params,
      }),
      providesTags: ["Product"],
    }),
    createProductInCatalog: builder.mutation<{ success: boolean; message: string; data: Product }, { catalog_id: string; data: Partial<Product> }>({
      query: ({ catalog_id, data }) => ({
        url: `/catalogue/catalog/${catalog_id}/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProductInCatalog: builder.mutation<{ success: boolean; message: string; data: Product }, { catalog_id: string; product_id: string; data: Partial<Product> }>({
      query: ({ catalog_id, product_id, data }) => ({
        url: `/catalogue/catalog/${catalog_id}/products/${product_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProductFromCatalog: builder.mutation<{ success: boolean; message: string; data: { id: string } }, { catalog_id: string; product_id: string }>({
      query: ({ catalog_id, product_id }) => ({
        url: `/catalogue/catalog/${catalog_id}/products/${product_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetWABACatalogsQuery, useSyncCatalogsMutation, useLinkCatalogToWABAMutation, useGetLinkedCatalogsQuery, useGetProductsFromCatalogQuery, useCreateProductInCatalogMutation, useUpdateProductInCatalogMutation, useDeleteProductFromCatalogMutation } = catalogueApi;
