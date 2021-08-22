import CardSkeleton from "./CardSkeleton";

export default function MainSkeletonPage() {
  return (
    <div className="flex flex-col gap-4 p-10 flex-grow min-w-screen">
      <div className="flex flex-col gap-2 items-center">
        <div className="w-48 h-12 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-64 sm:w-96 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>

      <div className="flex flex-col self-center gap-2 w-full md:w-2/3 lg:w-1/2">
        <div className="flex flex-col gap-1 flex-grow">
          <div className="h-5 w-12 rounded bg-gray-300 animate-pulse" />

          <div className="bg-gray-300 appearance-none outline-none px-4 py-1 rounded focus:ring focus:bg-gray-300 duration-75 w-full h-8 animate-pulse" />
        </div>

        <div className="py-2 px-4 bg-gray-200 rounded w-1/2 self-center h-10" />
      </div>

      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}