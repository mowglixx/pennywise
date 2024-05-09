"use client"

import { useEffect, useState } from "react"

const HomePage = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users').then(data => data.json()).then(json => {
      console.log(json)
      setUsers(json?.result)
    })
  }, [])

  return (
    <>
      <main>
        <section>
          <h2>Add Users</h2>
          {/* <AddUsersForm /> */}
        </section>
        <section>
          <h2>Users</h2>
          {!users?.length ? (<>Loading Users...</>) : (<table>
            <thead>
              <tr>
                <th>Username</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
            {!users?.length ? [<>Loading Users...</>] : users.map((user) => {
              
              return (
                <tr key={user?._id}>
                  <td title="Username">{user.username}</td>
                  <td title="ID">{user._id}</td>
                </tr>)
            })}
            </tbody>
          </table>)}
        </section>
      </main>
    </>
  )
}

export default HomePage