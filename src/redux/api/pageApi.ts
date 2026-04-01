import { baseApi } from "./baseApi";
import { Page, GetPagesResponse } from "../../types/pages";

export const pageApi = baseApi.enhanceEndpoints({ addTagTypes: ["Page"] }).injectEndpoints({
  endpoints: (builder) => ({
    getPublicPages: builder.query<GetPagesResponse, void>({
      query: () => "/pages?status=true",
      providesTags: (result) => (result ? [...result.data.pages.map(({ _id }) => ({ type: "Page" as const, id: _id })), { type: "Page", id: "LIST" }] : [{ type: "Page", id: "LIST" }]),
    }),
    getPublicPageBySlug: builder.query<{ success: boolean; data: Page }, string>({
      query: (slug) => `/pages/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Page", id: slug }],
    }),
  }),
});

export const { useGetPublicPagesQuery, useGetPublicPageBySlugQuery } = pageApi;
