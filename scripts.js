((window, document) => {
    document.addEventListener('DOMContentLoaded', () => {
        const searchInputEl = document.querySelector('search-input');
        
        searchInputEl.setList(window.listData.map(item => ({
            id: item._id,
            text: `${item.name} - ${item.data}`,
        })));
        searchInputEl.onSelect(i => console.log(i));
    });
})(window, document);