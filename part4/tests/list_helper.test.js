const listHelper = require("../utils/list_helper")
const dummydata = require("./dummy_data")

test("dummy returns 1", () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
})

describe("total likes", () => {

    test("of empty list is 0", () => {
        const res = listHelper.totalLikes([])
        expect(res).toBe(0)
    })

    test("of list with one element is equal to the likes of that element", () => {
        const res = listHelper.totalLikes([dummydata[0]])
        expect(res).toBe(dummydata[0].likes)
    })

    test("of a list with multiple elements is the sum of their likes", () => {
        const res = listHelper.totalLikes(dummydata)
        expect(res).toBe(36)
    })

})
