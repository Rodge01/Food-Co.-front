import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import getbaseUrl from '../../utils/baseURL';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [timePeriod, setTimePeriod] = useState('month');
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // To track errors

  // Fetch revenue data based on the selected time period
  const fetchRevenueData = async (period) => {
    setLoading(true);  // Set loading to true before fetch
    setError(null);    // Clear any previous errors
    try {
      const response = await fetch(`${getbaseUrl()}/api/orders/dashboard?timePeriod=${period}`);
      const data = await response.json();
      if (response.ok) {
        setRevenueData(data);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      setError('Failed to fetch revenue data');
    } finally {
      setLoading(false);  // Set loading to false once the fetch is done
    }
  };

  // Effect to fetch revenue data when the time period changes
  useEffect(() => {
    fetchRevenueData(timePeriod);
  }, [timePeriod]);

  // Chart data based on selected time period
  const data = {
    labels: revenueData.length > 0 ? revenueData.map(item => item._id) : [], // Time period labels (day, week, month, year)
    datasets: [
      {
        label: 'Revenue (PHP)',
        data: revenueData.length > 0 ? revenueData.map(item => item.totalRevenue) : [], // Revenue data
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        datalabels: {
          display: true,
          formatter: (value) => `₱${value.toLocaleString()}`,  // Adding ₱ sign and formatting
        }
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Revenue (${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,  // Ensure Y-axis starts at zero
        ticks: {
          callback: function (value) {
            return '₱' + value.toLocaleString();  // Adding ₱ sign and commas to the axis labels
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Revenue Data</h2>

      {/* Time Period Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => setTimePeriod('day')}
          className={`px-4 py-2 text-gray-800 rounded transition-all duration-300 
            ${timePeriod === 'day' ? 'shadow-lg bg-gray-200' : 'hover:shadow-lg'}`}
        >
          Day
        </button>
        <button
          onClick={() => setTimePeriod('week')}
          className={`px-4 py-2 text-gray-800 rounded transition-all duration-300 
            ${timePeriod === 'week' ? 'shadow-lg bg-gray-200' : 'hover:shadow-lg'}`}
        >
          Week
        </button>
        <button
          onClick={() => setTimePeriod('month')}
          className={`px-4 py-2 text-gray-800 rounded transition-all duration-300 
            ${timePeriod === 'month' ? 'shadow-lg bg-gray-200' : 'hover:shadow-lg'}`}
        >
          Month
        </button>
        <button
          onClick={() => setTimePeriod('year')}
          className={`px-4 py-2 text-gray-800 rounded transition-all duration-300 
            ${timePeriod === 'year' ? 'shadow-lg bg-gray-200' : 'hover:shadow-lg'}`}
        >
          Year
        </button>
      </div>

      {/* Loading and Error Indicators */}
      {loading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">{error}</div>
      ) : revenueData.length === 0 ? (
        <div className="text-center text-lg text-gray-500">No Data Available</div>
      ) : (
        <div className="w-full">
          {/* Chart */}
          <Bar data={data} options={options} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default RevenueChart;
