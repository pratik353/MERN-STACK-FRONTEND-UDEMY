import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
  const USERS = [
    {
    id:1,
    image:'https://images.pexels.com/photos/15800210/pexels-photo-15800210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name:'John',
    places:3
  }
];
  return <UsersList items={USERS}/>
}

export default Users