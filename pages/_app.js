import 'tailwindcss/tailwind.css'
import Layout from "../components/layout";
import {useEffect, useState} from "react";
import userbase from "userbase-js";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState()

    useEffect(() => {
        userbase.init({appId: process.env.NEXT_PUBLIC_USERBASE_APP_ID})
     }, [])

    return(

        <Layout user={user} setUser={setUser}>
            <Head>
                <title>To do app</title>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet"/>
            </Head>
            <Component user={user} {...pageProps} />
        </Layout>
    )
}

export default MyApp