import styles from './temperatureCard.module.css';
import { useEffect, useState } from 'react';

// get env variables
const API_URL = import.meta.env.VITE_API_URL;

export default function TemperatureCard() {
  const [warningLevel, setWarningLevel] = useState('safe');
  const [temperature, setTemperature] = useState();

  useEffect(() => {
    async function fetchTemp() {
      const res = await fetch(`${API_URL}/display/pi/temp`);
      const data = await res.json();
      const currentTemp = Number(data.data.temperature);
      setTemperature(currentTemp);

      if (currentTemp >= 0 && currentTemp < 60) {
        // safe temp between 0 and 60 C
        setWarningLevel('safe');
      } else if (
        // warning temp between 60 and 80 C or between -20 and 0 C
        (currentTemp < 0 && currentTemp >= -20) ||
        (currentTemp <= 60 && currentTemp > 80)
      ) {
        setWarningLevel('warning');
      } else {
        // dangerous temp greater than 80 C or less than -20 C
        setWarningLevel('danger');
      }
    }

    fetchTemp();
    const interval = setInterval(fetchTemp, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`card ${styles.widget}`}>
      <div className={`${styles.imageContainer} ${styles[warningLevel]}`}>
        <p>{temperature ? `${temperature}C°` : '--C°'}</p>
      </div>
      <h3>CPU Temperature</h3>
    </div>
  );
}
