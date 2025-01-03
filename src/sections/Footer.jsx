import React from 'react';
import {
    Box,
    Link,
    Typography,
} from '@mui/material';

const Footer = ({contactRef}) => {
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
            }}
            ref={contactRef}
        >
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

export default Footer;