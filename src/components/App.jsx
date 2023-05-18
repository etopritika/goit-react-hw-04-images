import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import '../styles/styles.css';

export class App extends Component {
  state = {
    pictureName: '',
    showModal: false,
    largePicture: null,
    pictureTag: null,
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  toggleModal = e => {
    const { showModal } = this.state;
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    if (!showModal) {
      this.setState({
        largePicture: e.currentTarget.getAttribute('srcSet'),
        pictureTag: e.currentTarget.getAttribute('alt'),
      });
    }
  };

  render() {
    const { pictureName, showModal, largePicture, pictureTag } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictureName={pictureName} showModal={this.toggleModal} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largePicture} alt={pictureTag} />
          </Modal>
        )}
      </div>
    );
  }
}
