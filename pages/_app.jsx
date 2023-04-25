import 'normalize.css/normalize.css'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'animate.css';
import {Roboto_Flex,Montserrat,Bitter} from '@next/font/google'
import Layout from '../component/Layout';
import Scripts from '../component/Scripts';


const inter = Bitter({subsets:['latin'],weight:["500"]});


export default function App({ Component, pageProps }) {


  return  <>
  <style jsx global>
    {`
     header{
      font-family:${inter.style.fontFamily};
     }
     body{
      font-family:${inter.style.fontFamily}
     }
    `}
  </style>
    <Scripts/>
  <Layout>
  <Component {...pageProps} />
  </Layout>
  </>
}
