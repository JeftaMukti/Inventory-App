import React from 'react';

function PurchaseDashboard({ name }) {
  return (
    <div>
      <h1>Purchase Dashboard</h1>
      <p>Welcome, {name}!</p>
      {/* Add purchase-specific content here */}
    </div>
  );
}

export default PurchaseDashboard;