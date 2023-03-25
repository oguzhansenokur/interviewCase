import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import UserComp from '../../components/UserComp/UserComp'
import { setUsers } from '../../redux/actions/usersActions'
import axios from 'axios'
import './style.scss'
import { ActModal, ViewModal } from '../../components'
import AddUserModal from '../../components/AddUserModal/AddUserModal'
import { setAddUserModalAction } from '../../redux/actions/addUserModalAction'
import AddTodoModal from '../../components/AddTodoModal/AddTodoModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate'

export default function Dashboard() {
    const users = useSelector((state)=> state.allUsers.users)
    const detailedUser = useSelector((state)=> state.detailedUserID.detailedUser)
    const addUserModal = useSelector((state) => state.addUserModalV.addUserModal);
    const dispatch = useDispatch();
    const [loadStatus, setLoadStatus] = React.useState('loading')
    const fetchUsers = async (pageNumber) => {
        const response = await axios.get(`https://gorest.co.in/public/v2/users?page=${pageNumber+1}&per_page=100`)
        .catch(error => console.log('error', error));
        setLoadStatus('success')
        dispatch(setUsers(response.data))
    }
    React.useEffect(() => {
        fetchUsers(0);
    }, [detailedUser])

    const handleAddUserModal = () => {
      dispatch(setAddUserModalAction(true))
    }
    const handlePageClick = (event) => {
      fetchUsers(event.selected)
    };
  
  return (
    <div className="page-container">
      <div className="settings">    
        <button onClick={handleAddUserModal} className="btn btn-success">Add User</button>
        </div>
      <div className="item-wrapper">
          {
          loadStatus==='loading' ?
          <div style={{ display:'flex', alignItems:'center',justifyContent:'center'}}>
          <iframe src="https://embed.lottiefiles.com/animation/9844"></iframe>          
          </div>
          :users.sort(({ id: previousID }, { id: currentID }) => previousID - currentID).map((item) => { 
          return(
            <>
          <UserComp key={item.id} id={item.id} username={item.name} email={item.email} gender={item.gender} status={item.status} />
          </>
          )
     })}
          <div style={{position:"sticky", bottom:0}}>       
          <ReactPaginate
          activeClassName={'item active '}
          breakClassName={'item break-me '}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          nextClassName={"item next "}
          nextLabel={<p style={{position:'absolute', fontSize:'18px',right:-80,top:'25%'}}>Next Item</p>}
          pageClassName={'item pagination-page '}
          className='pagination'
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={100}
          pageCount={25}
          previousLabel={<p style={{position:'absolute', fontSize:'18px',left:-110, bottom:0}}>Previous Item</p>}
          renderOnZeroPageCount={null}
  /></div>
          <AddTodoModal/>
          <ViewModal/>
          <ActModal/>
          <AddUserModal/>
          <ToastContainer />
      </div>
    </div>

  )
}
