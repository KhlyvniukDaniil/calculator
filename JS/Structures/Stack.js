export default class Stack {
	#size
	#storage

	constructor() {
		this.#size = 0
		this.#storage = {}
	}

	#sizeDecrement() {
		this.#size--
	}

	#sizeIncrement() {
		this.#size++
	}

	add(data) {
		this.#storage[this.#size] = data
		this.#sizeIncrement()
	}

	pop() {
		if (this.#size > 0) {
			const deletedItem = this.#storage[this.#size - 1]
			delete this.#storage[this.#size - 1]
			this.#sizeDecrement()
			return deletedItem
		} else {
			throw  new RangeError("Can not delete. Stack is empty")
		}
	}

	last() {
		const index = this.#size - 1
		if (index >= 0) {
			return this.#storage[index]
		} else {
			throw  new RangeError("Index out of stack")
		}
	}

	clear() {
		this.#storage = {}
		this.#size = 0
	}

	getSize() {
		return this.#size
	}

	getData() {
		return this.#storage
	}
}