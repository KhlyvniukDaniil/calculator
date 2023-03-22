import { Stack } from "../Structures/index.js"


export class Calculator {
	static #result = new Stack()

	static calc(exprInPRN) {
		if (exprInPRN.getSize() === 0) return Calculator.#result.last()
		const symbol = exprInPRN.dequeue()

		if (typeof symbol === "number") {
			Calculator.#result.add(symbol)
		} else {
			Calculator.#operations(symbol)
		}

		return Calculator.calc(exprInPRN)
	}

	static #operations(operation) {
		const a = Calculator.#result.pop()
		const b = Calculator.#result.pop()
		switch (operation) {
			case "+":
				return Calculator.#result.add((b + a))
			case "-":
				return Calculator.#result.add((b - a))
			case "/":
				return Calculator.#result.add((b / a))
			case "*":
				return Calculator.#result.add((b * a))
			case "^":
				return Calculator.#result.add(Math.pow(b, a))
		}
	}

	static isFloat(n) {
		return Number(n) === n && n % 1 !== 0
	}

	static round(number) {
		if (Calculator.isFloat(number)) {
			return +number.toFixed(5)
		} else {
			return number
		}
	}
}