import { useEffect,useState } from 'react';
import headphone from '../../public/img/headphoneImg.png';
import styles from './../../styles/Favorites.module.css'
import Image from 'next/image';
import { decode } from 'jsonwebtoken';
import { useShowNotification } from '../../component/ShowNotificationContext';

function Favorites() {

    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const[quantity,setQuantity] = useState(0);

    const{setCount,setNotificationState} = useShowNotification();

    useEffect(() => {
        //get all the products from the database

        fetch('http://localhost:3001/user/favorites',
            {
                headers: {  
                    'user-id': decode(localStorage.getItem('token')) && decode(localStorage.getItem('token')).id
                }
            })

            .then(res => res.json())
            .then(data => {
                console.log(data.products);
                setProducts(data.products);
            })


    }, []);

    useEffect(() => {
        //get all the products from the database

        fetch('http://localhost:3001/cart',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': decode(localStorage.getItem('token')) && decode(localStorage.getItem('token')).id
                }
            })

            .then(res => res.json())
            .then(data => {
                console.log(data.cart);
                setCartProducts(data.cart);
            })
        }, []);

    const handleDelete = (id) => {
        //delete the product from the database

        const data = {
            productId: id
        }

        fetch('http://localhost:3001/user/favorites',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': decode(localStorage.getItem('token')) && decode(localStorage.getItem('token')).id
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
            })
    }

    const addToCart = async (event) => {
        let pass = true;
        const product = products.find((product) => Number(product.id) === Number(event.target.dataset.id));        
        cartProducts.map((item) => {
            if (item.productId === product.id) {
                if (item.quantity < product.quantity) {
                    pass = true;
                }
                else {
                    pass = false;
                }
                alert(product.quantity)
                setQuantity(product.quantity);
                
            }
        });


        if (!pass) {
            setNotificationState({
                isTrue: true,
                text: `Product cannot be added to cart because there are only ${quantity} items left`,
                color: 'danger'
            })

            setTimeout(() => {
                setNotificationState({
                    isTrue: false,
                    text: `Product cannot be added to cart because there are only ${quantity} items left`,
                    color: 'danger'
                })
            }, 3000);

            return;
        }

        let data = {
            id: event.currentTarget.dataset.id,
            quantity: 1,
        };

        let response = await fetch('http://localhost:3001/addtocart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': Number(decode(localStorage.getItem('token')).id),
            },
            body: JSON.stringify(data),
        })

        let result = await response.json();
        console.log(result)
        setCartProducts(result.cart);
        setCount(result.cart.length);
        setNotificationState({
            isTrue: true,
            text: 'Product added to cart successfully',
            color: 'success'
        });

        setTimeout(() => {
            setNotificationState({
                isTrue: false,
                text: '',
                color: ''
            });
        }
            , 3000);
    }

    return (
        <div className={`${styles.container} container py-5 my-5`}>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <h2 className={styles.heading}>Favorites</h2>
                    <hr className={styles.hr} />

                    { products.length === 0 && <p className={styles.noFavorites}>You have no favorites yet.</p> }
                    {

                                                products.map((product,index) => (
                            <div className={`${styles.card} p-3 shadow ${index % 2 ==0 ? "animate__fadeInLeft":"animate__fadeInRight"} animate__animated mb-4 position-relative`} key={product.productId}>
                                <button data-id={product.id} className={`${styles.deleteButton} btn btn-danger m-2 position-absolute`} onClick={(event) => handleDelete(event.currentTarget.dataset.id)}>
                                    Unlike <i className='bi bi-trash'></i>
                                </button>
                                <div className={`${styles.card_body} card-body`}>
                                    <h5 className={`${styles.card_title} card-title`}>{product.name}</h5>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className={styles.imageContainer}>
                                                <Image src={headphone} alt="Product 1" width={150} height={150} />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div>
                                                <p>Price: ${product.price}</p>
                                                <button data-id={product.id} onClick={addToCart} className={styles.addButton}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                   
                </div>
            </div>
        </div>
    );
}

export default Favorites;
