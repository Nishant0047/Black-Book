import React from 'react';
import PCAPUpload from '../components/dashboard/PCAPUpload';
import PageTransition from '../components/ui/PageTransition';

const PcapUploadPage = () => {
    return (
        <PageTransition>
            <PCAPUpload />
        </PageTransition>
    );
};

export default PcapUploadPage;
