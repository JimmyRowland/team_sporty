import React, { ReactNode } from "react";
import Header from "../../Header/Header";
import Layout from "../Layout";

type Props = {
    children?: ReactNode;
    title?: string;
};

const IndexLayout = ({ children, title = "Team Sporty" }: Props) => {
    return (
        <Layout title={title}>
            <header>
                <Header />
            </header>
            {children}
        </Layout>
    );
};

export default IndexLayout;
