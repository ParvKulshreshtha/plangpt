"use client";

import { useRouter } from "next/navigation";
import { planData, PlanInfo } from "../data/planData";

export default function Plans() {
  const router = useRouter();

  return (
    <div className="font-sans"> {/* Updated background color */}
      {/* Heading Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neon-pink">
          Our Plans
        </h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto text-electric-blue">
          Explore all available plans. Find the one that fits your needs.
        </p>
      </div>

      {/* Main Content Section */}
      <main className="p-6 sm:p-8 lg:p-12">
        <div className="flex flex-wrap gap-6 justify-center">
          {planData?.map((planObject: PlanInfo) => (
            <div 
              key={planObject.uri}
              onClick={() => router.push(`/plans/${planObject.uri}`)}
              className="w-full sm:w-80 lg:w-96 bg-white border border-electric-blue rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              <img
                src={planObject.image !== "" ? planObject.image : "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg"}
                alt={planObject.useCase}
                className="w-full h-60 object-cover mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-neon-pink mb-2">
                  {planObject.useCase}
                </h3>
                <p className="text-sm sm:text-base text-electric-blue mb-4">
                  {planObject.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
