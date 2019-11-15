import React from 'react';
import NotefulContext from '../NotefulContext';

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: ''
    }
  }

  static contextType = NotefulContext;

    handleSubmit(event) {
      event.preventDefault();
      const newFolder = this.state.folderName;
      console.log(newFolder);
      fetch('https://mighty-plains-06544.herokuapp.com/api/folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:newFolder})
      })
        .then(response => response.json())
        .then(responseJSON => {
          console.log(responseJSON)
          this.setState({folderName: ''})
          this.context.addFolder(responseJSON);
        })
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor='folderName'></label>
                <input 
                  type='text' 
                  name='folderName' 
                  id='folderName' 
                  placeholder='New Folder Name' 
                  value={this.state.folderName}
                  onChange={e=>this.setState({folderName:e.target.value})}
                />
                <button>Add Folder</button>
            </form>
        )
    }
}