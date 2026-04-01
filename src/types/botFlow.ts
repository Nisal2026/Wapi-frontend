export interface BaseNodeProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  borderColor?: string;
  handleColor?: string;
  errors?: string[];
  children: React.ReactNode;
  showInHandle?: boolean;
  showOutHandle?: boolean;
  headerRight?: React.ReactNode;
  className?: string;
}

export interface NodeFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
}