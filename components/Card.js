import Image from 'next/image'
import Link from 'next/link'

import dayjs from 'dayjs';

export default function Card({ title, image, subtitle, tag, href }) {
    // const dateCreatedPreparedString = dayjs(dateCreated).format("DD/MM/YYYY");

    return (
        <div className="flex flex-col md:flex-row md:justify-start gap-4 rounded-lg bg-gray-200 p-2 lg:p-6 duration-300">
            <Image src={image} className="rounded-lg z-10 bg-blue-200" alt={title} objectFit="contain" objectPosition="center" width={150} height={150} />
            <div className="flex flex-col items-center md:items-start gap-2 lg:gap-4 w-full">
                <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between w-full items-center gap-1 lg:gap-2">
                    <div>
                        <h1 className="text-xl text-black text-center md:text-left font-semibold">{title}</h1>
                        <h2 className="text-md text-left text-center md:text-left text-gray-500">
                            {tag}
                        </h2>
                    </div>
                </div>

                <p className="break-words text-center md:text-left">
                    {subtitle}
                </p>

                <Link to={href} href={href} passHref>
                    <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold w-24 h-8 rounded duration-300 mt-2">View More</button>
                </Link>
            </div>
        </div>
    );
}