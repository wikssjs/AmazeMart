import 'normalize.css/normalize.css'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'animate.css';
import {Roboto_Flex,Montserrat,Bitter,Raleway} from '@next/font/google'
import Layout from '../component/Layout';
import Scripts from '../component/Scripts';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../component/AdminLayout';


const bitter = Bitter({subsets:['latin'],weight:["500"]});
const raleway = Raleway({subsets:['latin']});




export default function App({ Component, pageProps }) {

  const  router = useRouter();

  if(!router.isReady) return null;

  return  <>
  <style jsx global>
    {`
     header{
      font-family:${bitter.style.fontFamily};
     }
     main{
      font-family:${raleway.style.fontFamily}
     }
    `}
  </style>
    <Scripts/>
    {
  router.pathname.startsWith('/admin') ? 
    <AdminLayout>
      <Component {...pageProps} /> 
    </AdminLayout>
  :
    <Layout>
      <Component {...pageProps} />
    </Layout>
}

  </>
}
