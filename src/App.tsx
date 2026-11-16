import styles from './App.module.css';

/**
 * Root component. A placeholder until the app shell and navigation arrive (ST-007).
 *
 * @example
 * <App />
 */
export default function App() {
  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Homekeep</h1>
      <p className={styles.tagline}>Recurring home tasks, kept calm.</p>
    </main>
  );
}
