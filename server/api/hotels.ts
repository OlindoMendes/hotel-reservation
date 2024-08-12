import data from "../hotels.json"

export default defineEventHandler(async (event) => {
    // ... Do whatever you want here
    return {
        data: data,
        teste: "teste",
    }
})