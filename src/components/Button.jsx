import '../styles/styles.css';

export default function LoadMoreButton(props) {
  return (
    <button onClick={props.onClick} type="button" className="Button">
      Load more
    </button>
  );
}
