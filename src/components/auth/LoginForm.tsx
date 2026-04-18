import { ROUTES } from "@/src/constants/route";
import { STORAGE_KEYS } from "@/src/constants/storageKeys";
import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { useGetIsDemoModeQuery } from "@/src/redux/api/authApi";
import { useAppSelector } from "@/src/redux/hooks";
import { getStorage } from "@/src/utils";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, Lock, Mail, MessageSquare, Shield, ShieldCheck, TrendingUp, User, Users } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { DynamicLogo } from "./common/DynamicLogo";

const API_URL = process.env.NEXT_PUBLIC_STORAGE_URL ?? "";

const resolveUrl = (url?: string): string => {
  if (!url || url.length <= 0) return "/assets/logos/logo3.png";
  return url.startsWith("http") ? url : `${API_URL}${url}`;
};

const DEFAULT_FAVICON = "/assets/logos/sidebarLogo.png";

function applyFavicon(href: string) {
  if (typeof window === "undefined") return;
  const links = document.querySelectorAll("link[rel*='icon']");
  if (links.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    links.forEach((link: any) => {
      if (link.href !== href) link.href = href;
    });
  } else {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = href;
    document.head.appendChild(link);
  }
}

export const LoginPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleType, setRoleType] = useState<"user" | "agent">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { data: demoModeRes, isSuccess } = useGetIsDemoModeQuery();
  const isDemoMode = demoModeRes?.is_demo_mode ?? false;
  const { authRedirectField } = useAppSelector((state) => state.auth);
  const { allow_user_signup } = useAppSelector((state) => state.setting);

  useEffect(() => {
    if (!demoModeRes || !isSuccess) return;

    const faviconHref = resolveUrl(demoModeRes?.favicon_url) || DEFAULT_FAVICON;
    const apply = () => applyFavicon(faviconHref);

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: false });
    const interval = setInterval(apply, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [demoModeRes, isSuccess]);

  useEffect(() => {
    setEmail(authRedirectField);
  }, [authRedirectField]);

  useEffect(() => {
    const storage = getStorage();
    const rememberMeEnabled = storage.getItem(STORAGE_KEYS.REMEMBER_ME);
    if (rememberMeEnabled === true || rememberMeEnabled === "true") {
      setRememberMe(true);
      const savedEmail = storage.getItem(STORAGE_KEYS.REMEMBER_EMAIL);
      const savedPassword = storage.getItem(STORAGE_KEYS.REMEMBER_PASSWORD);
      const savedRole = storage.getItem(STORAGE_KEYS.REMEMBER_ROLE);

      if (savedEmail) setEmail(savedEmail);
      if (savedPassword) {
        try {
          setPassword(atob(savedPassword));
        } catch {
          setPassword(savedPassword);
        }
      }
      if (savedRole === "user" || savedRole === "agent") setRoleType(savedRole);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      role: roleType,
      redirect: false,
    });

    if (result?.error) {
      setError(result?.error);
      setIsLoading(false);
      return;
    }

    const storage = getStorage();
    if (rememberMe) {
      storage.setItem(STORAGE_KEYS.REMEMBER_ME, true);
      storage.setItem(STORAGE_KEYS.REMEMBER_EMAIL, email);
      storage.setItem(STORAGE_KEYS.REMEMBER_PASSWORD, btoa(password));
      storage.setItem(STORAGE_KEYS.REMEMBER_ROLE, roleType);
    } else {
      storage.removeItem(STORAGE_KEYS.REMEMBER_ME);
      storage.removeItem(STORAGE_KEYS.REMEMBER_EMAIL);
      storage.removeItem(STORAGE_KEYS.REMEMBER_PASSWORD);
      storage.removeItem(STORAGE_KEYS.REMEMBER_ROLE);
    }

    router.push(ROUTES.Dashboard);
    toast.success("Login successful.");
  };

  const onNavigateToRegister = () => {
    router.push(ROUTES.SignUp);
  };

  const onNavigateToForgetPass = () => {
    router.push(ROUTES.ForgotPassword);
  };

  const fillDemoCredentials = () => {
    setEmail(demoModeRes?.demo_user_email || "john@example.com");
    setPassword(demoModeRes?.demo_user_password || "123456789");
    setRoleType("user");
  };

  const fillAgentCredentials = () => {
    setEmail(demoModeRes?.demo_agent_email || "jack@example.com");
    setPassword(demoModeRes?.demo_agent_password || "123456789");
    setRoleType("agent");
  };

  const features = [
    { icon: Users, label: t("auth.active_users"), color: "bg-emerald-500" },
    { icon: MessageSquare, label: t("auth.messages_sent"), color: "bg-blue-500" },
    { icon: TrendingUp, label: t("auth.uptime"), color: "bg-purple-500" },
    { icon: Shield, label: t("auth.bank_security"), color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white-50 to-emerald-50 flex items-center dark:bg-(--page-body-bg) justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-r from-emerald-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-0 items-center">
          <div className="hidden lg:flex flex-col justify-center p-12 bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-800 h-full rounded-tr-none rounded-br-none rounded-3xl relative overflow-hidden min-h-175">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mb-40"></div>
            <div className="absolute top-1/2 right-10 w-2 h-32 bg-white/10 rotate-12"></div>
            <div className="absolute top-1/3 left-10 w-2 h-24 bg-white/10 -rotate-12"></div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DynamicLogo />
                </div>
                <h2 className="text-4xl text-white mt-8 leading-tight">
                  {t("auth.streamline_communications")}
                  <br />
                  <span className="text-emerald-200">{t("auth.business_communications")}</span>
                </h2>
                <p className="text-emerald-100 text-lg">{t("auth.powerful_tools_description")}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                      <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white text-sm font-medium">{feature.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-(--card-color) lg:rounded-br-2xl rounded-tr-2xl shadow-2xl p-8 lg:p-12 min-h-175 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-100 to-blue-100 opacity-50 rounded-bl-full"></div>
            <div className="relative z-10 max-w-md mx-auto w-full">
              <div className="lg:hidden flex items-center gap-3 mb-8">
                <DynamicLogo width={140} height={40} className="h-10 w-auto object-contain" skeletonClassName="h-10 w-32" />
              </div>
              <div className="mb-8">
                <h2 className="text-3xl text-slate-900 font-bold mb-2">{t("auth.welcome_back")}</h2>
                <p className="text-slate-500">{t("auth.sign_in_description")}</p>
              </div>

              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3 flex flex-col">
                  <Label className="text-sm font-medium text-slate-700">{t("auth.select_role", "Choose your workspace")}</Label>
                  <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl relative">
                    <button type="button" onClick={() => setRoleType("user")} className={`relative z-10 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${roleType === "user" ? "text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                      <User className={`w-4 h-4 transition-transform duration-300 ${roleType === "user" ? "scale-110" : "scale-100"}`} />
                      User
                    </button>
                    <button type="button" onClick={() => setRoleType("agent")} className={`relative z-10 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${roleType === "agent" ? "  bg-white text-violet-700 dark:text-violet-400 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                      <ShieldCheck className={`w-4 h-4 transition-transform duration-300 ${roleType === "agent" ? "scale-110" : "scale-100"}`} />
                      Agent
                    </button>
                  </div>
                </div>

                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    {t("auth.email_address")}
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors" />
                    <Input id="email" type="email" placeholder={t("auth.email_placeholder")} value={email} onChange={(e) => setEmail(e.target.value)} className="pl-12 h-11 bg-(--input-color) dark:bg-(--page-body-bg) border border-(--input-border-color) focus:border-primary rounded-lg text-base" required />
                  </div>
                </div>

                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                    {t("auth.password")}
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors" />
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder={t("auth.password_placeholder")} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-12 pr-12 bg-(--input-color) dark:bg-(--page-body-bg) h-11 border border-(--input-border-color) focus:border-primary rounded-lg text-base" required />
                    <Button type="button" onClick={() => setShowPassword(!showPassword)} className="bg-transparent hover:bg-transparent absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                    <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                      {t("auth.keep_signed_in")}
                    </Label>
                  </div>
                  <Button type="button" onClick={onNavigateToForgetPass} className="bg-transparent hover:bg-transparent text-sm font-medium text-primary hover:text-emerald-700 transition-colors">
                    {t("auth.forgot_password")}
                  </Button>
                </div>

                <Button type="submit" className="px-4.5 py-5 h-13 bg-primary hover:to-teal-700 text-white rounded-lg shadow-lg shadow-emerald-500/30 transition-all w-full text-sm font-semibold mb-0!" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("auth.signing_in")}
                    </div>
                  ) : (
                    t("auth.sign_in")
                  )}
                </Button>

                {isDemoMode && (
                  <>
                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-slate-500">{t("auth.or_continue_with")}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 p-3 bg-(--light-primary) rounded-lg border border-[#16a34a33] justify-center flex cursor-pointer dark:bg-transparent dark:border-(--card-border-color)" onClick={fillDemoCredentials}>
                        <p className="text-sm font-semibold text-primary dark:text-gray-400">Demo User</p>
                      </div>
                      <div className="flex-1 p-3 bg-violet-500/10 text-violet-500 rounded-lg border border-violet-200 justify-center flex cursor-pointer dark:bg-transparent dark:border-(--card-border-color)" onClick={fillAgentCredentials}>
                        <p className="text-sm font-semibold text-violet-500 dark:text-gray-400">Demo Agent</p>
                      </div>
                    </div>
                  </>
                )}
              </form>

              {allow_user_signup && (
                <div className="mt-8 text-center">
                  <p className="text-slate-600">
                    {t("auth.new_to_platform")}{" "}
                    <Button onClick={onNavigateToRegister} className="p-0 bg-transparent hover:bg-transparent font-semibold text-primary hover:text-emerald-700 transition-colors">
                      {t("auth.create_account")}
                    </Button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
