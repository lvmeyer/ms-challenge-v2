import React, { useState } from 'react';

import { AdminCommentPanel } from '../PanelAdmin/AdminCommentPanel';
import { AdminProductPanel } from '../AdminProductPanel/AdminProductPanel';

import '../Profile/Profile.css';

export const AdminGestion = () => {
  const [currentTab, setCurrentTab] = useState(null); // Définissez-le initiallement à null

  const tabs = {
    ReportedComments: <AdminCommentPanel />,
    ProductList: <AdminProductPanel />,
  };

  const handleTabClick = (tab) => {
    // Si le même onglet est cliqué à nouveau, désactivez l'affichage
    if (currentTab === tab) {
      setCurrentTab(null);
    } else {
      setCurrentTab(tab);
    }
  };

  return (
    <div className="container">
		
      <div className="list-group mt-5 w-50">
        <h2>Gestion</h2>
      </div>
      <div className="list-group-item align-items-center">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={`btn btn-dark m-1 ${currentTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)} // Utilisez la fonction de gestion de clic
          >
            {tab}
          </button>
        ))}
        {currentTab && tabs[currentTab]} {/* Affichez le composant si currentTab n'est pas null */}
      </div>
    </div>
  );
};
