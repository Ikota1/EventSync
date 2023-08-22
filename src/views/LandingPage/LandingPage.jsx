import styles from '../../style';
import Hero from '../../components/Hero/Hero';
import Navbar from '../../components/Navbar/Navbar';

const LandingPage = () => (
  <>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
  </>
)

export default LandingPage