import { Calculator } from "../../Calculator/Calculator.js"
import { Parser } from "../../Parser/Parser.js"
import { Validator } from "../../Validator/Validator.js"
import { Error } from "../Error/Error.js"


export const handleClick = (ev) => {
	Error.remove()
	const inputEl = document.querySelector(".calculator__input")
	inputEl.scrollTop = inputEl.scrollHeight

	if (ev.target.classList.contains("key-result")) {
		return getResult(inputEl)
	}
	if (ev.target.classList.contains("clear")) {
		return clearOneSymbol(inputEl)
	}
	if (ev.target.classList.contains("clearAll")) {
		return clearAll(inputEl, ev)
	}

	return input(inputEl, ev)
}


const getResult = (inputEl) => {
	try {
		if (Validator.isValid(inputEl.textContent)) {
			const exprPRN = new Parser(inputEl.textContent).toRPN()
			const res = Calculator.calc(exprPRN)
			inputEl.textContent = Calculator.round(res)
		}
	} catch (err) {
		new Error({ message: "Expression is not valid" })
	}
}

const clearOneSymbol = (inputEl) => {
	inputEl.textContent = inputEl.textContent.slice(0, inputEl.textContent.length - 1)
}

const clearAll = (inputEl, ev) => {
	inputEl.textContent = ""
	ev.target.style.animationName = "changeColor"

	setTimeout(() => {
		ev.target.style.animationName = ""
	}, 251)
}

const input = (inputEl, ev) => {
	const symbol = ev.target.getAttribute("data")
	inputEl.textContent += symbol
}