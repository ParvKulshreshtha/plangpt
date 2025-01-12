"use client"

import { useRouter } from "next/navigation";
import { planData, PlanInfo } from "./data/planData";

export default function Home() {
  const router = useRouter()
  return (
    <div className="">
      <main className="p-4">
      <div className="flex flex-wrap gap-6 justify-center">
        {planData?.map((data:PlanInfo) => (
          <div 
            key={data.uri}
            onClick={() => router.push(`/${data.uri}`)}
            className="max-w-xs border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
            <img 
              src={data.image} 
              alt={data.useCase} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {data.useCase}
              </h3>
              <p className="text-sm text-gray-600">
                {data.description}
              </p>
            </div>
          </div>
            ))}
      </div>
      </main>
    </div>
  );
}
