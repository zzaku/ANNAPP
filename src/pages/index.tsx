import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import CountryCard from '../components/CountryCard';
import { fetchCountries } from '../utils/api';
import Loading from '../components/Loading';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 }
};

const Home = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } finally {
        setLoading(false); 
      }
    };

    getCountries();
  }, []);


  return (
    <>
      <Container>
        <Typography variant="h3" gutterBottom>
          Countries
        </Typography>

        {loading ? (
          <Loading />
        ) : (
          <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >

            <Grid container spacing={3}>
              {countries.map((country) => (
                <Grid item xs={12} sm={6} md={4} key={country.cca3}>
                  <motion.div variants={itemVariants}>
                    <CountryCard
                      code={country.cca3}
                      name={country.translations.fra.common}
                      region={country.region}
                      flag={country.flags.png}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
        </motion.div>
        )}
      </Container>
    </>
  );
};

export default Home;
