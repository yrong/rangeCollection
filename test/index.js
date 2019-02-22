'use strict'

/* global describe, it */

const expect = require('chai').expect

const rangeCollection = require('../')

describe('range-collection', function () {
    it('positive cases', function () {
        const rc = new rangeCollection()

        rc.add([1, 5])
        expect(rc.toString()).equal('[1, 5)')

        rc.add([10, 20])
        expect(rc.toString()).equal('[1, 5) [10, 20)')

        rc.add([20, 20])
        expect(rc.toString()).equal('[1, 5) [10, 20)')

        rc.add([20, 21])
        expect(rc.toString()).equal('[1, 5) [10, 21)')

        rc.add([2, 4])
        expect(rc.toString()).equal('[1, 5) [10, 21)')

        rc.add([3, 8])
        expect(rc.toString()).equal('[1, 8) [10, 21)')

        rc.remove([10, 10])
        expect(rc.toString()).equal('[1, 8) [10, 21)')

        rc.remove([10, 11])
        expect(rc.toString()).equal('[1, 8) [11, 21)')

        rc.remove([15, 17])
        expect(rc.toString()).equal('[1, 8) [11, 15) [17, 21)')

        rc.remove([3, 19])
        expect(rc.toString()).equal('[1, 3) [19, 21)')
    })

    it('borderline cases', function () {
        const rc = new rangeCollection()

        expect(rc.toString()).equal('')
        expect(rc.print()).equal('')

        rc.add([1, 5])
        expect(rc.toString()).equal('[1, 5)')
        rc.add([1, 5])
        expect(rc.toString()).equal('[1, 5)')

        rc.remove([1, 5])
        expect(rc.toString()).equal('')
        rc.remove([1, 5])
        expect(rc.toString()).equal('')

    })

    it('exceptional cases', function () {
        const rc = new rangeCollection()

        expect(function () {
            rc.remove({a: 1})
        }).to.throw('range is not an array')

        expect(function () {
            rc.remove([1, 2, 3])
        }).to.throw('range array length must be 2')

        expect(function () {
            rc.remove([{a: 1},{b:2}])
        }).to.throw('value in range array can only be number')

        expect(function () {
            rc.add([5, 1])
        }).to.throw('start value of range should no more than end value of range')
    })
})
