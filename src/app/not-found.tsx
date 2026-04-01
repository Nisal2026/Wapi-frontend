"use client";

import { Button } from "@/src/elements/ui/button";
import { useAppSelector } from "@/src/redux/hooks";
import { ArrowLeft, Home, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const { page_404_title, page_404_content } = useAppSelector((state) => state.setting);

  return (
    <div className="min-h-screen bg-page-body flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-primary animate-pulse">404</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-gray-300">{page_404_title || "Page Not Found"}</h2>
          <p className="text-lg text-gray-600 mb-2 dark:text-gray-400">{page_404_content || "Oops! The page you're looking for doesn't exist."}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">It might have been moved, deleted, or the URL might be incorrect.</p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-(--text-green-primary)" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={() => router.back()} variant="outline" className="flex items-center gap-2 px-6 py-5 rounded-lg border-2 border-gray-300 dark:border-(--card-border-color) dark:bg-(--card-color) dark:hover:bg-(--dark-sidebar) hover:border-(--text-green-primary) hover:text-(--text-green-primary) transition-colors">
            <ArrowLeft className="w-4 h-full" />
            Go Back
          </Button>
          <Button onClick={() => router.push("/dashboard")} className="flex items-center h-full! rounded-lg dark:hover:bg-primary cursor-pointer dark:border-gray-800 last:border-b-0 gap-2 px-6 py-3 bg-primary hover:bg-primary text-white transition-all">
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
