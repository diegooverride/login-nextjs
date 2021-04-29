import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import authService from 'services/authService';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookie from 'js-cookie'
import { CssBaseline, FormControlLabel, Link, Switch, TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
import webAuthService from 'services/webAuthService';
import Image from 'next/image';

export default function SignIn() 
{
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [biometria, setBiometria] = useState<boolean>(false);

  async function changeBiometria(value: boolean) {
    setBiometria(value)
    Cookie.set('useBiometria', `${value}`);
  }

  useEffect(() => {
    const accessToken = Cookie.get('token')

    if(accessToken) {
      router.replace("/admin/")
    }

    setBiometria(Cookie.get('useBiometria') === "true")
  }, [])

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    const useBiometria:boolean = Cookie.get('useBiometria') === "true";

    if(useBiometria) {
      await webAuthService.getAssertion()

      router.replace('/admin');
    } else {
      await authService.signIn(email, password)
      .then(() => { router.replace("/admin/") })
      .catch(error => {
        Swal.fire({
          text: error,
          position: "bottom",
          timer: 2500,
          showConfirmButton: false,
          toast: true
        })
      })
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Image
            src="/logo2x.png"
            alt="Picture of the author"
            width={246}
            height={26}
          />
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={ event => setEmail(event.target.value) }
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={ event => setPassword(event.target.value) }
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>

          <p>Não possui conta? <Link href="/cadastro"><strong>Cadastre-se</strong></Link></p>
          <FormControlLabel
            control={
              <Switch
                checked={biometria}
                onChange={ event => { changeBiometria(event.target.checked) }}
                color="primary"
                name="biometriaSwitch"
                inputProps={{ 'aria-label': 'Habilitar acesso via biometria' }}
              />
            }
            label="Login por biometria"
          />
        </form>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));