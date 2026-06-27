export class StringBuilder {
    private _buffer: string[];
    private _length: number;

    constructor() {
        this._buffer = [];
        this._length = 0;
    }

    /**
     * Appends a string to the end of the buffer. O(1) amortized.
     */
    append(value: string): this {
        this._buffer.push(value);
        this._length += value.length;
        return this;
    }

    /**
     * Prepends a string to the front of the buffer.
     * O(n) due to array unshift — avoid in hot loops.
     */
    prepend(value: string): this {
        this._buffer.unshift(value);
        this._length += value.length;
        return this;
    }

    /**
     * Resets the buffer and length counter. O(1).
     */
    clear(): this {
        this._buffer = [];
        this._length = 0;
        return this;
    }

    /**
     * Total character count across all buffered chunks. O(1).
     * Note: _buffer.length is the number of chunks, not characters.
     * A chunk like "Hello, world" counts as 1 element but 12 characters.
     */
    get length(): number {
        return this._length;
    }

    /**
     * Materializes the buffer into a single string. O(n).
     * This is the only allocation that pays the full O(n) cost.
     */
    toString(): string {
        return this._buffer.join("");
    }
}
