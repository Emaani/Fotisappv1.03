import React from 'react';

interface BackgroundContainerProps {
  children: React.ReactNode;
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/images/background.jpeg')`, // Make sure the image is in public/images
          opacity: 0.3, // Adjust opacity for visual effect
        }}
      ></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundContainer;
