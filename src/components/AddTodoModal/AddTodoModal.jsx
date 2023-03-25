import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setAddTodoModalAction } from '../../redux/actions/addTodosModalAction';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTodoModal({ type }) {
  const dataPropType = {
    title: '',
    due_on: '',
    status: 'pending'
  };
  const addTodoModal = useSelector((state) => state.addTodoModalV.addTodoModal);
  const detailedUserID = useSelector((state) => state.detailedUserID.detailedUser);
  const [loadingState, setLoadingState] = React.useState(false);
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');
  const [newData, setNewData] = React.useState(dataPropType);
  const hideTodoModal = () => {
    setNewData({
        title: '',
        due_on: 0,
        status: 'pending'
    })
    dispatch(setAddTodoModalAction(false));
  };
    const TODO_TOSTIFY_SUCCESS = () => {
      toast.success('Todo has been added successfully!',{
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
    const TODO_TOSTIFY_FAIL = () => {
      toast.error('There is an error while adding TODO!', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
    const handleChange = (event) => {
      const { name, value } = event.target;
      setNewData((prevData)=> ({
      ...prevData,
      [name]:value, 
      }))
    }
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const handleUpdate = async () => {
        const addTodoData = {
            user_id:detailedUserID,
            title:newData.title,
            due_on:newData.due_on,
            status:newData.status
        }
    const addTodoRequest = {
        headers:headers,
        url:`https://gorest.co.in/public/v2/users/${detailedUserID}/todos`,
        method:'post',
        data:addTodoData
    }
    try{
     await axios(addTodoRequest).then((response)=>
      response.status===201 ? TODO_TOSTIFY_SUCCESS() : TODO_TOSTIFY_FAIL()).catch((error)=>TODO_TOSTIFY_FAIL())
    }catch(error) {
        console.log(error)
    }
    }



  return (
    <>
      {loadingState  ? 
       <Modal show={addTodoModal} onHide={hideTodoModal}>
       <Modal.Header closeButton>
       <Modal.Title>Add Todo</Modal.Title>
       </Modal.Header>
         <Modal.Body>
           Loading...
         </Modal.Body>
       </Modal>
      :  
      <form>
      <Modal show={addTodoModal} onHide={hideTodoModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Todo {detailedUserID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='form-group'>
          <label >Title</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputEmail4'
            name="title"
            aria-describedby='emailHelp'
            placeholder='Todo Title'
            value={newData.title}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='form-group'>
          <label >Date</label>
          <input
            type='datetime-local'
            className='form-control'
            id='exampleInputEmail4'
            name="due_on"
            aria-describedby='emailHelp'
            value={newData.due_on}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className='form-group'>
          <label >Status</label>
          <select name="status" onChange={handleChange} value={newData.status} className='form-select' aria-label='Default select example'>
            <option value="pending">Pending</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleUpdate} type='submit' className='btn btn-primary' disabled={!newData.title || !newData.due_on ? true : false}>
          Submit
        </button>
      </Modal.Footer>
    </Modal>
    </form>

    }
    </>
  );
}
