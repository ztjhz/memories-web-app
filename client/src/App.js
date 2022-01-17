import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from './Components/Posts/Posts';
import Form from './Components/Form/Form';
import memories from './images/memories.png';
import useStyles from './styles';
import { createTheme, ThemeProvider } from '@material-ui/core';
const theme = createTheme({
  typography: {
    fontFamily: ['Verdana', 'Roboto', 'sans-serif'].join(','),
  },
});

function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxwidth='lg'>
        <AppBar className={classes.appBar} position='static' color='inherit'>
          <Typography className={classes.heading} variant='h3' align='center'>
            Memories
          </Typography>
          <img
            className={classes.img}
            src={memories}
            alt='memories'
            height='60'
          />
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justifyContent='space-between'
              alignItems='stretch'
              spacing={3}
              className={classes.mainContainer}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </ThemeProvider>
  );
}

export default App;
