import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import { Router } from "next/router"

// Styles
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "styles/theme"

import NProgress from 'nprogress'; //nprogress module
import 'styles/nprogress.scss'; //styles of nprogress

Router.events.on('routeChangeStart',() => NProgress.start())
Router.events.on('routeChangeComplete',() => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp = (props: any) => {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Login - Via</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="theme-color" 
          content={theme.palette.primary.main} 
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300400500700&family=Roboto:wght@300400500700&display=swap"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
