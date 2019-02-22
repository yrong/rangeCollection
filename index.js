'use strict'

/** Class representing a range object. */
class Range {

  /**
     * Create a range
     * @param {number} start - The start value.
     * @param {number} end - The end value.
     */

  constructor (start, end) {
    this.start = start
    this.end = end
  }

}

/**
 * No overlapping sorted range collection with provides add/remove/print operation
 */
class RangeCollection {

  constructor () {
    /**
     * no overlapped and sorted ranges
     * @type {Array<Range>}
     */
    this.intervals = []
  }

  /**
     * Validate range input return as object
     * @param {Array<number>} range - Array of two integers that specify start and end of range.
     * @returns {Range}
     */
  check (range) {
    if (!Array.isArray(range)) {
      throw new Error('range is not an array')
    }
    if (range.length !== 2) {
      throw new Error('range array length must be 2')
    }
    if (!Number.isInteger(range[0]) || !Number.isInteger(range[1])) {
      throw new Error('value in range array can only be number')
    }
    if (range[0] > range[1]) {
      throw new Error('start value of range should no more than end value of range')
    }
    return new Range(range[0], range[1])
  }

  /**
     * Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify start and end of range.
     */
  add (range) {
    let rangeObj = this.check(range); let result = []; let inserted = false

    for (let interval of this.intervals) {
      // no overlap and interval.start>rangeObj.end, insert rangeObj first and set inserted flag
      if (interval.start > rangeObj.end && !inserted) {
        result.push(rangeObj)
        inserted = true
      }
      if (interval.start > rangeObj.end || interval.end < rangeObj.start) { // no overlap and insert interval
        result.push(interval)
      } else { // overlapped
        rangeObj.start = Math.min(rangeObj.start, interval.start)
        rangeObj.end = Math.max(rangeObj.end, interval.end)
      }
    }

    if (!inserted) { // insert at the very end
      result.push(rangeObj)
    }

    this.intervals = result
  }

  /**
     * Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
  remove (range) {
    let rangeObj = this.check(range); let result = []

    for (let interval of this.intervals) {
      if (interval.start > rangeObj.end || interval.end < rangeObj.start) { // no overlap and insert interval
        result.push(interval)
      } else { // overlapped
        if (interval.start < rangeObj.start) { // add range from interval.start to rangeObj.start
          result.push({ start: interval.start, end: rangeObj.start })
        }
        if (interval.end > rangeObj.end) { // add range from rangeObj.end to interval.end
          result.push({ start: rangeObj.end, end: interval.end })
        }
      }
    }

    this.intervals = result
  }

  /** Override toString method
     * @override
     */
  toString () {
    let message = ''
    for (let interval of this.intervals) {
      message += `[${interval.start}, ${interval.end}) `
    }
    message = message.substr(0, message.length - 1)
    return message
  }

  /**
     * Prints out the list of ranges in the range collection
     */
  print () {
    let message = this.toString()
    console.log(message)
    return message
  }
}

module.exports = RangeCollection
