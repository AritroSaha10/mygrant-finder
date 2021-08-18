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
        <div className="bg-gray-50">
            <CustomHead pageName={props.name} />

            <Navbar />

            {props.children}

            <Footer />
        </div>
    )
}
