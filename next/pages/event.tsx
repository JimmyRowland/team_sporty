import Layout from "../components/layouts/index/Layout";
import React from "react";
import CalendarPage from "../components/CalendarPage/CalendarPage";

const EventPage = () => {
    return (
        <Layout title="Event">
            <CalendarPage />
        </Layout>
    );
};
export default EventPage;
