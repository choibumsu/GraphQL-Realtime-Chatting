import { gql } from '@apollo/client'

const GET_USERS = gql`
	query {
		getUsers {
			id
			name
		}
	}
`

const query = {
	GET_USERS,
}

export default query
