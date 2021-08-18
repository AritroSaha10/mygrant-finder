import { GetStaticProps, GetStaticPaths } from 'next';
import Link from "next/link";
import Image from 'next/image';

import marked from 'marked';
import getAllGrants from '../../util/getAllGrants';
import getGrantInfo from '../../util/getGrantInfo';

import Grant from "../../components/GrantType";
import Layout from "../../components/Layout";

import dayjs from 'dayjs';

import markdownCSS from "../../styles/markdown.module.css";

export const getStaticPaths: GetStaticPaths = async (context) => {
    const allGrantsRaw = await getAllGrants();

    const allGrants = allGrantsRaw.map((fname) => ({
        params: {
            grant: fname.toString()
        }
    }));

    return {
        paths: allGrants,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    let grantInfo = await getGrantInfo(context.params.grant);

    // Parse markdown in description
    const descriptionMarked = marked(grantInfo.longDescription);

    grantInfo.longDescription = descriptionMarked;

    return {
        props: {
            grantInfo
        }
    }
}

interface Props {
    grantInfo: Grant;
}

export default function GrantPage({ grantInfo }: Props) {
    const dateCreatedPreparedString = dayjs(grantInfo.dateCreated).format("DD/MM/YYYY");

    return (
        <Layout name={grantInfo.name}>
            <div className="min-h-screen min-w-screen">
                <header className="flex flex-col items-center px-10 py-2 lg:px-20 lg:py-4 xl:px-60 xl:py-6 bg-gray-200">
                    <h1 className="text-black text-center text-4xl font-bold">Grants</h1>
                    <Link href="/">
                        <a className="text-blue-500 hover:text-blue-600 font-semibold py-2 px-4 hover:underline">View All</a>
                    </Link>
                </header>

                <div className="flex flex-col lg:flex-row px-10 py-2 lg:px-20 lg:py-4 xl:px-60 xl:py-10 items-center">
                    <Image src={grantInfo.img} className="w-1/5 rounded-md" alt="Featured image" height={500} width={400} objectPosition="center" objectFit="cover" />
                    <div className="lg:ml-5 flex flex-col w-4/5 items-center lg:items-start">
                        <h1 className="text-black text-4xl font-semibold text-center">{grantInfo.name}</h1>
                        <h3 className="text-gray-500 text-md text-center">{dateCreatedPreparedString}</h3>

                        <br />

                        {/* This makes sure that all external links in the description open another tab */}
                        <base target="_blank" />

                        <div className={` ${markdownCSS.markdown}`} dangerouslySetInnerHTML={{ __html: grantInfo.longDescription }} />
                    </div>
                </div>

            </div>
        </Layout>
    )
}
