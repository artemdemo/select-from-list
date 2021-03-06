(() => {
    const LIST = 'list';
    const LIST_OPEN = 'list_open';

    const LIST_ITEM = 'list__item';
    const LIST_ITEM_EMPTY = 'list__item_empty';

    const DEFAULT_SEARCH_LENGTH = 10;

    class SearchInput extends HTMLElement {
        /**
         * Escape regex symbols in string
         * @link https://www.npmjs.com/package/escape-string-regexp
         * @param text
         * @return {string}
         */
        static escapeRegex(text) {
            const escapeRegex = /[|\\{}()[\]^$+*?.]/g;
            return text.replace(escapeRegex, '\\$&');
        }

        constructor() {
            super();
            this.listEl = null;
            this.listItemsEl = [];
            this.searchList = [];
            this.filteredList = [];
            this.onSelectCallback = null;
        }

        /**
         * Set list of items
         * @public
         * @param {Array} newList 
         */
        setList(newList) {
            if (Array.isArray(newList)) {
                this.searchList = [...newList];
                this.initiateList();
            }
        }

        /**
         * Select item callback
         * @return {Number}
         */
        onSelect(callback) {
            this.onSelectCallback = callback;
        }

        onItemClick(e) {
            for (let i = 0, len = this.listItemsEl.length; i < len; i++) {
                if (e.target === this.listItemsEl[i]) {
                    this.onSelectCallback && this.onSelectCallback(this.filteredList[i]);
                }
            }
        }

        onKeyUp(e) {
            this.filterSearchList(e.target.value);
        }

        onFocusOut() {
            this.updateSearchList();
        }

        onFocus(e) {
            this.filterSearchList(e.target.value);
        }

        filterSearchList(value) {
            this.filteredList = [];
            if (value === '') {
                this.updateSearchList();
                return;
            }
            const searchRegex = new RegExp(SearchInput.escapeRegex(value), 'i');
            for (const item of this.searchList) {
                if (searchRegex.test(item.text)) {
                    this.filteredList.push(item);
                }
                if (this.filteredList.length === DEFAULT_SEARCH_LENGTH) {
                    break;
                }
            }
            this.updateSearchList(this.filteredList);
        }

        initiateList(length = DEFAULT_SEARCH_LENGTH) {
            this.listEl.innerHTML = '';
            const fragment = document.createDocumentFragment();
            Array.from(new Array(length)).forEach(() => {
                const itemEl = document.createElement('div');
                itemEl.classList.add(LIST_ITEM);
                itemEl.classList.add(LIST_ITEM_EMPTY);
                this.listItemsEl.push(itemEl);
                fragment.appendChild(itemEl);
            });
            this.listEl.appendChild(fragment);
        }

        updateSearchList(list = []) {
            this.listItemsEl.forEach((itemEl, index) => {
                if (list[index]) {
                    itemEl.classList.remove(LIST_ITEM_EMPTY);
                    itemEl.textContent = list[index].text;
                } else {
                    itemEl.classList.add(LIST_ITEM_EMPTY);
                    itemEl.textContent = '';
                }
            });
            if (list.length > 0) {
                this.listEl.classList.add(LIST_OPEN);
            } else {
                this.listEl.classList.remove(LIST_OPEN);
            }
        }

        connectedCallback() {
            const wrapEl = document.createElement('div');
            wrapEl.classList.add('input-wrap');
            
            const inputEl = document.createElement('input');
            inputEl.classList.add('form-control');
            inputEl.addEventListener('keyup', this.onKeyUp.bind(this));
            inputEl.addEventListener('focusout', this.onFocusOut.bind(this));
            inputEl.addEventListener('focus', this.onFocus.bind(this));
            wrapEl.appendChild(inputEl);

            this.listEl = document.createElement('div');
            this.listEl.addEventListener('click', this.onItemClick.bind(this));
            this.listEl.classList.add(LIST);
            wrapEl.appendChild(this.listEl);

            this.appendChild(wrapEl);
        }
    }

    window.customElements.define('search-input', SearchInput);
})();
