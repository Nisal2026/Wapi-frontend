import React from "react";
import { usePermissions } from "@/src/hooks/usePermissions";

interface CanProps {
  permission?: string;
  anyPermission?: string[];
  module?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const Can: React.FC<CanProps> = ({ permission, anyPermission, module, children, fallback = null }) => {
  const { hasPermission, hasAnyPermission, hasModulePermission } = usePermissions();

  let allowed = false;
  if (permission) {
    allowed = hasPermission(permission);
  } else if (anyPermission) {
    allowed = hasAnyPermission(anyPermission);
  } else if (module) {
    allowed = hasModulePermission(module);
  } else {
    allowed = true;
  }

  return allowed ? <>{children}</> : <>{fallback}</>;
};

export default Can;
