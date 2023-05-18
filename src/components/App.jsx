import React, { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import '../styles/styles.css';

export const App = () => {
const [pictureName, setPictureName] = useState('');
const [showModal, setShowModal] = useState(false);
const [largePicture, setLargePicture] = useState(null);
const [pictureTag, setPictureTage] = useState(null);

const handleFormSubmit = pictureName => {
  setPictureName(pictureName);
};

const toggleModal = e => {
  setShowModal(!showModal);
  if(!showModal){
    setLargePicture(e.currentTarget.getAttribute('srcSet'));
    setPictureTage(e.currentTarget.getAttribute('alt'));
  }
};
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery pictureName={pictureName} showModal={toggleModal} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largePicture} alt={pictureTag} />
        </Modal>
      )}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     pictureName: '',
//     showModal: false,
//     largePicture: null,
//     pictureTag: null,
//   };

  // handleFormSubmit = pictureName => {
  //   this.setState({ pictureName });
  // };

  // toggleModal = e => {
  //   const { showModal } = this.state;
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  //   if (!showModal) {
  //     this.setState({
  //       largePicture: e.currentTarget.getAttribute('srcSet'),
  //       pictureTag: e.currentTarget.getAttribute('alt'),
  //     });
  //   }
  // };

//   render() {
//     const { pictureName, showModal, largePicture, pictureTag } = this.state;
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery pictureName={pictureName} showModal={this.toggleModal} />
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largePicture} alt={pictureTag} />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
