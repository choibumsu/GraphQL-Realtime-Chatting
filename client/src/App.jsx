/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import query from './gql/query'
import mutation from './gql/mutation'
import subscription from './gql/subscription'
import { getRandomName } from './utils'
import Chat from './components/Chat'
import './styles/style.scss'

function App() {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState(undefined)
	const [chats, setChats] = useState([])

	const queryGetUsers = useQuery(query.GET_USERS)
	const [postUser, postUserResult] = useMutation(mutation.POST_USER)
	const [deleteUser] = useMutation(mutation.DELETE_USER)
	const [postChat] = useMutation(mutation.POST_CHAT)

	const subUserAdded = useSubscription(subscription.USER_ADDED)
	const subUserRemoved = useSubscription(subscription.USER_REMOVED)
	const subChatAdded = useSubscription(subscription.CHAT_ADDED)

	const chatContainer = useRef()
	const chatInput = useRef()

	useEffect(() => {
		window.onbeforeunload = (e) => {
			deleteUser({
				variables: {
					id: user.id,
				},
			})
		}
	}, [user])

	useEffect(() => {
		if (!queryGetUsers.data) return

		setUsers(queryGetUsers.data.getUsers)

		postUser({
			variables: {
				input: {
					name: getRandomName(),
				},
			},
		})
	}, [queryGetUsers])

	useEffect(() => {
		if (!postUserResult.data) return

		const myUser = postUserResult.data.postUser
		setUser(myUser)
	}, [postUserResult.data])

	useEffect(() => {
		if (!subUserAdded.data) return

		setUsers([...users, subUserAdded.data.userAdded])
	}, [subUserAdded.data])

	useEffect(() => {
		if (!subUserRemoved.data) return

		setUsers(users.filter((u) => u.id !== subUserRemoved.data.userRemoved.id))
	}, [subUserRemoved.data])

	useEffect(() => {
		if (!subChatAdded.data) return

		setChats([...chats, subChatAdded.data.chatAdded])
		setTimeout(() => {
			chatContainer.current.scrollTop = chatContainer.current.scrollHeight
		}, 0)
	}, [subChatAdded.data])

	const inputChat = (e) => {
		if (chatInput.current.value === '') return
		if (e.type === 'keydown' && e.keyCode !== 13) return

		postChat({
			variables: {
				input: {
					text: chatInput.current.value,
					userId: user.id,
				},
			},
		})

		chatInput.current.value = ''
	}

	return (
		<div className="App">
			<header>
				<div className="user-container">
					{users.map((u) => (
						<div key={u.id} className="user">
							{u.name[0]}
						</div>
					))}
				</div>
			</header>
			<main>
				<div className="chat-container" ref={chatContainer}>
					{chats.map((chat, index) => (
						<Chat {...chat} userId={user.id} key={index}></Chat>
					))}
				</div>
				<div className="input-container">
					<input type="text" ref={chatInput} onKeyDown={inputChat}></input>
					<button onClick={inputChat}>입력</button>
				</div>
			</main>
		</div>
	)
}

export default App
