export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#fdfbf9] px-4 md:px-6 py-12 flex flex-col items-center justify-center animate-pulse">
      {/* Sleek, professional global skeleton loader */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-8">
        
        {/* Placeholder Logo / Brand */}
        <div className="h-10 w-48 bg-gray-200/60 rounded-full mb-12"></div>
        
        {/* Skeleton content blocks */}
        <div className="w-full space-y-3 flex flex-col items-center">
          <div className="h-6 w-3/4 md:w-1/2 bg-gray-200/60 rounded-lg"></div>
          <div className="h-6 w-2/4 md:w-1/3 bg-gray-200/60 rounded-lg"></div>
        </div>

        {/* Skeleton Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-12">
          <div className="h-56 bg-white shadow-sm border border-gray-100 rounded-3xl p-6 flex flex-col justify-end">
             <div className="h-4 w-1/2 bg-gray-100 rounded-full mb-2"></div>
             <div className="h-4 w-3/4 bg-gray-100 rounded-full"></div>
          </div>
          <div className="h-56 bg-white shadow-sm border border-gray-100 rounded-3xl p-6 flex flex-col justify-end hidden sm:flex">
             <div className="h-4 w-1/2 bg-gray-100 rounded-full mb-2"></div>
             <div className="h-4 w-3/4 bg-gray-100 rounded-full"></div>
          </div>
          <div className="h-56 bg-white shadow-sm border border-gray-100 rounded-3xl p-6 flex flex-col justify-end hidden md:flex">
             <div className="h-4 w-1/2 bg-gray-100 rounded-full mb-2"></div>
             <div className="h-4 w-3/4 bg-gray-100 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}