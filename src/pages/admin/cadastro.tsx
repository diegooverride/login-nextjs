import {  
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography
} from "@material-ui/core"
import React, { FormEvent, useEffect, useState } from "react"
import withGuard from "utils/withGuard"
import Swal from "sweetalert2"
import UserService from "services/userService"
import User from "models/user"
import { useRouter } from "next/router"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      "& .MuiTextField-root": {
        marginBottom: theme.spacing(2)
      }
    }
  })
)

const Cadastro = () => {
  const classes = useStyles()
  const router = useRouter()

  const [id, setId] = useState<string|any>('');
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string|any>('');

  useEffect(() => {
    UserService.getUser()
    .then(response => {
      const userData: User = response.data
      setId(userData.id)
      setNome(userData.name)
      setEmail(userData.email)
      setSenha(userData.password)
    })
    
  },[])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const user: User = {
      id: id,
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

    router.push('/admin')
  }

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h4" component="h1" color="primary">
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
          value={nome}
          onChange={event => {setNome(event.target.value)}}
          fullWidth
        />

        <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          type="email"
          value={email}
          onChange={event => {setEmail(event.target.value)}}
          fullWidth
        />

        <TextField
          id="senha"
          label="Senha"
          variant="outlined"
          type="password"
          value={senha}
          onChange={event => {setSenha(event.target.value)}}
          fullWidth
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Atualizar
        </Button>
      </form>
    </Container>
  )
}

export default withGuard(Cadastro)