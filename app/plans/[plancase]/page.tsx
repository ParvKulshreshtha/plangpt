"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { planData, PlanInfo } from "../../data/planData";
import PlanChat from "../../components/plans/PlanChat";

export default function PlanCasePage() {
  const params = useParams();
  const [planObject, setPlanObject] = useState<PlanInfo | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.plancase) {
      const plan = planData.find((item) => item.uri === params.plancase);
      setPlanObject(plan);
    }
    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        <p className="text-gray-500">Loading planner...</p>
      </div>
    );
  }

  if (!params?.plancase) {
    return (
      <div className="px-4 py-6">
        <p className="text-xl text-red-500">No plan case provided</p>
      </div>
    );
  }

  if (!planObject) {
    return (
      <div className="px-4 py-6">
        <p className="text-lg text-gray-600">Plan not found.</p>
      </div>
    );
  }

  return <PlanChat plan={planObject} />;
}
