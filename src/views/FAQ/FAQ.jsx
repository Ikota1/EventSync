import Navbar from '../../components/Navbar/Navbar';
import styles from '../../style';
import  {logoIcon}  from '../../assets';
import { NavLink } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { AccordionCustomIcon } from '../../components/Accordion/Accordion';

const FAQ = () => (
  <>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} ${styles.flexCenter}`}>  
        <NavLink to='/'><img src={logoIcon} alt='eventSync' className='w-[110px] h-[110px] ' /></NavLink>
      </div>
    </div>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} ${styles.flexCenter}`}>  
        <form className={`w-full max-w-sm ${styles.paddingY}`}>
          <div className={`flex items-center border-b border-teal-500 py-2`} >
            <input className="appearance-none bg-transparent border-none w-full text-white font-poppins mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Describe your issue" aria-label="issue request"></input>
            {/* need to be worked / decided which one */}
            {/* <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Search
            </button> */}
            <Button>Search</Button>
          </div>
        </form>
      </div>  
    </div>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} ${styles.flexCenter} ${styles.paddingY}`}>
        <AccordionCustomIcon />
      </div>
    </div>
  </>
)


export default FAQ;