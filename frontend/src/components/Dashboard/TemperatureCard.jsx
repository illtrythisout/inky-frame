import styles from './temperatureCard.module.css';

export default function TemperatureCard() {
  let warningLevel = 'safe';
  return (
    <div className={`card ${styles.widget}`}>
      <div className={`${styles.imageContainer} ${styles[warningLevel]}`}>
        <p>41C°</p>
      </div>
      <p>CPU Temperature</p>
    </div>
  );
}
