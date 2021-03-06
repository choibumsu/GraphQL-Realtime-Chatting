const getFormatDate = (date) => {
	const hours = date.getHours()
	const minutes = date.getMinutes()
	return `${hours < 10 ? '0' + hours : hours}:${
		minutes < 10 ? '0' + minutes : minutes
	}`
}

const Chat = (props) => {
	return (
		<div className={'chat ' + (props.userId === props.user.id ? 'my' : '')}>
			<div className="user">{props.user.name}</div>
			<div className="text">
				<article>{props.text}</article>
				<div className="date">{getFormatDate(new Date(props.createdAt))}</div>
			</div>
		</div>
	)
}

export default Chat
