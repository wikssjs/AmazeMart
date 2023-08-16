import styles from '../../styles/Dashboard.module.css'; // Assuming your CSS module is named this way.

import LineChart from '../../component/LineChart';

export default function DashboardPage() {

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May','juin','juillet','aout','septembre','octobre','novembre','decembre'],
        datasets: [
          {
            label: 'Monthly Sales ($)',
            data: [1200, 1900, 3300, 4900, 3700,1000,5000,2000,3000,4000,5000,6000],
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
        <div className={` ${styles.dashboard_container} shadow-lg rounded-5`}>
            <h1 className={`text-center ${styles.dashboard_title}`}>Dashboard Page</h1>

            <div className={`row ${styles.cards_container}`}>
                <div className={`col-md-3 ${styles.card}`}>
                    <h2>Total Users</h2>
                    <p>5,234</p>
                </div>
                <div className={`col-md-3 ${styles.card}`}>
                    <h2>Total Products</h2>
                    <p>120</p>
                </div>
                <div className={`col-md-3 ${styles.card}`}>
                    <h2>Orders Today</h2>
                    <p>45</p>
                </div>
                <div className={`col-md-3 ${styles.card}`}>
                    <h2>Revenue Today</h2>
                    <p>$2,450</p>
                </div>
            </div>

            <div className={`mt-4 ${styles.chart_container}`}>
                <h2>Monthly Sales</h2>
                {/* Replace this with an actual chart component */}
                <div className={`p-4 rounded ${styles.mockup_chart}`}>
                <LineChart data={data} labels={['January', 'February', 'March', 'April', 'May']} />

                </div>
            </div>

            <div className={`mt-4 ${styles.table_container}`}>
                <h2>Recent Orders</h2>
                {/* Replace this with an actual table component */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Laptop</td>
                            <td>2</td>
                            <td>$2000</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Mouse</td>
                            <td>5</td>
                            <td>$250</td>
                        </tr>
                        {/* ... Other rows ... */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
