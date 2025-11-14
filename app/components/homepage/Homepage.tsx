"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { PlanInfo, planData } from '@/app/data/planData';


const Homepage = () => {
    const router = useRouter();
    
  return (
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
            } } />
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

    {/* View More Button */}
    <div className="flex justify-center mt-8">
      <button
        onClick={() => router.push('/plans')}
        className="bg-neon-green text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-electric-blue transition duration-300"
      >
        View More
      </button>
    </div>
  </main>
  )
}

export default Homepage
