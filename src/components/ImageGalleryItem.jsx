import '../styles/styles.css';

export default function ImageGalleryItem({ pictures, showModal }) {
  return pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <li key={id} className="ImageGalleryItem">
        <img
          onClick={showModal}
          className="ImageGalleryItem-image"
          loading="lazy"
          src={webformatURL}
          srcSet={largeImageURL}
          alt={tags}
        />
      </li>
    );
  });
}
