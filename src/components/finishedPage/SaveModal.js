import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { useSelector } from 'react-redux';

const SaveModal = ({show, unshow, setButtonText, indexedDB}) => {

    const playlist = useSelector((state) => (state.playlist.playlistData));

    function saveToDatabaseSucessful(name) {
        
        return new Promise(function (resolve) {

            const dbPromise = indexedDB.open("SavedPlaylists", 1);
            dbPromise.onsuccess = () => {
                const db = dbPromise.result;
                const request = db.transaction("playlists", "readwrite")
                    .objectStore("playlists")
                    .add({
                        "name": name,
                        "playlist": playlist
                    });
                request.onsuccess = (e) => {
                    resolve(e);
                }
                request.onerror = (e) => {
                    resolve(e);
                }
            }
            dbPromise.onerror = (e) =>{
                resolve(e);
            }

        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const pname = Object.fromEntries(formData.entries())["playlistName"];
        const event = await saveToDatabaseSucessful(pname)
        if (event.type == "success") {
            unshow();
            setButtonText("Saved!");
        } else if (event.target.error.message.includes("Key already exists")) {
            console.log("Duplicate key error.");
            document.getElementById("msg").style.opacity = "1";
        } else {
            console.log("Other errors.");
        }        
        
    }

    return (
        <Modal
            show={show}
            onHide={unshow}
            backdrop="static"
            scrollable={false}
            centered>
            <Modal.Body>
                <form 
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="save-modal__container">
                    <label 
                        htmlFor="pname"
                        className='save-modal__text'>
                        Playlist Name:
                    </label>
                    <input 
                        id="pname"
                        name="playlistName"
                        className='save-modal__input'
                        placeholder="e.g. 45 minute HIIT"
                        autoFocus
                        required/>
                    <p 
                        id="msg"
                        className='save-modal__error'>
                        A playlist with the same name already exists!
                    </p>
                    <button 
                        type="submit"
                        className='save-modal__button'>
                        <p className='save-modal__buttontext'>
                            Save
                        </p>
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default SaveModal