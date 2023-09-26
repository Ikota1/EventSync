import Navbar from '../../../components/Navbar/Navbar';
import styles from '../../../style';
import { Accordion } from '../../../components/Accordion/Accordion';

const FAQ = () => (
  <div className={`font-poppins h-screen bg-gray-900 overflow-y-auto`}>
    <div className={`bg-gray-50 dark:bg-gray-900 md:flex ${styles.paddingX} ${styles.flexCenter} `}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <div className={`bg-gray-50 dark:bg-gray-900 md:flex ${styles.flexStart} xsm:p-5 `}>
      <div className={`${styles.boxWidth} w-2/4`}>
        <div className='h-full'>
          <Accordion />
        </div>
      </div>
    </div>
  </div>
)


export default FAQ;