'use client'

import React from 'react';

interface CommoditySelectorProps {
  commodities: string[];
  selectedCommodity: string;
  onSelect: (commodity: string) => void;
}

const CommoditySelector: React.FC<CommoditySelectorProps> = ({ commodities, selectedCommodity, onSelect }) => {
  return (
    <div className="commodity-selector">
      <select value={selectedCommodity} onChange={(e) => onSelect(e.target.value)}>
        {commodities.map((commodity) => (
          <option key={commodity} value={commodity}>
            {commodity}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommoditySelector;