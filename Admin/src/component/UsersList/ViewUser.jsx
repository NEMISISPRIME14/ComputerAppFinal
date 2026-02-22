import React, { useContext } from 'react'
import { UsersContext } from '../Context/UsersContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios' 

export default function ViewUser() {
  let { UsersData,getUsers } = useContext(UsersContext)
  
  let navigate = useNavigate()
  let onClickDeleteUser = async (id) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Do you want to delete this user?',
      confirmButtonColor: '#ffbf00ff',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      cancelButtonText: 'No, Keep It',
      confirmButtonText: 'Yes, Delete!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await axios.delete(`http://localhost:3000/users/deleteuser?id=${id}`);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User Deleted',
            showConfirmButton: false,
            timer: 1000
          });
          getUsers();
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  return (
    <>
    <h2 className="text-center fw-bold fs-1 text-uppercase">Users List</h2>
      <div className="container my-5 p-3 bg-dark rounded-4">
        <table className="table table-hover table-borderless">
          <thead>
            <tr className="text-center align-middle ">
              <th scope="col"  className='bg-transparent text-secondary'>Full Name</th>
              <th scope="col"  className='bg-transparent text-secondary'>Address</th>
              <th scope="col"  className='bg-transparent text-secondary'>Email</th>
              <th scope="col"  className='bg-transparent text-secondary'>Password</th>
              <th scope="col"  className='bg-transparent text-secondary'>Phone</th>
              <th scope="col"  className='bg-transparent text-secondary'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              UsersData?.map((user, index) => (
                <tr key={index} className="text-center align-middle border border-secondary">
                  <td  className='bg-transparent text-light py-4'>{user.first_name} {user.last_name}</td>
                  <td  className='bg-transparent text-light'>{user.address}</td>
                  <td  className='bg-transparent text-light'>{user.email}</td>
                  <td  className='bg-transparent text-light'>{'•'.repeat(user.password.length)}</td>
                  <td  className='bg-transparent text-light'>{user.phone}</td>
                  <td  className='bg-transparent text-light'>
                    <button className="btn btn-danger text-white fw-bold mx-2" onClick={()=>onClickDeleteUser(user.id)}><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
