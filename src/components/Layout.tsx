import React from 'react'
import Menu from './Menu'
import Breadcrumb from './Breadcrumb'
import { useRouter } from 'next/router'

export default function Layout({children}:{children:any}) {
    const router = useRouter();

    return (
        <div>
            <Menu/>
            {router.pathname !== "/admin" && <Breadcrumb/>}
            {children}
        </div>
    )
}