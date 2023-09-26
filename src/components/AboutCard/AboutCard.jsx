import styles from "../../style";
import { developers } from "../../constants/about-us";
import { CiMail } from 'react-icons/ci';
import { FaGitlab, FaLinkedin } from 'react-icons/fa';

const AboutUsCard = () => {
    return (
        <div className={`${styles.boxWidth} font-poppins`}>
            <div className="flex justify-center items-center flex-col">
                <div className="flex flex-nowrap justify-center gap-[1.5rem] xsm:flex-col md:flex-row">
                    {developers.map(person => (
                        <div className={person.service} key={person.id}>
                            <div className="front">
                                <h4>{person.name}</h4>
                            </div>
                            <div className="back">
                                <h3>{person.profession}</h3>
                                <p>{person.description}</p>
                                <div className="social-icons">
                                    <a href={`mailto:${person.email}`} target="_blank" rel="noopener noreferrer">
                                        <CiMail />
                                    </a>
                                    <a href={person.gitlab} target="_blank" rel="noopener noreferrer">
                                        <FaGitlab />
                                    </a>
                                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AboutUsCard



