import React from 'react';
import './FolderPage.css';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

export default class FolderPage extends React.Component {
    static contextType = NotefulContext;
    render() {
        return ( 
            <div>
                {this.context.folders.filter(folder => folder.id===this.props.match.params.id).map((folder, index) => <h2 key={index}>{folder.name}</h2> )}
                <div>
                    {this.context.notes.filter(note=>note.folderid == this.props.match.params.id).map((note, index) => <div key={index}>
                        <NavLink to={`/note/${note.id}`}>{note.name}</NavLink>
                        <p>Last modified: {note.modified}</p>
                        <button
                            onClick={() => this.props.history.push('/')
                            }
                        >Delete</button>
                    </div>)}
                </div>
            </div>
        )
    }
}