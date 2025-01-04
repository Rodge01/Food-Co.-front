import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import getbaseUrl from "../../utils/baseURL";
import axios from "axios";
import { MdIncompleteCircle } from "react-icons/md";
import RevenueChart from "./RevenueChart";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getbaseUrl()}/api/admin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": 'application/json',
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
  {/* Products Card */}
  <div className="flex items-center p-8 bg-white shadow rounded-lg">
    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <div>
      <span className="block text-2xl font-bold">{data?.totalFoods}</span>
      <span className="block text-gray-500">Products</span>
    </div>
  </div>

  {/* Total Sales Card */}
  <div className="flex items-center p-8 bg-white shadow rounded-lg">
    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    </div>
    <div>
      <span className="block text-2xl font-bold">₱{data?.totalSales}</span>
      <span className="block text-gray-500">Total Sales</span>
    </div>
  </div>

  {/* Revenue Chart (Moved to top section) */}
  <div className="flex flex-col xl:col-span-2 xl:row-span-1 bg-white shadow rounded-lg">
    <div className="px-6 py-5 font-semibold border-b border-gray-100">Revenue</div>
    <div className="p-4 flex-grow">
      <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
        <RevenueChart />
      </div>
    </div>
  </div>

  {/* Trending Foods Card */}
  <div className="flex items-center p-8 bg-white shadow rounded-lg">
    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    </div>
    <div>
      <span className="inline-block text-2xl font-bold">{data?.trendingFoods}</span>
      <span className="inline-block text-xl text-gray-500 font-semibold">(13%)</span>
      <span className="block text-gray-500">Trending Foods This Month</span>
    </div>
  </div>

  {/* Total Orders Card */}
  <div className="flex items-center p-8 bg-white shadow rounded-lg">
  <Link to="/dashboard/Orders">
    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
      <MdIncompleteCircle className="text-3xl" />
    </div>
    <div>
      <span className="block text-2xl font-bold">{data?.totalOrders}</span>
      <span className="block text-gray-500">Total Order</span>
    </div>
    </Link>
  </div>
</section>
    </>
  );
}

export default Dashboard;
