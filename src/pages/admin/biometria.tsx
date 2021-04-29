import { Box, Container, createStyles, Grid, makeStyles, Paper, Switch, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import withGuard from 'utils/withGuard';
import webAuthService from 'services/webAuthService'
import Cookie from 'js-cookie'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    }
  })
)

const Biometria = () => {
  const classes = useStyles();
  const [biometria, setBiometria] = useState<boolean>(false);

  useEffect(() => {
    setBiometria(Cookie.get('useBiometria') === "true")
  }, [])

  async function changeBiometria(value: boolean) {
    if(value === true) {
      webAuthService.createCredential();
    }
    setBiometria(value)
    Cookie.set('useBiometria', `${value}`);
  }

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h5" component="h2" color="primary">
        <Box fontWeight="Bold" fontSize="22px" marginTop="20px" marginBottom="20px">
          Acesse sua conta Casas Bahia com apenas um toque  
        </Box>
      </Typography>
      <div>
        <p>Agora você já pode acessar com sua digital para acessar sua conta das Casas Bahia.</p>
        <p>Lembre-se que todas as digitais cadastradas no seu celular poderam ser utilizada para acessar sua conta.</p>

        <Paper className={classes.paper} elevation={2}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <strong>acesso com digital</strong>
            </Grid>

            <Grid item>
              <Switch
                checked={biometria}
                onChange={ event => { changeBiometria(event.target.checked) }}
                color="primary"
                name="biometriaSwitch"
                inputProps={{ 'aria-label': 'Habilitar acesso via biometria' }}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Container>
  )
}

export default withGuard(Biometria);