import React from 'react';
import NotefulContext from '../NotefulContext';

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: '',
      error: false
    }
  }

  static contextType = NotefulContext;

    handleSubmit(event) {
      event.preventDefault();
      const newFolder = this.state.folderName;
      if (this.state.folderName === '') {
        this.setState({error: true})
      } else {
        fetch('https://mighty-plains-06544.herokuapp.com/api/folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:newFolder})
      })
        .then(response => response.json())
        .then(responseJSON => {
          this.setState({folderName: ''})
          this.context.addFolder(responseJSON[0]);
        })
        this.setState({error: false})
      }
      
    }

    render() {
        return (
          <div>
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
            {this.state.error === true 
              ? <p>Please enter a folder name</p>
              : null}
          </div>
        )
    }
}