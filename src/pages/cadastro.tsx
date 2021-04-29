import {
  Box,
  Button,
  Container,
  createStyles,
  CssBaseline,
  makeStyles,
  TextField,
  Theme,
  Typography
} from "@material-ui/core"
import React, { FormEvent, useState } from "react"
import User from 'models/user'
import Swal from "sweetalert2"
import UserService from "services/userService"
import { useRouter } from "next/router"
import Image from 'next/image'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      "& .MuiTextField-root": {
        marginBottom: theme.spacing(2)
      }
    },
    titulo: {
      marginTop: 40
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  })
)

const Cadastro = () => {
  const classes = useStyles()
  const router = useRouter()

  const [nome, setNome] = useState<string>('Nome');
  const [email, setEmail] = useState<string>('seu@email.com');
  const [senha, setSenha] = useState<string>('senha');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const user: User = {
      name: nome,
      email: email,
      password: senha
    }

    await UserService.save(user).then(response => {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: `Cadastro efetuado com sucesso. ${response.data}`
      })
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: `Problema ao efetuar o cadastro. ${error.response.data}`
      })
    });

    router.push('/')
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

        <Typography variant="h4" component="h1" className={classes.titulo} color="primary">
          <Box fontWeight="Bold" fontSize="22px" marginTop="20px" marginBottom="20px">
            Cadastro
          </Box>
        </Typography>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            type="text"
            fullWidth
            value={nome}
            onChange={event => setNome(event.target.value)}
          />

          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <TextField
            id="senha"
            label="Senha"
            variant="outlined"
            type="password"
            fullWidth
            value={senha}
            onChange={event => setSenha(event.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            Efetuar Cadastro
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default Cadastro
