import React from 'react';
import EventStreamVisualizer from '../components/dashboard/EventStreamVisualizer';
import PageTransition from '../components/ui/PageTransition';

const EventStreamPage = () => {
    return (
        <PageTransition>
            <EventStreamVisualizer />
        </PageTransition>
    );
};

export default EventStreamPage;
