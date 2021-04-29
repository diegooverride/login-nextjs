import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';
import { createStyles, makeStyles, Paper, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: 8,
      paddingLeft: 10,
      backgroundColor: '#eee',
      borderTop: '1px solid #ddd',
      borderBottom: '1px solid #ddd'
    },
    link: {
      display: 'flex',
      align: 'center',
      undeline: 'none',
      color: 'primary',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    icon: {
      marginTop: 1,
      width: 15,
      height: 15,
    },
  })
)

export default function ActiveLastBreadcrumb() {
    const classes = useStyles();
    const router = useRouter()

    function handleClick() {
        router.push('/admin')  
    }

    return (
    <Paper className={classes.paper} elevation={0}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
              href="#"
              onClick={handleClick}
              aria-current="page"
              className={classes.link}
          >
            <ArrowBackIosIcon className={classes.icon}/>
            Voltar
          </Link>
        </Breadcrumbs>
    </Paper>
    );
}