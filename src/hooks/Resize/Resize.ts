import { useEffect, useState } from 'react';

const Resize = () => {
  const [length, setLength] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const newLength = Math.min(viewportHeight * 0.1, 100);
      setLength(newLength);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return length;
};

export default Resize;
