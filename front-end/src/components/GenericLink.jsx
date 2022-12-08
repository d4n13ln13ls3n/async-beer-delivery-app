import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GenericLink({ route, name, onClick }) {
  return (
    <Link to={ route } onClick={ onClick }>{ name }</Link>
  );
}

GenericLink.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

GenericLink.defaultProps = {
  onClick: () => {},
};
