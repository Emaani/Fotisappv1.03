import React from 'react';

const events = [
  { time: '11:30', event: 'Commodity prices increase after Karuma closure.',},
  { time: '05:30', event: 'Coffee farmers smiling to the bank.'},
  { time: '03:30', event: 'Sesame prices rise by 1.5% as demand increases.', },
  { time: '05:30', event: 'Coffee prices fall by 2% as supply increases.', },
  { time: '08:00', event: 'Maize prices rise by 1% as demand increases.', },
  { time: '10:30', event: 'Soybean prices drop by 2.5% as supply slows'},
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