import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Scoops from '../Scoops/Scoops';
import styles from './SundaesAll.module.css'; /* reuse page/hero/back btn styles */

export default function ScoopsAllPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Scoops — The Rare Scoop';
  }, []);

  return (
    <div style={{ background: '#0f0b08', minHeight: '100vh' }}>
      {/* Back button */}
      <div style={{
        padding: '1.5rem 2.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'linear-gradient(to bottom, #0f0b08 70%, transparent)',
      }}>
        <button
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      {/* Full showcase with all 6 flavours — no "View All" button needed */}
      <Scoops />
    </div>
  );
}
