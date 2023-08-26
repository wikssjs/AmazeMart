import { useState, useEffect } from 'react';

const DarkLightToggle = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Apply the 'light' class to the body if light mode is active
    if (isLight) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [isLight]);

  const handleToggle = () => {
    // Add the 'toggle' class for a short animation
    document.body.classList.add('toggle');

    setTimeout(() => {
      setIsLight(!isLight);

      setTimeout(() => {
        document.body.classList.remove('toggle');
      }, 10);
    }, 5);
  };

  return (
    <label className="day-night">
      <input type="checkbox" checked={isLight} onChange={handleToggle} />
      <div></div>
    </label>
  );
};

export default DarkLightToggle;
