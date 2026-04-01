/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES } from "@/src/constants/route";
import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { useForgotPasswordMutation } from "@/src/redux/api/authApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { setAuthRedirectField } from "@/src/redux/reducers/authSlice";
import { forgetPasswordSchema } from "@/src/utils/validationSchema";
import { Label } from "@radix-ui/react-label";
import { useFormik } from "formik";
import { ArrowLeft, Key, Lock, Mail, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { DynamicLogo } from "./common/DynamicLogo";

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      try {
        const response = await forgotPassword({ email: values.email }).unwrap();
        toast.success(response.message || t("auth.reset_link_sent"));
        formik.resetForm();
        dispatch(setAuthRedirectField(values.email));
        router.push(ROUTES.OTPVerification);
      } catch (error: any) {
        toast.error(error?.data?.message || t("auth.reset_link_failed"));
      }
    },
  });

  const onNavigateToLogin = () => {
    router.push(ROUTES.Login);
  };

  const steps = [
    { icon: Mail, title: t("auth.step_enter_email"), description: t("auth.step_enter_email_desc") },
    { icon: Key, title: t("auth.step_receive_link"), description: t("auth.step_receive_link_desc") },
    { icon: Lock, title: t("auth.step_reset_password"), description: t("auth.step_reset_password_desc") },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-0 items-stretch">
          <div className="hidden lg:flex flex-col justify-center p-10 bg-linear-to-br from-slate-900 via-slate-800 to-emerald-900 rounded-l-3xl relative overflow-hidden lg:col-span-2 min-h-162.5">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -mr-24 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -ml-32 -mb-32"></div>

            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-3">
                <DynamicLogo />
              </div>

              <div>
                <h2 className="text-3xl text-white leading-tight mb-4">
                  {t("auth.reset_your_password")}
                  <br />
                  <span className="text-emerald-300">{t("auth.in_3_easy_steps")}</span>
                </h2>
                <p className="text-slate-300">{t("auth.recovery_description")}</p>
              </div>

              <div className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                          <Icon className="w-6 h-6 text-emerald-300" />
                        </div>
                        {index < steps.length - 1 && <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-emerald-500/20"></div>}
                      </div>
                      <div className="pt-2">
                        <p className="text-white font-semibold mb-1">{step.title}</p>
                        <p className="text-slate-400 text-sm">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-emerald-200 text-sm font-medium mb-1">{t("auth.security_priority")}</p>
                    <p className="text-slate-300 text-xs">{t("auth.security_description")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white lg:rounded-r-3xl shadow-2xl p-8 lg:p-12 flex flex-col justify-center relative lg:col-span-3 min-h-162.5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-emerald-100/40 to-teal-100/40 rounded-bl-[80px]"></div>

            <div className="relative z-10 max-w-lg mx-auto w-full">
              <Button onClick={onNavigateToLogin} className="bg-transparent hover:bg-gray-100 flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">{t("auth.back_to_login")}</span>
              </Button>

              <div className="lg:hidden flex items-center gap-3 mb-8">
                <DynamicLogo 
                  width={140} 
                  height={40} 
                  className="h-10 w-auto object-contain" 
                  skeletonClassName="h-10 w-32" 
                />
              </div>

              <div className="mb-8">
                <h2 className="text-3xl text-slate-900 font-bold mb-3">{t("auth.forgot_password_title")}</h2>
                <p className="text-slate-600 text-lg">{t("auth.forgot_password_subtitle")}</p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    {t("auth.email_address")}
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                    <Input id="email" type="email" placeholder={t("auth.email_placeholder")} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="pl-12 h-11 border border-(--input-border-color) focus:border-primary rounded-lg text-base" />
                  </div>
                  {formik.touched.email && formik.errors.email ? <p className="text-sm text-red-500 mt-2">{formik.errors.email}</p> : <p className="text-sm text-slate-500 mt-2">{t("auth.enter_email_help")}</p>}
                </div>

                <Button type="submit" className="w-full h-13 bg-primary text-white rounded-lg shadow-lg shadow-emerald-500/30 transition-all text-base font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("auth.sending_instructions")}
                    </div>
                  ) : (
                    t("auth.send_reset_link")
                  )}
                </Button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">{t("auth.tip")}</span> {t("auth.spam_tip")}
                  </p>
                </div>

                <div className="text-center pt-2">
                  <p className="text-slate-600 text-sm">
                    {t("auth.remember_password")}{" "}
                    <Button onClick={onNavigateToLogin} className="bg-transparent hover:bg-transparent px-0 font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                      {t("auth.sign_in_here")}
                    </Button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
