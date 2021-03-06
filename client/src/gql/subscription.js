import { gql } from '@apollo/client'

const USER_ADDED = gql`
	subscription {
		userAdded {
			id
			name
		}
	}
`

const USER_REMOVED = gql`
	subscription {
		userRemoved {
			id
		}
	}
`

const CHAT_ADDED = gql`
	subscription {
		chatAdded {
			text
			createdAt
			user {
				id
				name
			}
		}
	}
`

const subscription = {
	USER_ADDED,
	USER_REMOVED,
	CHAT_ADDED,
}

export default subscription
