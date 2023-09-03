import styles from '../../styles/Dashboard.module.css'; // Assuming your CSS module is named this way.

import LineChart from '../../component/LineChart';
import { useEffect,useState } from 'react';

export default function DashboardPage() {
    const [globalData , setGlobalData] = useState([])
    const [monthlyData , setMonthlyData] = useState([])
    const [recentOrder , setRecentOrder] = useState([])
    useEffect(() => {
        fetch('https://amazemart-1f4e9d6a5f39.herokuapp.com/admin/dashboard')
            .then(response => response.json())
            .then(json => {
                console.log(json.recentOrders)
                if (json.globalData) {
                    setGlobalData(json.globalData);
                    setMonthlyData(json.monthlyData.map((item) => item.monthly_total));
                    setRecentOrder(json.recentOrders);
                }
            })
    }, [])

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May','juin','juillet','aout','septembre','octobre','novembre','decembre'],
        datasets: [
          {
            label: 'Monthly Sales ($)',
            data: monthlyData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],            
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            borderRadius: 5,  
            hoverRadius: 50,
          }
        ]
      };

      const options = {
        animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
        scales: {
          y: {
            beginAtZero: true
          }
          
        }
      };
    return (
        <div className={`${styles.dashboard_container} shadow-lg rounded-5`}>
            <h1 className={`text-center ${styles.dashboard_title}`}>Dashboard Page</h1>

            <div className={`row ${styles.cards_container}`}>
                <div className={`col-md-3 ${styles.card} animate__bounceInTop animate__animated`}>
                    <h2>Total Users</h2>
                    <p>{globalData.users_count}</p>
                </div>
                <div className={`col-md-3 ${styles.card}  animate__bounceInLeft animate__animated`}>
                    <h2>Total Products</h2>
                    <p>{globalData.products_count}</p>
                </div>
                <div className={`col-md-3 ${styles.card} animate__bounceInRight animate__animated`}>
                    <h2>Orders Today</h2>
                    <p>{globalData.orders_count}</p>
                </div>
                <div className={`col-md-3 ${styles.card} animate__bounceInRight animate__animated`}>
                    <h2>Revenue Today</h2>
                    <p>$ {globalData.total_money_for_today ?  globalData.total_money_for_today.toFixed(2) :0} </p>
                </div>
            </div>

            <div className={`mt-4 ${styles.chart_container}`}>
                <h2>Monthly Sales</h2>
                {/* Replace this with an actual chart component */}
                <div className={`p-4 rounded ${styles.mockup_chart}`}>
                <LineChart data={data} labels={['January', 'February', 'March', 'April', 'May']} />

                </div>
            </div>

            <div className={`mt-4 ${styles.table_container} animate__animated animate__fadeInUp`}>
                <h2>Recent Orders</h2>
                {/* Replace this with an actual table component */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {
                            recentOrder.map((item) => (
                                <tr key={item.order_id}>
                                    <td>{item.order_id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>$ {item.price}</td>
                                    <td>{item.fullname}</td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
