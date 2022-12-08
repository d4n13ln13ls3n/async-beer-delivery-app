import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GenericLink({ route, name, testid, onClick }) {
  return (
    <Link to={ route } data-testid={ testid } onClick={ onClick }>{ name }</Link>
  );
}

GenericLink.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

GenericLink.defaultProps = {
  onClick: () => {},
};
