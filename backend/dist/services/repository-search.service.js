class RepositorySearchService {
    search(index, query) {
        const keyword = query.toLowerCase();
        return index.files.filter((file) => {
            return (file.path.toLowerCase().includes(keyword) ||
                file.content.toLowerCase().includes(keyword));
        });
    }
}
export default new RepositorySearchService();
//# sourceMappingURL=repository-search.service.js.map