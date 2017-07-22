((window, document) => {
    document.addEventListener('DOMContentLoaded', () => {
        const searchInputEl = document.querySelector('search-input');
        
        searchInputEl.setList(window.listData);
    });
})(window, document);