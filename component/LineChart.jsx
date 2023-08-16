// components/LineChart.js

import { useEffect, useRef } from 'react';
import { Bar} from 'react-chartjs-2';
import { useState } from 'react';
import {Chart as Chartjs,
    LineElement,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend}
from 'chart.js';

function LineChart({ data, labels }) {

    const[chartOptions,setChartOptions] = useState({ });
    Chartjs.register(LineElement,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
    useEffect(() => {
        setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    
                    beginAtZero: true
                }
            }
        });


    }, [data, labels]);

    return (
            <Bar  data={data} options={chartOptions}/>
    );
}

export default LineChart;
