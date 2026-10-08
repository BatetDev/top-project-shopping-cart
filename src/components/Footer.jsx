import { Link } from 'react-router-dom';
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaTiktok,
  FaGithub,
} from 'react-icons/fa6';
import styles from './Footer.module.css';

const socials = [
  { name: 'Instagram', href: 'https://instagram.com', Icon: FaInstagram },
  { name: 'Facebook', href: 'https://facebook.com', Icon: FaFacebookF },
  { name: 'X', href: 'https://x.com', Icon: FaXTwitter },
  { name: 'YouTube', href: 'https://youtube.com', Icon: FaYoutube },
  { name: 'TikTok', href: 'https://tiktok.com', Icon: FaTiktok },
  { name: 'GitHub', href: 'https://github.com/BatetDev', Icon: FaGithub },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Link to='/' className={styles.brand}>
        Lakon Tech
      </Link>

      <ul className={styles.socials}>
        {socials.map(({ name, href, Icon }) => (
          <li key={name}>
            <a
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={name}
              className={styles.socialLink}
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.bottom}>
        <Link to='/about' className={styles.link}>
          About
        </Link>
        <a href='mailto:hello@lakontech.com' className={styles.link}>
          Contact
        </a>
      </div>
      <p className={styles.copyright}>
        © {year} Lakon Tech. All rights reserved.
      </p>
    </footer>
  );
}
