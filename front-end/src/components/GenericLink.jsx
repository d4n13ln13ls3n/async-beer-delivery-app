import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GenericLink({ route, name }) {
  return (
    <Link to={ route }>{ name }</Link>
  );
}

GenericLink.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
