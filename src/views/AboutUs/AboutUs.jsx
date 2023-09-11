import AboutUsCard from '../../components/AboutCard/AboutCard';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../../style';

export const AboutUs = () => {
  return(
    <>
    <div className={`bg-gray-50 dark:bg-gray-900 md:flex ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <div className={`bg-gray-50 dark:bg-gray-900 md:flex ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} w-2/4`}>
        <div className='h-screen'>
          <AboutUsCard />
        </div>
      </div>
    </div>
  </>
  )
}

export default AboutUs