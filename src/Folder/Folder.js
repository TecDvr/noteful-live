import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import './Folder.css';
import NotefulContext from '../NotefulContext';
import AddFolder from '../AddFolder/AddFolder';

class Folder extends React.Component {
    static contextType = NotefulContext;
    render() {
        return (
                    <div className='folderList'>
                        <div>
                            {this.context.folders.map((folder,index) => <NavLink className='nameLink' key={`folder-nav-link-${index}`} to={`/folder/${folder.id}`}>{folder.name}</NavLink>)}
                        </div>
                        
                        <div>
                            <AddFolder />
                        </div>
                        <Route path='/note' render={() => <button onClick={() => this.props.history.goBack()}>Go Back</button>}/>
                    </div>      
        ) 
    }
}

export default withRouter(Folder);