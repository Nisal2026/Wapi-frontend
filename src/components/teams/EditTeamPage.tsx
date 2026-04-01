"use client";

import { useParams } from "next/navigation";
import TeamForm from "./TeamForm";

const EditTeamPage = () => {
  const { id } = useParams();

  return <TeamForm id={id as string} isEdit={true} />;
};

export default EditTeamPage;
