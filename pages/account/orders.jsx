// ... (import statements)

import styles from '../../styles/Orders.module.css';
import { useEffect, useState } from 'react';
import { decode } from 'jsonwebtoken';
import Image from 'next/image';
import Link from 'next/link';
import headphone from '../../public/img/headphone.png';
import Orders from '../../component/Orders';

function OrdersPage() {
  const [userId , setUserId] = useState('');

  useEffect(() => {
    setUserId(decode(localStorage.getItem('token'))?.id);
  }, [])


  return (
   <Orders userId={userId}/>
  );
}

export default OrdersPage;
