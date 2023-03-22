export default class Queue {
	#storage
	#oldIndex
	#newIndex

	constructor() {
		this.#oldIndex = 0
		this.#newIndex = 0
		this.#storage = {}
	}

	#oldIndexDecrement() {
		this.#oldIndex--
	}

	#oldIndexIncrement() {
		this.#oldIndex++
	}

	#newIndexDecrement() {
		this.#newIndex--
	}

	#newIndexIncrement() {
		this.#newIndex++
	}

	enqueue(data) {
		this.#storage[this.#newIndex] = data
		this.#newIndexIncrement()
	}

	dequeue() {
		if (this.#oldIndex !== this.#newIndex) {
			const deletedData = this.#storage[this.#oldIndex]
			delete this.#storage[this.#oldIndex]
			this.#oldIndexIncrement()
			return deletedData
		} else {
			throw  new RangeError("Can not delete. Queue is empty")
		}
	}

	getSize() {
		return this.#newIndex - this.#oldIndex
	}

	getData() {
		return this.#storage
	}
}