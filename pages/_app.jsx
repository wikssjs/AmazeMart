import 'normalize.css/normalize.css'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'animate.css';
import {Roboto_Flex,Montserrat,Bitter,Raleway} from '@next/font/google'
import Layout from '../component/Layout';
import Scripts from '../component/Scripts';


const bitter = Bitter({subsets:['latin'],weight:["500"]});
const raleway = Raleway({subsets:['latin']});


export default function App({ Component, pageProps }) {


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
  <Layout>
  <Component {...pageProps} />
  </Layout>
  </>
}
