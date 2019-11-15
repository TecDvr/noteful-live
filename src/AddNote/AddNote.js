import React from 'react';
import NotefulContext from '../NotefulContext';
import './AddNote.css'

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: '',
      noteBody: '',
      noteFolder: '',
      error: false 
    }
  }

  static contextType = NotefulContext;

    handleSubmit(event) {
      event.preventDefault();
      let date = new Date();
        if (this.state.noteName === '' || this.state.noteFolder === '') {
            this.setState({
                error: true
            })
        } else {
            fetch('https://mighty-plains-06544.herokuapp.com/api/note', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.noteName,
                    content: this.state.noteBody,
                    folderid: this.state.noteFolder,
                    modified: date
                })
              })
                .then(response => response.json())
                .then(responseJSON => {
                    this.context.addNote(responseJSON[0]);
                    this.props.history.push('/')
                })
        }
    }

    render() {
        return (
            <div className='addContainer'>
                <form className='addForm' onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='noteName'>Note Name</label>
                    <input 
                    type='text' 
                    name='noteName' 
                    id='noteName' 
                    placeholder='New Note Name'
                    value={this.state.noteName}
                    onChange={e=>this.setState({noteName:e.target.value})}
                    />
                    <label htmlFor='noteBody'>Note Body</label>
                    <input 
                    type='text' 
                    name='noteBody' 
                    id='noteBody' 
                    placeholder='New Note Body' 
                    value={this.state.noteBody}
                    onChange={e=>this.setState({noteBody:e.target.value})}
                    />
                    <label htmlFor='noteFolder'>To folder</label>
                    <select 
                        name="noteFolder"
                        id='noteFolder'
                        value={this.state.noteFolder}
                        onChange={e=>this.setState({noteFolder:e.target.value})}>
                        <option>Select One</option>
                            {this.context.folders.map((folder,index) => 
                                <option
                                    key={index}
                                    value={folder.id}>{folder.name}</option>)}
                    </select>
                    <button>Add Note</button>
                </form>
                {this.state.error === true 
                    ? <p>Name and Destination Folder are Required</p>
                    : null
                }
            </div>
        )
    }
}