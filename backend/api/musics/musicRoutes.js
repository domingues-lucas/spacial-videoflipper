module.exports = (router, querys) =>  {
    router.get('/search-title/:title', querys.searchByTitle);
}