const NAMES = [
	'개코원숭이',
	'바다거북이',
	'범고래',
	'스왈로브스키',
	'개미핥기',
	'나무늘보',
	'붉은개미',
	'대왕 오징어',
	'밍크 고래',
	'캡틴 아메리카',
	'정육왕',
	'고기 남자',
	'승우 아빠',
	'육식맨',
	'코브라',
	'메가 커피',
]

export const getRandomName = () => {
	const index = parseInt(Math.random() * NAMES.length)
	return NAMES[index]
}
