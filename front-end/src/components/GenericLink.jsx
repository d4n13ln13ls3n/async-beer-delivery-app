// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';

export default function GenericLink({ route, name, testid, onClick }) {
  return (
    <Nav.Link className="p-3" href={ route } data-testid={ testid } onClick={ onClick }>
      {name}
    </Nav.Link>
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
