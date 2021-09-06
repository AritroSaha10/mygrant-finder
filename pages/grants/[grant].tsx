import { GetStaticProps, GetStaticPaths } from 'next';
import Link from "next/link";
import Image from 'next/image';

import marked from 'marked';
import getAllGrantsAirtable from '../../util/getAllGrantsAirtable';
import getGrantInfoAirtable from "../../util/getGrantInfoAirtable";

import Grant from "../../components/GrantType";
import Layout from "../../components/Layout";

import markdownCSS from "../../styles/markdown.module.css";
import { RiExternalLinkFill } from "react-icons/ri";

export const getStaticPaths: GetStaticPaths = async (context) => {
    const allGrantsRaw = await getAllGrantsAirtable();

    const allGrants = allGrantsRaw.map(({ objectID }) => ({
        params: {
            grant: objectID.toString()
        }
    }));

    return {
        paths: allGrants,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    let grantInfo = await getGrantInfoAirtable(context.params.grant);

    if (grantInfo.description) {
        // Parse markdown in description
        // @ts-ignore Weird typechecking here
        const descriptionMarked = marked(grantInfo.description);
        grantInfo.description = descriptionMarked;
    } else {
        grantInfo.description = "There seems to be no description. Try clicking the 'Learn More' button for more information.";
    }

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
                        <h3 className="text-gray-500 text-md text-center"></h3>
                        <h3 className="text-gray-500 text-md text-center">
                            <span>Source: {grantInfo.source}</span>
                            {" "} | {" "}
                            <span>Category: {grantInfo.category}</span>
                        </h3>

                        <br />

                        {/* This makes sure that all external links in the description open another tab */}
                        <base target="_blank" />

                        <div className={` ${markdownCSS.markdown}`} dangerouslySetInnerHTML={{ __html: grantInfo.description }} />

                        <br />

                        <a className="flex items-center gap-2 text-2xl text-blue-400 hover:underline focus:underline cursor-pointer" href={grantInfo.link} target="_blank" rel="noreferrer">
                            <span>Learn More</span> <RiExternalLinkFill />
                        </a>
                    </div>
                </div>

            </div>
        </Layout>
    )
}
