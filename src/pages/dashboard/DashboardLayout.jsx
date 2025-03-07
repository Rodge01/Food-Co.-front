import { HiViewGridAdd } from "react-icons/hi";
import { MdHistoryEdu, MdOutlineManageHistory } from "react-icons/md";
import {  NavLink, Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  }

  return (
    <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
      <aside className="hidden sm:flex sm:flex-col">
        <a href="/" className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500">
          <img src="/Logo.png" alt="" className='w-13' />
        </a>
        <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <NavLink 
              to="/dashboard" 
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
              activeclassName="text-purple-600 bg-white" // Apply active styles here
            >
              <span className="sr-only">Dashboard</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </NavLink>

            <NavLink 
              to="/dashboard/add-new-food" 
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
              activeclassName="text-purple-600 bg-white" // Apply active styles here
            >
              <HiViewGridAdd className="h-6 w-6" />
            </NavLink>

            <NavLink 
              to="/dashboard/manage-food" 
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
              activeclassName="text-purple-600 bg-white" // Apply active styles here
            >
              <MdOutlineManageHistory className="h-6 w-6" />
            </NavLink>
            <NavLink 
              to="/dashboard/Orders" 
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
              activeclassName="text-purple-600 bg-white" // Apply active styles here
            >
              <MdHistoryEdu  className="h-6 w-6" />
            </NavLink>
          </nav>
        </div>
      </aside>

      <div className="flex-grow text-gray-800">
        <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
          <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
            <span className="sr-only">Menu</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="flex flex-shrink-0 items-center ml-auto">
            <span className="sr-only">User Menu</span>
            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
              <span className="font-semibold">Admin</span>
            </div>
            <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
              <img src="/admin.png" alt="user profile photo" className="h-full w-full object-cover"/>
            </span> 
            <div className="border-l pl-3 ml-3 space-x-1">
              <button onClick={handleLogout} className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                <span className="sr-only">Log out</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Food Store Inventory</h2>
            </div>
            <div className="flex flex-col md:flex-row items-start justify-end space-x-0 md:space-x-6 -mb-3">
              <NavLink 
                to="/dashboard/manage-food" 
                className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3"
                activeclassName="bg-purple-100"
              >
                Manage Foods
              </NavLink>

              <NavLink 
                to="/dashboard/add-new-food" 
                className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                activeclassName="bg-purple-700"
              >
                Add New Food
              </NavLink>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
