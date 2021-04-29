import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Cookie from 'js-cookie'


export default function withGuard(WrappedComponent:any) {
  const Wrapper = (props: unknown) => {
    const router = useRouter()

    useEffect(() => {
      const accessToken = Cookie.get('accessToken')

      if(!accessToken) {
        router.replace('/')
      }
    })

    return <Layout><WrappedComponent {...props} /></Layout>
  }

  return Wrapper
}