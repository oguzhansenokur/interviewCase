import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setViewModalVisibility } from '../../redux/actions/viewModalAction';
import axios from 'axios';

export default function ViewModal({ type }) {
  const viewModalVisible = useSelector((state) => state.viewModalV.viewModalVisible);
  const detailedUserID = useSelector((state) => state.detailedUserID.detailedUser);
  const [currentData, setCurrentData] = React.useState([]);
  const [loadingState, setLoadingState] = React.useState(false);
  const [errorState,setError] = React.useState(false);
  const dispatch = useDispatch();
  const fetchTodosByUser = async () => {
    setLoadingState(true)
    try {
      await axios.get('https://gorest.co.in/public/v2/users/'+detailedUserID+'/todos').then((response)=>
      setCurrentData(response.data)
      )
      setLoadingState(false)
      setError(false)
    }
    catch(error) {
      setError(true)
    }
    
  }
  const hideViewModal = () => {
    dispatch(setViewModalVisibility(false));
  };

  React.useEffect(() => {
    fetchTodosByUser()
  }, [detailedUserID]); 
  return (
    <>
    {!loadingState && !errorState ? <Modal size='lg' show={viewModalVisible} onHide={hideViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>User TODOS {detailedUserID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table class='table'>
         <tbody>
        {currentData.length!==0 ?
      
         <tr>
         <th scope="col">ID</th>
         <th scope="col">Title</th>
         <th scope="col">Due on</th>
         <th scope="col">Status</th>
        </tr>
        :
          null
        }
         
            {currentData.length===0 ? <p>There is no TODOS to listed!</p> : currentData.map((item)=>{
              return (
                <>
                 <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.due_on}</td>
                  <td>{item.status}</td>
                </tr>
                </>
              )
            })} 
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>: loadingState && !errorState ?
      <Modal show={viewModalVisible} onHide={hideViewModal}>
      <Modal.Header closeButton>
        <Modal.Title>User TODOS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <p>Loading...</p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>:
     <Modal show={viewModalVisible} onHide={hideViewModal}>
     <Modal.Header closeButton>
       <Modal.Title>User TODOS</Modal.Title>
     </Modal.Header>
     <Modal.Body>
      <p>Error!</p>
     </Modal.Body>
     <Modal.Footer></Modal.Footer>
   </Modal>

      }
      
    </>
  );
}
