import React, { Component } from 'react';
import "../styles/styles.css";


export default class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  handleInputChange = e => {
    this.setState({ pictureName: e.currentTarget.value.toLowerCase() });
  };
  
  handleSubmit = e => {
    const { pictureName } = this.state;
    e.preventDefault();
    if (pictureName.trim() === '') {
      return alert("Enter the name of the picture");
    }
    this.props.onSubmit(pictureName);
    this.setState({ pictureName: '' });
  };

  render() {
    const { pictureName } = this.state;
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            value={pictureName}
            name="query"
            onChange={this.handleInputChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
