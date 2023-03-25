import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateModalVisibility } from '../../redux/actions/updateModalAction';
import axios from 'axios';
import { setDetailedUser } from '../../redux/actions/detailedUserAction';
import { toast } from 'react-toastify';


export default function ActionModal({ type }) {
  const dataPropType = {
    name: '',
    email: '',
    gender: '',
    status: ''
  };
  const updateModalVisible = useSelector((state) => state.updateModalV.updateModalVisible);
  const detailedUserID = useSelector((state) => state.detailedUserID.detailedUser);
  const [loadingState, setLoadingState] = React.useState(false);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = React.useState([]);
  const [newData, setNewData] = React.useState(dataPropType);
  const hideUpdateModal = () => {
    setNewData({
      name:'',
      email:'',
      gender:'',
      status:''
    })
    dispatch(setUpdateModalVisibility(false));
  };

  const fetchDetailedData = async () => {
    setLoadingState(true)
    try {
      await axios.get('https://gorest.co.in/public/v2/users/' + detailedUserID).then((response)=>setCurrentData(response.data))
    }
    catch(error) {
      console.log(error)
    }
    setLoadingState(false)
    };

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


    const TODO_TOSTIFY_SUCCESS = () => {
      toast.success('User Info has been updated successfully!',{
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
    const TODO_TOSTIFY_FAIL = () => {
      toast.error('There is an error while updating User!', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
    

    const handleUpdate = async () => {
      const dataToUpdate = {
        id:detailedUserID,
        name:newData.name.length===0 ? currentData.name : newData.name,
        email:newData.email.length===0 ? currentData.email : newData.email,
        gender:newData.gender.length===0 ? currentData.gender : newData.gender,
        status:newData.status.length===0 ? currentData.status : newData.status
      }
      const updateRequest = {
        method: 'PUT', 
        url: `https://gorest.co.in/public/v2/users/${detailedUserID}`,
        headers: headers,
        data: dataToUpdate,
       }

      try {
       await axios(updateRequest).then((response) => 
        response.status===200 ? TODO_TOSTIFY_SUCCESS() : TODO_TOSTIFY_FAIL()).catch((error)=>TODO_TOSTIFY_FAIL())
      }
      catch(error){
        console.log(error)
      }
      hideUpdateModal()
      dispatch(setDetailedUser(0))
    }

  React.useEffect(() => {
    fetchDetailedData();
  }, [detailedUserID]);


  return (
    <>
      {loadingState  ? 
       <Modal show={updateModalVisible} onHide={hideUpdateModal}>
       <Modal.Header closeButton>
       <Modal.Title>Update User</Modal.Title>
       </Modal.Header>
         <Modal.Body>
           Loading...
         </Modal.Body>
       </Modal>
      :  
      <form>
      <Modal show={updateModalVisible} onHide={hideUpdateModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
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
            placeholder={currentData.name}
            value={newData.name}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label >Email</label>
          <input
            type='text'
            className='form-control'
            name="email"
            id='exampleInputPassword0'
            placeholder={currentData.email}
            value={newData.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label >Gender</label>
          <select name="gender" onChange={handleChange} value={newData.gender} className='form-select' aria-label='Default select example'>
            <option value={currentData.gender} selected>{currentData.gender==='male' ? 'Male' : 'Female'}</option>
            <option value={currentData.gender==='male' ? 'female' : 'male'}>{currentData.status==='male' ? 'Female' : 'Male' }</option>
          </select>
        </div>
        <div className='form-group'>
          <label >Status</label>
          <select name="status" onChange={handleChange} value={newData.status} className='form-select' aria-label='Default select example'>
            <option value={currentData.status} selected>{currentData.status==='inactive' ? 'Inactive' : 'Active'}</option>
            <option value={currentData.status==='active' ? 'inactive' : 'active'}>{currentData.status==='active' ? 'Inactive' : 'Active' }</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleUpdate} type='submit' className='btn btn-primary'>
          Submit
        </button>
      </Modal.Footer>
    </Modal>
    </form>

    }
    </>
  );
}
