import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const linkStyle = {
  marginRight: 15,
};

const HeaderOptions = () => (
  <div className="header-options">
    <Link href="/">
      <FontAwesomeIcon className="basic-fa-icon link" size="2x" icon="home" />
    </Link>
  </div>
);

export default HeaderOptions;
