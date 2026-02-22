import React, { useContext, useEffect, useState } from 'react'
import { MechanicsContext } from '../Context/MechanicsContext'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ViewMechanics() {
  let { MechanicsData, getMechanics } = useContext(MechanicsContext)
  let [search, setSearch] = useState('') 
  useEffect(() => {
    getMechanics()
  }, [])
  if (!MechanicsData) return <div>Loading...</div>;
  let deleteMechanics = async (id) => {
    try {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Do you want to delete this mechanic?',
        confirmButtonColor: '#ffbf00ff',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        cancelButtonText: 'No, Keep It',
        confirmButtonText: 'Yes, Delete'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await axios.delete(`http://localhost:3000/mechanics/deletemechanic?id=${id}`);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Mechanic Deleted',
            showConfirmButton: false,
            timer: 1000
          });
          getMechanics();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  let filteredMechanics = search ? MechanicsData.filter(m => m.name.toLowerCase().includes(search.toLowerCase())) : MechanicsData

  return (
    <>
      <h2 className='text-center text-uppercase fw-bold h1 my-5'>View Mechanics</h2>
      <div className='container text-end d-flex justify-content-between align-items-center'>
        <div className="search-bar w-75">
          <input type="text" className="form-control p-2 fw-bold shadow-lg" placeholder="Search for a service..." onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Link className="btn btn-success text-uppercase text-white fw-bold fs-5 " to='/admin/mechanics/add'>ADD MECHANIC</Link>
      </div>
      <div className="container my-5 p-3 bg-dark rounded-4">
        <table className="table table-hover table-borderless">
          <thead>
            <tr className="text-center align-middle ">
              <th scope="col" className='bg-transparent text-secondary'>Name</th>
              <th scope="col" className='bg-transparent text-secondary'>Email</th>
              <th scope="col" className='bg-transparent text-secondary'>Phone</th>
              <th scope="col" className='bg-transparent text-secondary'>Specialization</th>
              <th scope="col" className='bg-transparent text-secondary'>Rating</th>
              <th scope="col" className='bg-transparent text-secondary'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMechanics.map((mechanic, index) => {
              return (
                <tr key={index} className=" text-center align-middle border border-secondary">
                  <td className='bg-transparent text-light py-4'>{mechanic.name}</td>
                  <td className='bg-transparent text-light'>{mechanic.email}</td>
                  <td className='bg-transparent text-light'>{mechanic.phone}</td>
                  <td className='bg-transparent text-light'>{mechanic.specialization}</td>
                  <td className='bg-transparent text-light'>{'⭐'.repeat(mechanic.rating)}</td>
                  <td className='bg-transparent text-light'>
                    <Link className="btn btn-warning text-uppercase text-white fw-bold fs-6 m-2" to={`/admin/mechanics/edit/${mechanic.id}`}><i className="fa-solid fa-pen"></i></Link>
                    <button className="btn btn-danger text-uppercase text-white fw-bold fs-6 my-2" onClick={() => deleteMechanics(mechanic.id)}><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
