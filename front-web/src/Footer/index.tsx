import './styles.css';
import {ReactComponent as InstagramIcon} from './instagram.svg';
import {ReactComponent as LinkedinIcon} from './linkedin.svg';
import {ReactComponent as YoutubeIcon} from './youtube.svg';

function Footer(){
    return(
        <footer className="main-footer" >
            App desenvolvido durante a 2ª ed. do evento Semana DevSuperior
        

            <div className="footer-icons">
                <a href="https://youtube.com/school/devsuperior" target="_new" >
                    <YoutubeIcon/>
                </a>

                <a href="https://www.linkedin.com/in/viniciusqr-quadrado?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BBYyFXIchT%2FeBOsorUdqrIA%3D%3D" target="_new" >
                    <LinkedinIcon/>
                </a>

                <a href="https://instagram.com/viniciusquare" target="_new" >
                    <InstagramIcon/>
                </a>
            </div>
        </footer>

    )
}

export default Footer;