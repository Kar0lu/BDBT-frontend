import React, {useState, useRef, useContext} from 'react';
import bgImage from '../assets/landing_bg.png';
import cardImage from '../assets/car.png';
import AuthContext from '../context/AuthContext'
import {
    Box,
    Button,
    Link,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    TextField,
    MenuItem,
    Modal,
    Tooltip
} from '@mui/material';

const CarModal = ({modalOpen, handleModalClose}) => {
    let {user} = useContext(AuthContext)

    return (
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
            overflowY: 'auto'
        }}>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                boxShadow: 24,
                p: 4,
                maxWidth: '800px',
                mx: 'auto',
                borderRadius: '8px',
                my: 4,

            }}>
                <img
                    src={cardImage}
                    alt="Car placeholder"
                    style={{
                    width: '100%',
                    borderRadius: '8px',
                    objectFit: 'cover'
                }}/>
                <Typography
                    variant="h4"
                    sx={{
                    mt: 2,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    Ford Mustang GT
                </Typography>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    mt: 2
                }}>
                    <Box sx={{
                        flex: 2
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                            fontWeight: 'bold',
                            mb: 1
                        }}>
                            Opis
                        </Typography>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu ex sed
                            ipsum porttitor consequat et sit amet enim. Vestibulum mattis auctor lobortis.
                        </Typography>
                    </Box>
                    <Box sx={{
                        flex: 1
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                            fontWeight: 'bold',
                            mb: 1
                        }}>
                            Dane techniczne
                        </Typography>
                        <ul
                            style={{
                            paddingLeft: 0,
                            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                            fontSize: '1rem',
                            lineHeight: 1.5
                        }}>
                            <li>Stan: nowy</li>
                            <li>Rok produkcji: 2024</li>
                            <li>Paliwo: benzyna</li>
                            <li>Skrzynia: automatyczna</li>
                            <li>Moc: 265</li>
                            <li>Ilość miejsc: 5</li>
                            <li>Spalanie: 10.3 l/km</li>
                            <li>Pojemność silnika: 2.0</li>
                        </ul>
                    </Box>
                </Box>
                <Tooltip placement="top" title={user=='admin' && "Opcja tylko dla zwykłych użytkowników" || !user && "Opcja tylko dla zalogowanych użytkowników"} disableInteractive>
                    <span>
                    <Button variant="contained" disabled={!user&&user!='admin'} sx={{mt:2}}>
                        Umów się na jazdę próbną
                    </Button>
                    </span>
                </Tooltip>
            </Box>
        </Modal>
    );
};

const WelcomeSection = ({scrollToSearch, scrollToContact}) => {
    return (
        <Box
            sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                md: '3fr 2fr'
            },
            gap: 4,
            p: 4,
            alignItems: 'center'
        }}>
            <Box>
                <Typography variant="h1" fontWeight="bold">
                    WrumWrum
                </Typography>
                <Typography variant="h4">
                    Znajdź swoje wymarzone auto już dziś!
                </Typography>
                <Box sx={{
                    mt: 2
                }}>
                    <Button
                        variant="outlined"
                        onClick={scrollToContact}
                        sx={{
                        mr: 2
                    }}>
                        Kontakt
                    </Button>
                    <Button variant="outlined" onClick={scrollToSearch}>Wyszukiwarka</Button>
                </Box>
            </Box>
            <Box>
                <img
                    src={bgImage}
                    alt="Car"
                    style={{
                    width: '100%',
                    borderRadius: '8px'
                }}/>
            </Box>
        </Box>
    );
};

const SearchSection = () => {
    return (
        <Box sx={{
            p: 4
        }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
                Hiper-wyszukiwarka
            </Typography>
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: 'repeat(6, 1fr)'
                },
                gap: 2,
                mt: 2
            }}>
                {['Marka', 'Model', 'Rocznik', 'Cena od', 'Cena do'].map((label, index) => (
                    <TextField
                        key={index}
                        select={['Marka', 'Model', 'Rocznik'].includes(label)}
                        label={label}
                        variant="outlined"
                        fullWidth>
                        {['Option 1', 'Option 2', 'Option 3'].map((option, idx) => (
                            <MenuItem value={option} key={idx}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                ))}
                <Button variant="outlined" fullWidth>
                    SZUKAJ
                </Button>
            </Box>
        </Box>
    );
};

const CardSection = ({handleModalOpen}) => {
    return (
        <Box sx={{
            p: 4
        }}>
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: 'repeat(3, 1fr)'
                },
                gap: 4
            }}>
                {[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                ].map((item) => (
                    <Card key={item}>
                        <CardActionArea onClick={handleModalOpen}>
                            <CardMedia component="img" height="200" image={cardImage} alt={`Car ${item}`}/>
                            <CardContent>
                                <Typography variant="h6">Car {item}</Typography>
                                <Typography variant="body2">Description of Car {item}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

const Footer = () => {
    return (
        <Box
            sx={{
            backgroundColor: "#0d1117",
            color: "#fff",
            padding: "40px 20px",
            display: "flex",
            flexDirection: {
                xs: "column",
                md: "row"
            },
            justifyContent: "space-between",
            gap: "20px"
        }}>
            {/* Section 1: About Us */}
            <Box sx={{
                flex: 2
            }}>
                <Typography
                    variant="h6"
                    sx={{
                    fontWeight: "bold",
                    marginBottom: 2
                }}>
                    O nas
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                    lineHeight: 1.8
                }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu ex sed
                    ipsum porttitor consequat et sit amet enim. Vestibulum mattis auctor lobortis.
                    Nulla ac ligula metus. Integer sed fermentum magna, quis iaculis diam. Etiam
                    dictum maximus enim at tempor. Vivamus dictum purus velit, nec gravida tortor
                    commodo ut. Maecenas in est vel ipsum varius finibus fermentum vitae lorem.
                </Typography>
            </Box>

            {/* Section 2: Company Info */}
            <Box sx={{
                flex: 1
            }}>
                <Typography
                    variant="h6"
                    sx={{
                    fontWeight: "bold",
                    marginBottom: 2
                }}>
                    Dane firmy
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                    lineHeight: 1.8
                }}>
                    WrumWrum Sp. z o.o.
                    <br/>
                    ul. Niewiadomo Jaka 9, 05-200 Wołomin
                    <br/>
                    KRS 0000921921, NIP 1251206115
                    <br/>
                    +48 123 456 789,{" "}
                    <Link href="mailto:kontakt@wrumwrum.pl" underline="hover" color="inherit">
                        kontakt@wrumwrum.pl
                    </Link>
                </Typography>
            </Box>

            {/* Section 3: Important Links */}
            <Box sx={{
                flex: 1
            }}>
                <Typography
                    variant="h6"
                    sx={{
                    fontWeight: "bold",
                    marginBottom: 2
                }}>
                    Ważne linki
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                    lineHeight: 2
                }}>
                    <Link href="#" underline="hover" color="inherit">
                        Ważny link 1
                    </Link>
                    <br/>
                    <Link href="#" underline="hover" color="inherit">
                        Ważny link 2
                    </Link>
                    <br/>
                    <Link href="#" underline="hover" color="inherit">
                        Ważny link 3
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

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
                scrollToContact={scrollToContact}/>
            <Box ref={searchRef}>
                <SearchSection/>
            </Box>
            <CardSection handleModalOpen={handleModalOpen}/>
            <Box ref={contactRef}>
                <Footer/>
            </Box>
        </Box>
    );
};

export default LandingPage;
