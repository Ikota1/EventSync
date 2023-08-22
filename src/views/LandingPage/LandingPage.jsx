import styles from '../../style';
import Hero from '../../components/Hero/Hero';
import Navbar from '../../components/Navbar/Navbar';
import Stats from '../../components/Stats/Stats';
import Testimonials from '../../components/Testimonials/Testimonials';
import Footer from '../../components/Footer/Footer';

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

    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Testimonials />
        <Footer />
      </div>
    </div>
  </>
)

export default LandingPage