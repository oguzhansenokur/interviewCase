import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch } from 'react-redux';
import './style.scss';
import { setUpdateModalVisibility } from '../../redux/actions/updateModalAction';
import { setViewModalVisibility } from '../../redux/actions/viewModalAction';
import { setDetailedUser } from '../../redux/actions/detailedUserAction';
import axios from 'axios';
import { setAddTodoModalAction } from '../../redux/actions/addTodosModalAction';
export default function UserComp({ id ,username, email, gender, status }) {
  const dispatch = useDispatch();
  const showUpdateModal = () => {
    dispatch(setUpdateModalVisibility(true))
    dispatch(setDetailedUser(id))
  }
  const showViewModal = () => {
    dispatch(setViewModalVisibility(true))
    dispatch(setDetailedUser(id))
  }
  const showAddTodoModal = () => {
    dispatch(setAddTodoModalAction(true))
    dispatch(setDetailedUser(id))
  }
  const token = localStorage.getItem('token')
  const headers = { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'

  }
  const handleDelete = async () => {
    const deleteRequest = {
      method: 'delete',
      url: `https://gorest.co.in/public/v2/users/${id}`,
      headers:headers
    };
    try {
      await axios(deleteRequest).then((response)=> response)

    }
    catch(error) {
      console.log(error)
    }
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{username}</Card.Header><button onClick={handleDelete} className='delete-button bg-danger'></button>
      <ListGroup variant='flush'>
        <ListGroup.Item>{id}</ListGroup.Item>
        <ListGroup.Item>{email}</ListGroup.Item>
        <ListGroup.Item>{gender}</ListGroup.Item>
        <ListGroup.Item>{status}</ListGroup.Item>
      </ListGroup>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexGrow: '1'
        }}
      >
        <button onClick={showUpdateModal} type='button' data-toggle='modal' datatarget='#update-modal' className='btn btn-warning rounded-0 act-button rounded-left-bottom'>
          Update
        </button>
        <button onClick={showViewModal} className='btn btn-success rounded-0 act-button rounded-right-bottom'>View</button>
        <button onClick={showAddTodoModal} className='btn btn-info rounded-0 act-button rounded-right-bottom'>Add Todo</button>
      </div>
    </Card>
  );
}
