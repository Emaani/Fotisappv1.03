'use client'

import React from 'react';

interface CommodityDetailsProps {
  name: string;
  price: number;
  change: number;
}

const CommodityDetails: React.FC<CommodityDetailsProps> = ({ name, price, change }) => {
  const changeColor = change >= 0 ? 'green' : 'red';
  const changeSymbol = change >= 0 ? '▲' : '▼';

  return (
    <div className="commodity-details">
      <h2>{name}</h2>
      <p>Price: ${price.toFixed(2)}</p>
      <p style={{ color: changeColor }}>
        {changeSymbol} {Math.abs(change).toFixed(2)}%
      </p>
    </div>
  );
};

export default CommodityDetails;