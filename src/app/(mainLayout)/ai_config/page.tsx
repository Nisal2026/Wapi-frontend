"use client";

import SetupManager from "@/src/components/feature/setup/SetupManager";
import { useTranslation } from "react-i18next";

const SetupPage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">{t("setup.title")}</h1>
        <p className="text-slate-500 text-sm dark:text-gray-500">{t("setup.subtitle")}</p>
      </div>

      <SetupManager />
    </div>
  );
};

export default SetupPage;
