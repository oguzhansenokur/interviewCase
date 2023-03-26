import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteModalAction } from '../../redux/actions/deleteModalAction';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { lastDeletedUserIdAction } from '../../redux/actions/lastDeletedUserIdAction';

export default function DeleteModal() {
 
      const deleteModal = useSelector((state) => state.deleteModalV.deleteModal);
      const deleteUserId = useSelector((state) => state.deleteUserID.deleteUserId);
      const [loadingState, setLoadingState] = React.useState(false);
      const token = localStorage.getItem('token');
      const dispatch = useDispatch();
      const hideDeleteModal = () => {

        dispatch(deleteModalAction(false));
      };
    
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
   
        const handleDelete = async () => {
          const deleteRequest = {
            method: 'delete',
            url: `https://gorest.co.in/public/v2/users/${deleteUserId}`,
            headers:headers
          };
          try {
            await axios(deleteRequest).then((response)=> {
                dispatch(lastDeletedUserIdAction(deleteUserId))
                hideDeleteModal()
            })
          }
          catch(error) {
            console.log(error)
          }
        }
    
        const TODO_TOSTIFY_SUCCESS = () => {
          toast.success('User has been deleted successfully!',{
            position: toast.POSITION.BOTTOM_RIGHT
          })
        }
        const TODO_TOSTIFY_FAIL = () => {
          toast.error('There is an error while deleting User!', {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        }
    
  return (
    <>
    {loadingState  ? 
     <Modal show={deleteModal} onHide={hideDeleteModal}>
     <Modal.Header closeButton>
     <Modal.Title>Delete User</Modal.Title>
     </Modal.Header>
       <Modal.Body>
         Loading...
       </Modal.Body>
     </Modal>
    :  
    <form>
    <Modal show={deleteModal} onHide={hideDeleteModal}>
    <Modal.Header closeButton>
      <Modal.Title>Delete User {deleteUserId}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>Are you sure to Delete the User ?</p>
    </Modal.Body>
    <Modal.Footer>
      <button onClick={handleDelete}  type='submit' className='btn btn-primary'>
        Yes
      </button>
      <button onClick={hideDeleteModal} type='submit' className='btn'>
        No
      </button>
    </Modal.Footer>
  </Modal>
  </form>

  }
  </>
  )
}
