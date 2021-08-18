import { GetStaticProps, GetStaticPaths } from 'next';

import marked from 'marked';
import getAllGrants from '../util/getAllGrants';
import getGrantInfo from '../util/getGrantInfo';

import Grant from "../components/GrantType";
import Layout from "../components/Layout";

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

export default function GrantPage(props: Props) {
    return (
        <Layout name={props.grantInfo.name}>
            <div className="flex flex-col gap-4 p-10 min-h-screen min-w-screen">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl text-black font-bold text-center">Grant Page</h1>
                    <p className="text-md text-gray-600 text-center">e</p>
                </div>
            </div>
        </Layout>
    )
}
