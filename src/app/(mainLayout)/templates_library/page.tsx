import { redirect } from "next/navigation";

const Page = () => {
  // The admin template library has been merged into the unified /templates page
  redirect("/templates?tab=explore");
};

export default Page;
