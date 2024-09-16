import React from 'react';

const events = [
  { time: '11:30', event: 'API Weekly Crude Oil Stock',},
  { time: '05:30', event: 'EIA Crude Oil Stocks Change'},
  { time: '03:30', event: 'Building Permits (MoM)', },
  { time: '05:30', event: 'EIA Natural Gas Storage Chan...' },
  { time: '08:00', event: 'Baker Hughes US Oil Rig Count'},
  { time: '10:30', event: 'CFTC Gold NC Net Positions'},
];

const UpcomingEvents: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Commodity Updates</h2>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{event.time}</span>
            <span className="text-right">{event.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;