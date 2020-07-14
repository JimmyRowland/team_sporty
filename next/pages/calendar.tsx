import Layout from "../components/Layout";
import React from "react";
import CalendarPage from "./CalendarPage/App";

const EventsPage = () => {
    return (
        <Layout title="Calendar">
            <CalendarPage />
        </Layout>
    );
};
export default EventsPage;

