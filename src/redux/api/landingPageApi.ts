import { baseApi } from "./baseApi";
import { GetLandingPageResponse } from "../../types/landingPage";

export const landingPageApi = baseApi.enhanceEndpoints({ addTagTypes: ["LandingPage"] }).injectEndpoints({
  endpoints: (builder) => ({
    getLandingPage: builder.query<GetLandingPageResponse, void>({
      query: () => "/landing-page",
      providesTags: ["LandingPage"],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateLandingPage: builder.mutation<any, any>({
      query: (body) => ({
        url: "/landing-page",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["LandingPage"],
    }),
    uploadLandingImage: builder.mutation<{ url: string }, FormData>({
      query: (body) => ({
        url: "/landing-page/upload-image",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { 
  useGetLandingPageQuery, 
  useUpdateLandingPageMutation, 
  useUploadLandingImageMutation 
} = landingPageApi;
