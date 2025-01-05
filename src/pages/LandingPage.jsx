import React, { useRef } from 'react';
import {
    Box
} from '@mui/material';

import WelcomeSection from '../sections/WelcomeSection';
import SearchSection from '../sections/SearchSection';
import Footer from '../sections/Footer';

const LandingPage = () => {

    const searchRef = useRef(null);
    const contactRef = useRef(null);
    const scrollToSearch = () => searchRef.current.scrollIntoView({behavior: 'smooth'});
    const scrollToContact = () => contactRef.current.scrollIntoView({behavior: 'smooth'});

    return (
        <Box>
            <WelcomeSection
                scrollToSearch={scrollToSearch}
                scrollToContact={scrollToContact}
            />
            <SearchSection searchRef={searchRef}/>
            <Footer contactRef={contactRef}/>
        </Box>
    );
};

export default LandingPage;
