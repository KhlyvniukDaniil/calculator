import { Stack } from "../Structures/index.js"


export class Validator {
	static isValid(expr) {
		expr = expr.replaceAll(" ", "")
		const lastSymbol = expr.slice(-1)
		const firstSymbol = expr.slice(0, 1)
		const {
			isOp,
			divisionByZero,
			isBracketsValid,
			isOperationValid
		} = Validator

		const validCondition = (
			expr.length > 0
			&&
			!isOp(lastSymbol)
			&&
			!isOp(firstSymbol)
			&&
			!divisionByZero(expr)
			&&
			isBracketsValid(expr)
			&&
			isOperationValid(expr)
		)

		if (validCondition) {
			return true
		} else {
			throw new Error("Expression is not valid")
		}
	}

	static isOperationValid(expr) {
		let lastOpIndex = -1

		for (let i = 0; i < expr.length; i++) {
			const currSymb = expr[i]

			if (Validator.isOp(currSymb)) {
				if (lastOpIndex >= 0 && lastOpIndex === (i - 1)) {
					return false
				}
				lastOpIndex = i
			}
		}
		return true
	}

	static isOp(symbol) {
		const ops = [ "+", "-", "/", "*", "^" ]
		return ops.includes(symbol)
	}

	static isBracketsValid(expr) {
		const brackets = { "(": ")" }
		const stack = new Stack()

		for (let i = 0; i < expr.length; i++) {
			const symbol = expr[i]

			if (symbol in brackets) {
				stack.add(symbol)
			}
			if (brackets["("] === symbol) {
				if (stack.getSize() === 0) return false
				stack.pop()
			}
			if (!Validator.checkNearSymbolsToBrackets(expr, i, symbol)) {
				return false
			}
		}
		return true
	}

	static divisionByZero(expr) {
		for (let i = 0; i < expr.length; i++) {
			const symbol = expr[i]
			if (symbol !== "/") continue
			if (expr[i + 1] === "0" && expr[i + 2] !== ".") return true
		}
		return false
	}

	static checkNearSymbolsToBrackets(expr, currIndex, currBrackets) {
		const symBefore = expr[currIndex - 1]
		const symAfter = expr[currIndex + 1]

		if (currBrackets === "(") {
			return (
				(symAfter === "(" || typeof +symAfter === "number" || symAfter === "-")
				&&
				(Validator.isOp(symBefore) || symBefore === "(" || symBefore === undefined)
			)
		}
		if (currBrackets === ")") {
			return (
				(symAfter === ")" || Validator.isOp(symAfter) || symAfter === undefined)
				&&
				(symBefore === ")" || typeof +symBefore === "number") && !Validator.isOp(symBefore)
			)
		}
		return true
	}
}




