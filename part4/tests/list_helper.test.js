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

describe("favorite blog", () => {
    test("of empty list is an empty object", () => {
        const res = listHelper.favoriteBlog([])
        expect(res).toEqual({})
    })

    test("of list with one element is that element", () => {
        const res = listHelper.favoriteBlog([dummydata[5]])
        expect(res).toEqual(dummydata[5])
    })

    test("of list with multiple elements is the one with most likes", () => {
        const res = listHelper.favoriteBlog(dummydata)
        expect(res).toEqual(dummydata[2])
    })
})
