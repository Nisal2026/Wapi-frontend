"use client";

import { useParams } from "next/navigation";
import WidgetPage from "@/src/components/widgets";

const WidgetConfigPage = () => {
    const params = useParams();
    const id = params.id as string;
    
    return <WidgetPage existingId={id} isStandalone />;
};

export default WidgetConfigPage;
