import React from "react";
import CustomHead from "./CustomHead";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
    name: string;
    children: React.ReactNode
}

export default function GrantPage(props: Props) {
    return (
        <div className="flex flex-col bg-gray-50 min-h-screen">
            <CustomHead pageName={props.name} />

            <Navbar />

            {props.children}

            <Footer />
        </div>
    )
}
