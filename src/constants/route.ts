export const ROUTES = {
  Landing: "/landing",
  Dashboard: "/dashboard",
  Login: "/auth/login",
  SignUp: "/auth/register",
  ForgotPassword: "/auth/forgot_password",
  OTPVerification: "/auth/verify_otp",
  ResetPassword: "/auth/reset_password",
  Subscription: "/subscriptions",
  BotFlow: "/flow_builder",
  BuilderBotFlow: "/flow_builder/builder",
  ManageWaba: "/manage_waba",
  Teams: "/teams",
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ImagePath: string = "/assets/images";
export const ImageBaseUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
