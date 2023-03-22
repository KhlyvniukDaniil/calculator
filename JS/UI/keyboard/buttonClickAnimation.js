export const clickAnimation = (ev) => {
	const circle = document.createElement("div")
	const pos = ev.target.getBoundingClientRect()
	const x = ev.clientX - pos.x
	const y = ev.clientY - pos.y

	circle.classList.add("ripple")
	circle.style.left = `${ x }px`
	circle.style.top = `${ y }px`
	if (ev.target.classList.contains("key-result")) {
		ev.target.style.animationName = "clickResult"
	} else {
		ev.target.style.animationName = "click"
	}
	ev.target.appendChild(circle)

	setTimeout(() => {
		circle.remove()
		ev.target.style.animationName = ""
	}, 500)
}
