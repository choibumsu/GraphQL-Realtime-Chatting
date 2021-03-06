import { PubSub } from 'apollo-server'
import { users, userConfig } from './db.js'

const pubsub = new PubSub()

export const resolvers = {
	Query: {
		getUsers() {
			return users
		},
		getUser(id) {
			return users.find((user) => user.id === id)
		},
	},
	Mutation: {
		postUser(_, { input }) {
			const newUser = {
				id: userConfig.getId(),
				name: input.name,
				age: input.age,
			}
			users.push(newUser)
			userConfig.addId()

			pubsub.publish('USER_ADDED', { userAdded: newUser })
			return newUser
		},
		deleteUser(_, { id }) {
			const removedIndex = users.findIndex((u) => u.id === +id)
			if (removedIndex === -1) return undefined

			const removedUser = { ...users[removedIndex] }
			users.splice(removedIndex, 1)

			pubsub.publish('USER_REMOVED', { userRemoved: removedUser })
			return removedUser
		},
		postChat(_, { input }) {
			const user = users.find((u) => u.id === +input.userId)
			if (!user) return undefined

			const newChat = {
				text: input.text,
				user,
				createdAt: new Date(),
			}

			pubsub.publish('CHAT_ADDED', { chatAdded: newChat })
			return newChat
		},
	},
	Subscription: {
		userAdded: {
			subscribe: () => pubsub.asyncIterator(['USER_ADDED']),
		},
		userRemoved: {
			subscribe: () => pubsub.asyncIterator(['USER_REMOVED']),
		},
		chatAdded: {
			subscribe: () => pubsub.asyncIterator(['CHAT_ADDED']),
		},
	},
}
