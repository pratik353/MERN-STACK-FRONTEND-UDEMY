import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import ErrorModal from "../../shared/components/UIElements/loading/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/loading/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";

const Users = () => {
  const { error, isLoading, sendRequest, clearError} = useHttpClient();
  const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(()=>{
    async function getUsers() {
      // REPLACED BY CUSTOM HOOK
      // setIsLoading(true);
      // try {
      //   const response = await fetch('http://localhost:5000/api/users/');
      //   const responseData = await response.json();
  
      //   if( !response.ok){
      //     throw new Error(responseData.message)
      //   }
  
      //   setUsers(responseData.users);
      // } catch (error) {
      //   setError(error.message);
      // }
      // setIsLoading(false);
    
      try {
        // const responseData = await sendRequest('http://localhost:5000/api/users');
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users');
        setUsers(responseData.users)
      } catch (error) {
        console.log(error);
      };
    }
    getUsers();
  },[sendRequest]);

 

  // const errorHandler = () => {
  //   setError(null);
  // }

//   const USERS = [
//     {
//     id:'u1',
//     image:'https://images.pexels.com/photos/15800210/pexels-photo-15800210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     name:'John',
//     places:3
//   }
// ];

  return (
    <>
      {/* <ErrorModal error={error} onClear={errorHandler}/> */}
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && <LoadingSpinner onOverlay/>}
      <UsersList items={users}/>
    </>
    )
}

export default Users