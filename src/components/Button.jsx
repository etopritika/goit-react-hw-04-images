import PropTypes from 'prop-types';
import '../styles/styles.css';

export default function LoadMoreButton({ onClick }) {
  return (
    <button onClick={onClick} type="button" className="Button">
      Load more
    </button>
  );
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func,
};
