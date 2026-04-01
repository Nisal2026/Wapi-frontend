// Layout and navigation types

export interface NoInternetPageProps {
  title?: string;
  content?: string;
  imageUrl?: string;
}

export interface InternetConnectionWrapperProps {
  children: React.ReactNode;
}

export interface MaintenancePageProps {
  title?: string;
  message?: string;
  imageUrl?: string;
}

export interface MaintenanceGuardProps {
  children: React.ReactNode;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

export interface RoleGuardProps {
  children: React.ReactNode;
}

export interface SubscriptionGuardProps {
  children: React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
