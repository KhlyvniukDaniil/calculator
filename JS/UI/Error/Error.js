export class Error {
	static #error_elem = document.createElement("h6")

	constructor({ message }) {
		this.message = message

		this.render()
	}

	render() {
		if (document.querySelector(".error")) {
			document.querySelector(".error").remove()
		}
		Error.#error_elem.classList.add("error")
		Error.#error_elem.innerText = this.message

		document.querySelector(".calculator").prepend(
			Error.#error_elem
		)
	}

	static remove() {
		Error.#error_elem.remove()
	}
}