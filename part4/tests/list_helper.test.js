const listHelper = require("../utils/list_helper")

test("dummy returns 1", () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
})
