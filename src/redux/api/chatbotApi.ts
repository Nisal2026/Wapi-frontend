import { ChatbotResponse, ChatbotsResponse, ChatbotCreatePayload, ChatbotTrainPayload } from "@/src/types/chatbot";
import { baseApi } from "./baseApi";

export const chatbotApi = baseApi.enhanceEndpoints({ addTagTypes: ["Chatbot"] }).injectEndpoints({
  endpoints: (builder) => ({
    getChatbots: builder.query<ChatbotsResponse, { waba_id: string }>({
      query: (params) => ({
        url: "/chatbot",
        params,
      }),
      providesTags: ["Chatbot"],
    }),
    getChatbotById: builder.query<ChatbotResponse, string>({
      query: (id) => `/chatbot/${id}`,
      providesTags: (result, error, id) => [{ type: "Chatbot", id }],
    }),
    createChatbot: builder.mutation<ChatbotResponse, ChatbotCreatePayload>({
      query: (body) => ({
        url: "/chatbot",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chatbot"],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateChatbot: builder.mutation<ChatbotResponse, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/chatbot/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Chatbot", { type: "Chatbot", id }],
    }),
    deleteChatbot: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/chatbot/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chatbot"],
    }),
    trainChatbot: builder.mutation<ChatbotResponse, { id: string; data: ChatbotTrainPayload }>({
      query: ({ id, data }) => ({
        url: `/chatbot/${id}/train`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Chatbot", { type: "Chatbot", id }],
    }),
    scrapeUrl: builder.mutation<{ success: boolean; data: { text: string } }, { url: string }>({
      query: (body) => ({
        url: "/chatbot/scrape",
        method: "POST",
        body,
      }),
    }),
    extractDocument: builder.mutation<{ success: boolean; data: { text: string } }, FormData>({
      query: (body) => ({
        url: "/chatbot/extract-doc",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetChatbotsQuery,
  useGetChatbotByIdQuery,
  useCreateChatbotMutation,
  useUpdateChatbotMutation,
  useDeleteChatbotMutation,
  useTrainChatbotMutation,
  useScrapeUrlMutation,
  useExtractDocumentMutation,
} = chatbotApi;
