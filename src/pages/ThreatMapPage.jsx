import React from 'react';
import ThreatMap from '../components/dashboard/ThreatMap';
import PageTransition from '../components/ui/PageTransition';

const ThreatMapPage = () => {
    return (
        <PageTransition>
            <ThreatMap />
        </PageTransition>
    );
};

export default ThreatMapPage;
