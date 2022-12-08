import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GenericLink({ route, name, testid }) {
  return (
    <Link to={ route } data-testid={ testid }>{ name }</Link>
  );
}

GenericLink.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};
