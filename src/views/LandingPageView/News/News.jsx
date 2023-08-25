import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { NewsData } from '../../../components/News/NewsData';
import styles from '../../../style';

const News = () => (
  <>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}  h-screen`}>
      <div className={`${styles.boxWidth} grid gap-6 sm:grid-cols-2 `}>
      </div>
    </div>
    <Footer/>
  </>
)


export default News;