export const users = [
	{
		id: 1,
		name: '김성익',
		age: 25,
	},
	{
		id: 2,
		name: '김종혁',
		age: 26,
	},
	{
		id: 3,
		name: '최범수',
		age: 26,
	},
	{
		id: 4,
		name: '황인준',
		age: 26,
	},
]

const userClosure = () => {
	let newId = users.length + 1

	return {
		getId: () => newId,
		addId: () => ++newId,
	}
}

export const userConfig = userClosure()
