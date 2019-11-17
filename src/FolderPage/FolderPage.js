import React from 'react';
import './FolderPage.css';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

export default class FolderPage extends React.Component {
    static contextType = NotefulContext;



    render() {
        return ( 
            <div>
                {this.context.folders.filter(folder => 
                    // eslint-disable-next-line
                    folder.id==this.props.match.params.id).map((folder, index) => <h2 key={index}>{folder.name}</h2> )}
                <div>
                    {this.context.notes.filter(note=>
                        // eslint-disable-next-line
                        note.folderid == this.props.match.params.id).map((note, index) => <div className="note" key={index}>
                        <NavLink to={`/note/${note.id}`}>{note.name}</NavLink>
                        <p>Last modified: {note.modified}</p>
                        <button
                            onClick={() => {
                                // eslint-disable-next-line
                                fetch('http://localhost:8000/api/note' + `/${note.id}`, {
                                    method: 'DELETE'
                                })
                                .then(res => {
                                    if (!res.ok) {
                                        return res.json().then(error => {
                                        throw error
                                        })
                                    }
                                })
                                .catch(error => {
                                console.error(error)
                                })
                                this.context.deleteNote(note.id)
                                this.props.history.push('/')
                            }}
                        >Delete</button>
                    </div>)}
                </div>
            </div>
        )
    }
}