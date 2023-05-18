import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import FetchPicture from '../services/picture-api';
import LoadMoreButton from './Button';
import Loader from './Loader';
import '../styles/styles.css';
const api = new FetchPicture();

export default class ImageGallery extends Component {
  state = {
    pictures: [],
    error: null,
    status: 'idle',
    load_button: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevName = prevProps.pictureName;
    const nextName = this.props.pictureName;
    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      api.query = nextName;
      api
        .fetchArticles()
        .then(({ hits }) =>
          this.setState({ pictures: [...hits], status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
      api.resetPage();
    }
  }

  onLoadMoreClick = e => {
    this.setState({ load_button: true });
    api
      .fetchArticles()
      .then(({ hits }) =>
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...hits],
          status: 'resolved',
          load_button: false,
        }))
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  render() {
    const { pictures, error, status } = this.state;
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
            <ImageGalleryItem
              pictures={pictures}
              showModal={this.props.showModal}
            />
          </ul>
          {this.state.load_button ? (
            <div style={styles}>
              <Loader />
            </div>
          ) : (
            <LoadMoreButton onClick={this.onLoadMoreClick} />
          )}
        </>
      );
    }
  }
}
