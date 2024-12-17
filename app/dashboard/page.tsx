import React from "react";
import { requireUser } from "../lib/hooks";

const DashboardPage = async () => {
  const session = await requireUser();

  return <div>dash </div>;
};

export default DashboardPage;
