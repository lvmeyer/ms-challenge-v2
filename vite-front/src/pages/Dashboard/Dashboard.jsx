// import { Routes, Route } from "react-router-dom";
import React from 'react';

// import { Cog6ToothIcon } from "@heroicons/react/24/solid";
// import { IconButton } from "@material-tailwind/react";
// import {
//   Sidenav,
//   DashboardNavbar,
//   Configurator,
//   Footer,
// } from "@/widgets/layout";
// import routes from "@/routes";
// import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export const Dashboard = () => {
    return (
      <>
      <div className='vh-100 col-xl-3 col-md-2 d-flex flex-column border pt-2 bg-dark text-white'>
        <div className='p-3'>
          <div>LOGO</div>
        </div>
        <div className='w-100 p-3'>
            <div>
                <div className='py-2'> Dashboard</div>
                <div className='btn btn-outline-info py-2'>Profile</div>
            </div>
        </div>
        <div className=' p-3'>
            <div className='py-2'> Users </div>
            <div className='py-2'> Produits </div>
        </div>
      </div>
      </>
    );
  };

// Dashboard.displayName = "/src/layout/dashboard.jsx";

// export default Dashboard;
