import Footer from "./Footer"
import Header from "./Header"
import NotificationCard from "./NotificationCard"
export default function Layout({children,setPage}){
    return <>
    <NotificationCard/>
    <Header setPage={setPage}/>
    
        
    {children}

    <Footer/>
    
    
    </>
}