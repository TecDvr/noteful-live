import React from 'react';
import { Route, Link } from 'react-router-dom';
import NoteList from './NoteList/NoteList';
import './App.css';
import Folder from './Folder/Folder';
import FolderPage from './FolderPage/FolderPage';
import Note from './Note/Note';
import NotefulContext from './NotefulContext';
import AddNote from './AddNote/AddNote';
// import NoteError from './NoteError';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    }
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId)
      this.setState({
        notes: newNotes
      })
  }

  addFolder = folder => {
    this.setState({folders:[...this.state.folders,folder]})
  }

  addNote = note => {
    this.setState({notes:[...this.state.notes,note]})
  }

  componentDidMount() {
    Promise.all([
        fetch('https://mighty-plains-06544.herokuapp.com/api/folder'),
        fetch('https://mighty-plains-06544.herokuapp.com/api/note')
    ])
        .then(([foldersData, notesData]) => {
            return Promise.all([foldersData.json(), notesData.json()])
        })
        .then(([folders, notes]) => {
            this.setState({
              folders,
              notes
            })
        })
        .catch(e => {
          console.error({e})
        })
  };

  render() {
    return (
      <NotefulContext.Provider value={this.state}>
        <div className='mainPage'>

          <header className='header'>
            <Link className='title' style={{ textDecoration: 'none' }} to='/'>Noteful</Link>
            <div>
              <button className='addLink' ><Link className='link' style={{ textDecoration: 'none' }} to='/newnote'>Add Note</Link></button>
            </div>
          </header>

          <Route path="/" component={Folder}/>

          <section>
    
              <Route 
                exact
                path='/folder/:id'
                component={FolderPage} />

          </section>

          <section>
  
              <Route
                exact
                path='/newnote'
                component={AddNote} />
    
          </section>

          <main>

              <Route 
                exact
                path='/' 
                component={NoteList} />
              <Route 
                exact
                path='/note/:id'
                render={(rprops)=><Note id={rprops.match.params.id}/>}/>  
       
          </main>

        </div>
      </NotefulContext.Provider>
      
    )
  }
}
