import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setAddUserModalAction } from '../../redux/actions/addUserModalAction';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddUserModal({ type }) {
  const dataPropType = {
    name: '',
    email: '',
    gender: '',
    status: ''
  };
  const addUserModal = useSelector((state) => state.addUserModalV.addUserModal);
  const [loadingState, setLoadingState] = React.useState(false);
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');
  const [newData, setNewData] = React.useState(dataPropType);
  const hideAddModal = () => {
    setNewData({
      name:'',
      email:'',
      gender:'male',
      status:'inactive'
    })
    dispatch(setAddUserModalAction(false));
  };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setNewData((prevData)=> ({
      ...prevData,
      [name]:value, 
      }))
    }

    const TODO_TOSTIFY_SUCCESS = () => {
      toast.success('User has been added successfully!',{
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
    const TODO_TOSTIFY_FAIL = () => {
      toast.error('There is an error while adding User!', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const handleUpdate = async () => {
        const addUserData = {
            name:newData.name,
            email:newData.email,
            gender:newData.gender,
            status:newData.status
        }
    const addUserRequest = {
        headers:headers,
        url:'https://gorest.co.in/public/v2/users/',
        method:'post',
        data:addUserData
    }
    try{
     await axios(addUserRequest).then((response)=> response.status===201 ? TODO_TOSTIFY_SUCCESS() : TODO_TOSTIFY_FAIL()).catch((error)=>TODO_TOSTIFY_FAIL())
     
     .catch((error)=>error)
    }catch(error) {
        console.log(error)
    }
    }



  return (
    <>
      {loadingState  ? 
       <Modal show={addUserModal} onHide={hideAddModal}>
       <Modal.Header closeButton>
       <Modal.Title>Add User</Modal.Title>
       </Modal.Header>
         <Modal.Body>
           Loading...
         </Modal.Body>
       </Modal>
      :  
      <form>
      <Modal show={addUserModal} onHide={hideAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='form-group'>
          <label >Full Name</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputEmail4'
            name="name"
            aria-describedby='emailHelp'
            placeholder='Username'
            value={newData.name}
            onChange={handleChange}
          required/>
        </div>
        <div className='form-group'>
          <label >Email</label>
          <input
            type='text'
            className='form-control'
            name="email"
            id='exampleInputPassword0'
            placeholder='E-mail'
            value={newData.email}
            onChange={handleChange}
            required/>
        </div>
        <div className='form-group'>
          <label >Gender</label>
          <select name="gender" onChange={handleChange} value={newData.gender} className='form-select' aria-label='Default select example'>
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className='form-group'>
          <label >Status</label>
          <select name="status" onChange={handleChange} value={newData.status} className='form-select' aria-label='Default select example'>
            <option value="inactive" selected>Inactive</option>
            <option value="active">Active</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleUpdate} type='submit' className='btn btn-primary' disabled={!newData.name || !newData.email ? true : false  }>
          Submit
        </button>
      </Modal.Footer>
    </Modal>
    </form>

    }
    </>
  );
}
