import React, {useState, useRef} from 'react';
import {
    Box
} from '@mui/material';

import WelcomeSection from '../sections/WelcomeSection';
import SearchSection from '../sections/SearchSection';
import CardSection from '../sections/CardSection';
import Footer from '../sections/Footer';

import CarModal from '../modals/CarModal';

const LandingPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const searchRef = useRef(null);
    const contactRef = useRef(null);
    const scrollToSearch = () => searchRef.current.scrollIntoView({behavior: 'smooth'});
    const scrollToContact = () => contactRef.current.scrollIntoView({behavior: 'smooth'});

    return (
        <Box>
            <CarModal modalOpen={modalOpen} handleModalClose={handleModalClose}/>
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
