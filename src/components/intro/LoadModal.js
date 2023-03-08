import Modal from 'react-bootstrap/Modal'
import './WelcomePage.scss';
import PlaylistButtons from './PlaylistButtons';
import { useEffect, useState } from "react";

function deleteSavePlaylist(name, indexedDB) {
    return new Promise(function(resolve, reject) {
        const dbPromise = indexedDB.open("SavedPlaylists", 1);
        dbPromise.onsuccess = () => {
            const db = dbPromise.result;
            const request = db.transaction("playlists", "readwrite")
                .objectStore("playlists")
                .delete(name);
            request.onsuccess = (e) => {
                console.log("Delete successful.")
                resolve(e);
            }
        }
        dbPromise.onerror = (e) => {
            console.error("Delete failure.")
            reject(e);
        }
    })
}

function getSavedPlaylists(indexedDB) {
    return new Promise(function(resolve, reject) {
        const dbPromise = indexedDB.open("SavedPlaylists", 1)
        dbPromise.onsuccess = () => {
            const db = dbPromise.result;
            const request = db.transaction("playlists", "readonly")
                .objectStore("playlists")
                .getAll();
            request.onsuccess = (e) => {
                resolve(e);
            }
        }
        dbPromise.onerror = (e) => {
            reject(e);
        }
    })
}

const LoadModal = ({show, unshow, indexedDB, setButtonDisabled}) => {

    const [ playlists, setPlaylists ] = useState([]);
    
    
    const handleDelete = (playlist) => {
        console.log("Delete");
        deleteSavePlaylist(playlist.name, indexedDB)
    }

    useEffect(() => {
        getSavedPlaylists(indexedDB)
        .then(function(e) {
            var playlists = e.target.result;
            if (playlists.length === 0) {
                setButtonDisabled(true);
                setPlaylists(playlists);
                unshow();
            } else {
                setButtonDisabled(false);
                setPlaylists(playlists);
            }
        })
        .catch(function(e) {
            console.error(e.target.error);
        })
    }, [setButtonDisabled, indexedDB, playlists, unshow]);

    return (
        <Modal
            show={show}
            onHide={unshow}
            backdrop="static"
            scrollable={false}
            centered>
            <PlaylistButtons
                playlists={playlists}
                handleDelete={handleDelete}/>
            <Modal.Footer>
                <button
                    onClick={unshow}
                    className="load-modal__close">
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )

}

export default LoadModal