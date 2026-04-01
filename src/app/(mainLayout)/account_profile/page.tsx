"use client";

import { Button } from "@/src/elements/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileForm from "@/src/components/profile/ProfileForm";
import ChangePasswordForm from "@/src/components/profile/ChangePasswordForm";
import { useTranslation } from "react-i18next";

const AccountProfilePage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="hover:bg-slate-100 dark:hover:bg-(--table-hover) rounded-full"
        >
          <ArrowLeft size={20} className="text-slate-600 dark:text-gray-400" />
        </Button>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t("profile.account_settings")}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ProfileForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default AccountProfilePage;
