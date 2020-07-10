import Link from "next/link";
import Layout from "../components/Layout";
import React from "react";
import TeamPage from "./TeamPage/TeamPage";
import { initializeStore } from "../lib/redux";
import { initializeApollo } from "../lib/apollo";
import CalendarPage from "./CalendarPage/App";

const EventPage = () => {
    return (
        <Layout title="Event">
            <CalendarPage />
        </Layout>
    );
};
export default EventPage;
