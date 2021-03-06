import { ApolloClient, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'

const wsLink = new WebSocketLink({
	uri: 'ws://localhost:4000/graphql',
	options: {
		reconnect: true,
	},
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: wsLink,
})

export default client
