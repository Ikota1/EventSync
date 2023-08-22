import Navbar from '../../components/Navbar/Navbar';
import styles from '../../style';
import { Accordion } from '../../components/Accordion/Accordion';
import { NavLink } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { logoIcon } from '../../assets';


const FAQ = () => (
  <>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} ${styles.flexCenter} ${styles.paddingY}`}>  
        <NavLink to='/'><img src={logoIcon} alt='eventSync' className='w-[110px] h-[110px] ' /></NavLink>
      </div>
    </div>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} w-6/12`}>
        <div className='h-screen'>
          <Accordion/>
        </div>
      </div>
    </div>
  </>
)


export default FAQ;