import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import FetchPicture from '../services/picture-api';
import LoadMoreButton from './Button';
import Loader from './Loader';
import '../styles/styles.css';
const api = new FetchPicture();

export const ImageGallery = ({ pictureName, showModal }) => {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [loadButton, setLoadButton] = useState(false);

  useEffect(() => {
    if (pictureName === '') {
      return;
    }
    setStatus('pending');
    api.query = pictureName;
    api
      .fetchArticles()
      .then(({ hits }) => {
        setPictures([...hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    api.resetPage();
  }, [pictureName]);

  const onLoadMoreClick = e => {
    setLoadButton(true);
    api
      .fetchArticles()
      .then(({ hits }) => {
        setPictures(prevPictures => [...prevPictures, ...hits]);
        setStatus('resolved');
        setLoadButton(false);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const styles = {
    textAlign: 'center',
  };
  if (status === 'idle') {
  }
  if (status === 'pending') {
    return (
      <div style={styles}>
        <Loader />
      </div>
    );
  }
  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className="ImageGallery">
          <ImageGalleryItem pictures={pictures} showModal={showModal} />
        </ul>
        {loadButton ? (
          <div style={styles}>
            <Loader />
          </div>
        ) : (
          <LoadMoreButton onClick={onLoadMoreClick} />
        )}
      </>
    );
  }
};

ImageGallery.propTypes = {
  pictureName: PropTypes.string,
  showModal: PropTypes.func,
};
