import Modal from 'react-bootstrap/Modal'

const LoadModal = ({show, unshow, indexedDB}) => {

    function getSavedPlaylists() {
    
        return new Promise(function (resolve) {
    
            const dbPromise = indexedDB.open("SavedPlaylists", 1)
            dbPromise.onsuccess = () => {
                const db = dbPromise.result;
                const request = db.transaction("playlists", "readonly")
                    .objectStore("playlists")
                    .getAll();
                request.onsuccess = (e) => {
                    resolve(e);
                }
                request.onsuccess = (e) => {
                    resolve(e);
                } 
            }
            dbPromise.onerror = (e) => {
                resolve(e);
            }
    
        })
    
    }

    
    
    return (
        <Modal
            show={show}
            onHide={unshow}
            backdrop="static"
            scrollable={false}
            centered>
            <Modal.Body>
                <div>
                    {
                        
                    }
                </div>
            </Modal.Body>
        </Modal>
    )

}

export default LoadModal