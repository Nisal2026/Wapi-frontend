/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";
import { SubscriptionResponse, CreateSubscriptionResponse, CancelSubscriptionResponse } from "@/src/types/subscription";

export const subscriptionApi = baseApi.enhanceEndpoints({ addTagTypes: ["Subscription"] }).injectEndpoints({
  endpoints: (builder) => ({
    getUserSubscription: builder.query<SubscriptionResponse, void>({
      query: () => "/subscription/my-subscription",
      providesTags: ["Subscription"],
    }),
    createStripeSubscription: builder.mutation<CreateSubscriptionResponse, { plan_id: string }>({
      query: (body) => ({
        url: "/subscription/create-stripe",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),
    createRazorpaySubscription: builder.mutation<CreateSubscriptionResponse, { plan_id: string }>({
      query: (body) => ({
        url: "/subscription/create-razorpay",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),
    createManualSubscription: builder.mutation<CreateSubscriptionResponse, any>({
      query: (body) => ({
        url: "/subscription/create-manual",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),
    createPayPalSubscription: builder.mutation<CreateSubscriptionResponse, { plan_id: string }>({
      query: (body) => ({
        url: "/subscription/create-paypal",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),
    changePlanSubscription: builder.mutation<CreateSubscriptionResponse, { id: string; new_plan_id: string }>({
      query: ({ id, new_plan_id }) => ({
        url: `/subscription/${id}/change-plan`,
        method: "POST",
        body: { new_plan_id },
      }),
      invalidatesTags: ["Subscription"],
    }),
    cancelSubscription: builder.mutation<CancelSubscriptionResponse, { id: string | undefined; cancel_at_period_end: boolean }>({
      query: ({ id, cancel_at_period_end }) => ({
        url: `/subscription/${id}/cancel`,
        method: "POST",
        body: { cancel_at_period_end },
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const { useGetUserSubscriptionQuery, useCreateStripeSubscriptionMutation, useCreateRazorpaySubscriptionMutation, useCreateManualSubscriptionMutation, useCreatePayPalSubscriptionMutation, useChangePlanSubscriptionMutation, useCancelSubscriptionMutation } = subscriptionApi;
