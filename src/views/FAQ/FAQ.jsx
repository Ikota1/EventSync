import Navbar from '../../components/Navbar/Navbar';
import styles from '../../style';

const FAQ = () => (
  <>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <h1 className='text-white'>FAQ Page</h1>
      </div>
    </div>
  </>
)


export default FAQ;