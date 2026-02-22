import React from 'react'
import { useContext } from 'react'
import { MessagesContext } from '../Context/MessagesContext'
import { UsersContext } from '../Context/UsersContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Messages() {
    let { MessagesData, getMessages } = useContext(MessagesContext)
    let {UsersData} = useContext(UsersContext)
    useEffect(() => {
        getMessages()
    }, [])

    const getUserName = (userId) => {
        const user = UsersData?.find(u => u.id === userId);
        return user ? user.first_name + ' ' + user.last_name : 'Unknown'
    }
  return (
    <>
    <h2 className="text-center text-uppercase fw-bold h1 mb-5">Messages</h2>
    <div className="container my-5 p-4 bg-dark rounded-4">
        <table className="table table-hover table-borderless">
            <thead>
                <tr className="text-center align-middle p-5">
                    <th scope="col" className='bg-transparent text-secondary'>User Name</th>
                    <th scope="col" className='bg-transparent text-secondary'>Subject</th>
                    <th scope="col" className='bg-transparent text-secondary'>Content</th>
                </tr>
            </thead>
            <tbody>
                {
                    MessagesData.map((message, index) => {
                        return (
                            <tr key={index} className="text-center align-middle">
                                <td className="bg-transparent text-light w-25">
                                    {getUserName(message.user_id)}
                                </td>
                                <td className="bg-transparent text-light w-25">
                                    {message.subject}
                                </td>
                                <td className="bg-transparent text-light w-25">
                                    {message.content}
                                </td>
                            </tr>
                        );
                    })
                }

            </tbody>
        </table>
    </div>
    </>
  )
}
