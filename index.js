'use strict';

const checkRange = (range) => {
    if (!Array.isArray(range)) {
        throw new Error('range is not an array')
    }
    if (range.length !== 2) {
        throw new Error('range array length must be 2')
    }
    if (range[0] > range[1]) {
        throw new Error(`start value of range should no more than end value of range`)
    }
}

class RangeCollection {


    constructor() {
        this.intervals = [];
    }


    /**
     * Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {

        checkRange(range)

        let result = [], isInsert = false;

        for (let interval of this.intervals) {
            if (isInsert) {
                result.push(interval);
            } else if (range[1] < interval[0]) { // no overlap and range<interval,insert range before interval
                result.push(range);
                result.push(interval);
                isInsert = true;
            } else if (range[0] > interval[1]) { // no overlap and range>interval,insert interval only
                result.push(interval);
            } else { // overlapped
                range[0] = Math.min(range[0], interval[0]);
                range[1] = Math.max(range[1], interval[1]);
            }
        }

        if (!isInsert) { // insert at the very end
            result.push(range);
        }

        this.intervals = result;

    }

    /**
     * Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {

        checkRange(range)

        let result = [], isInsert = false;

        for (let interval of this.intervals) {
            if (isInsert) {
                result.push(interval);
            } else if (range[0] > interval[1]) { // no overlap and range>interval,insert the interval
                result.push(interval);
            } else if (range[1] < interval[0]) { // no overlap and range<interval,insert the interval
                result.push(interval);
                isInsert = true;
            } else if (range[1] < interval[1]) { //interval iPrints out the list of ranges in the range collectionn range,continue and not insert
                if (range[0] > interval[0]) {
                    result.push([interval[0], range[0]]);
                }
                result.push([range[1], interval[1]]);
                isInsert = true;
            } else if (range[0] > interval[0]) {
                result.push([interval[0], range[0]]);
            }
        }

        this.intervals = result;

    }

    /**
     * Override object toString method
     */
    toString() {
        let message = '';
        for (let interval of this.intervals) {
            message += `[${interval[0]}, ${interval[1]}) `;
        }
        message = message.substr(0, message.length - 1);
        return message;
    }

    /**
     * Prints out the list of ranges in the range collection
     */
    print() {
        let message = this.toString();
        console.log(message);
        return message;
    }
}


module.exports = RangeCollection
