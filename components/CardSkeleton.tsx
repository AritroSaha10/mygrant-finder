export default function CardSkeleton() {
    return (
        <div className="flex flex-row justify-start gap-4 rounded-lg bg-gray-200 p-2 lg:p-6">
            <div className="rounded-lg w-24 h-24 md:w-36 md:h-36 bg-gray-300" />
            <div className="flex flex-col items-start gap-2 lg:gap-4 w-full">
                <div className="flex flex-col gap-1">
                        <div className="h-7 w-24 bg-gray-300 rounded animate-pulse" />
                        <div className="h-6 w-12 bg-gray-300 rounded animate-pulse" />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <div className="h-4 w-3/4 lg:w-1/2 bg-gray-300 animate-pulse" />
                    <div className="h-4 w-3/4 lg:w-1/2 bg-gray-300 animate-pulse" />
                    <div className="h-4 w-1/2 lg:w-1/4 bg-gray-300 animate-pulse" />
                </div>

                <div className="text-sm bg-blue-500 text-white font-bold w-24 h-8 rounded duration-300 mt-2" />
            </div>
        </div>
    );
}