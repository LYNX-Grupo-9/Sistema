import linkedin from '../assets/mdi_linkedin.svg';
import facebook from '../assets/ic_baseline-facebook.svg';
import instagram from '../assets/mdi_instagram.svg';
import x from '../assets/prime_twitter.svg';

export function Redes() {
    return (
        <div className="containerRedes">
            <img src={linkedin} alt="LinkedIn" />
            <img src={facebook} alt="Facebook" />
            <img src={instagram} alt="Instagram" />
            <img src={x} alt="Twitter" />
        </div>
    )
}