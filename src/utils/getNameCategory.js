export const getNameCategory = (categories, categoryId) => {
    const category = categories.find(category => category.id === categoryId)

    return category?.name
}