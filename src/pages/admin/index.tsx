import { Box, Container, createStyles, Divider, Link, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import authService from 'services/authService';
import withGuard from 'utils/withGuard';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: 0
    }
  })
)


const MinhaConta = () => {
  const classes = useStyles();
  const router = useRouter();

  function handleSignOut() {
    authService.signOut();

    router.push('/')
  }

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h4" component="h1" color="primary">
          <Box fontWeight="Bold" fontSize="22px" marginTop="20px" marginBottom="20px">
            Minha Conta
          </Box>
        </Typography>

        <Paper className={classes.paper} elevation={2}>
          <List>
            <Link href="admin/cadastro" underline="none">
              <ListItem button>
                <ListItemText primary="Meus Dados" />
                <ArrowForwardIosIcon fontSize="small"/>
              </ListItem>
            </Link>
            <Divider />
            <Link href="admin/biometria" underline="none">
              <ListItem button>
                <ListItemText primary="Acesso com digital" />
                <ArrowForwardIosIcon fontSize="small"/>
              </ListItem>
            </Link>
            <Divider />
            <Link href="#" onClick={handleSignOut} underline="none">
              <ListItem button>
                <ListItemText primary="Sair" />
              </ListItem>
            </Link>
          </List>
        </Paper>
    </Container>
  )
}

export default withGuard(MinhaConta);