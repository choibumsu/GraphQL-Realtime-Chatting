import { gql } from '@apollo/client'

const POST_USER = gql`
	mutation($input: UserInput!) {
		postUser(input: $input) {
			id
			name
		}
	}
`

const DELETE_USER = gql`
	mutation($id: Int!) {
		deleteUser(id: $id) {
			id
		}
	}
`

const POST_CHAT = gql`
	mutation($input: ChatInput!) {
		postChat(input: $input) {
			text
		}
	}
`

const mutation = {
	POST_USER,
	DELETE_USER,
	POST_CHAT,
}

export default mutation
