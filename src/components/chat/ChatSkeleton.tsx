import { Skeleton } from "@/src/elements/ui/skeleton";

export const ChatSidebarSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ChatMessageSkeleton = () => {
  return (
    <div className="flex-1 space-y-8 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <div className={`space-y-2 max-w-[70%] ${i % 2 === 0 ? "order-1" : "order-2"}`}>
            <Skeleton className={`h-16 w-48 md:w-64 rounded-2xl ${i % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"}`} />
            <div className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
