import { Queue, Stack } from "../Structures/index.js"


export class Parser {
	#output
	#operationStack
	#priority
	#infixExpression

	constructor(expr) {
		this.#output = new Queue()
		this.#operationStack = new Stack()
		this.#priority = {
			"+": 2,
			"-": 2,
			"*": 3,
			"/": 3,
			"^": 4
		}
		this.#infixExpression = Parser.#parseUnaryMinus(expr.replaceAll(" ", ""))
	}

	/**
	 * RPN - [Reverse Polish
	 * notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation);
	 *
	 * parsing algorithm - [Shunting yard
	 * algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm)
	 */
	toRPN() {
		const inputEx = this.#infixExpression
		let indexOfStartNumber = 0

		for (let i = 0; i < inputEx.length; i++) {
			const currSymbol = inputEx[i]
			const isEnd = (i + 1 === inputEx.length)
			const bracket = Parser.#checkBrackets(currSymbol)

			if (this.#isOperation(currSymbol)) {
				this.#setNumberToOutput(indexOfStartNumber, i)
				this.#setOperation(currSymbol)
				indexOfStartNumber = (i + 1)
			}

			if (bracket) {
				this.#bracketsOperation(bracket, currSymbol, indexOfStartNumber, i)
				if (bracket[")"]) indexOfStartNumber = (i + 1)
			}

			if (isEnd) {
				this.#setNumberToOutput(indexOfStartNumber, i + 1)
				this.#fromOperationStackToOutput()
			}
		}
		return this.#output
	}

	static #parseUnaryMinus(inputEx) {
		inputEx = inputEx.split("")

		for (let i = 0; i < inputEx.length; i++) {
			const currSymbol = inputEx[i]
			if (currSymbol !== "-") continue

			if ((inputEx[i - 1] === "(") && (typeof +inputEx[i + 1] === "number")) {
				inputEx.splice(i, 1, "0-")
			}
		}
		return inputEx.join("").toString()
	}

	#setNumberToOutput(indexOfStartNumber, i) {
		let num = this.#splitNumberFromExpression(indexOfStartNumber, i)
		if (typeof num === "number") {
			this.#output.enqueue(num)
		}
	}

	#setOperation(currOperation) {
		const comparison = this.#comparisonCurrAndPrevOperations(currOperation)
		switch (comparison) {
			case "currOpBigger":
				this.#operationStack.add(currOperation)
				return

			case "currOpEqual":
				if (currOperation === "^") {
					this.#operationStack.add(currOperation)
				}
				const prevOp = this.#operationStack.pop()
				this.#operationStack.add(currOperation)
				this.#output.enqueue(prevOp)
				return

			case "currOpSmaller":
				this.#fromOperationStackToOutput()
				this.#operationStack.add(currOperation)
				return
		}
	}

	#bracketsOperation(bracket, currSymbol, indexOfStartNumber, ind) {
		if (bracket["("]) {
			this.#operationStack.add(currSymbol)
		}
		if (bracket[")"]) {
			this.#setBracketsExpression(ind, indexOfStartNumber)
		}
	}

	#comparisonCurrAndPrevOperations(currOperation) {
		if (this.#operationStack.getSize() > 0) {
			const prevOpPriority = this.#priority[this.#operationStack.last()] || 0
			const currOpPriority = this.#priority[currOperation]
			const results = {
				"currOpBigger": currOpPriority > prevOpPriority,
				"currOpEqual": currOpPriority === prevOpPriority,
				"currOpSmaller": currOpPriority < prevOpPriority
			}
			for (const key in results) {
				if (results[key]) return key
			}
		} else {
			return "currOpBigger"
		}
	}

	#setBracketsExpression(currInd, indexOfStartNumber) {
		const stackSize = this.#operationStack.getSize()
		this.#setNumberToOutput(indexOfStartNumber, currInd + 1)

		for (let i = stackSize - 1; i >= 0; i--) {
			const operation = this.#operationStack.pop()

			if (operation === "(") break
			if (operation) this.#output.enqueue(operation)
		}
	}

	#fromOperationStackToOutput() {
		const stackSize = this.#operationStack.getSize()

		for (let i = stackSize - 1; i >= 0; i--) {
			const operation = this.#operationStack.getData()[i]
			if (operation === "(") break
			this.#output.enqueue(operation)
		}

		this.#operationStack.clear()
	}

	#splitNumberFromExpression(indexOfStartNumber, currInd) {
		let num = this.#infixExpression.slice(indexOfStartNumber, currInd)
		let res = ""
		for (let el of num) {
			if (typeof parseFloat(el) === "number" && !isNaN(parseFloat(el)) || el === ".") {
				res += el
			}
		}
		if (res !== "") {
			return parseFloat(res)
		}
	}

	static #checkBrackets(symbol) {
		const brackets = {
			"(": false,
			")": false
		}
		if (brackets[symbol] === undefined) {
			return null
		} else {
			brackets[symbol] = true
			return brackets
		}
	}

	#isOperation(symbol) {
		return this.#priority[symbol] !== undefined
	}
}