import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.primary.main,
      position: 'fixed',
      left: 0,
      marginLeft: '5px'
    },
    title: {
      flexGrow: 1,
    },
    faixas: {
      borderTop: `10px solid ${theme.palette.primary.main}`,
      borderBottom: "5px solid red"
    },
    menu: {
      backgroundColor: "#eee"
    },
    toolbar: {
      margin: "0 auto"
    }
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.faixas}></div>
      <div className={classes.root}>
        <AppBar position="static" className={classes.menu}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Image
              src="/logo.png"
              alt="Picture of the author"
              width={164}
              height={17}
            />
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}