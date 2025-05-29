import { useEffect } from 'react';

const Ping: React.FC = () => {
  useEffect(() => {
    fetch('https://backend-1upx.onrender.com/')
      .catch(() => {
      });
  }, []);

  useEffect(() => {
    fetch('https://gemii.onrender.com/')
      .catch(() => {
      });
  }, []);
  return (
    <main>
    </main>
  );
};

export default Ping;
