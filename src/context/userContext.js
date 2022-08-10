import { createContext, React } from 'react'
import { useState } from 'react'

export const UserContext = createContext()

function UserProvider({ children }) {
	const [user, setUser] = useState(localStorage.getItem('user') || false)

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
