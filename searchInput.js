(() => {
    const LIST = 'list';
    const LIST_OPEN = 'list_open';

    const LIST_ITEM = 'list__item';
    const LIST_ITEM_EMPTY = 'list__item_empty';

    class SearchInput extends HTMLElement {
        constructor() {
            super();
            this.listEl = null;
            this.listItemsEl = [];
            this.searchList = [];
        }

        /**
         * Set list of items
         * @public
         * @param {Array} newList 
         */
        setList(newList) {
            console.log(newList);
            if (Array.isArray(newList)) {
                this.searchList = [...newList];
                this.initiateList();
            }
        }

        onKeyUp(e) {
            console.log(e);
        }

        initiateList(length = 10) {
            this.listEl.innerHTML = '';
            const fragment = document.createDocumentFragment();
            Array.from(new Array(length)).forEach(() => {
                const itemEl = document.createElement('div');
                itemEl.classList.add(LIST_ITEM);
                itemEl.classList.add(LIST_ITEM_EMPTY);
                const itemTextEl = document.createTextNode('');
                itemEl.appendChild(itemTextEl);
                this.listItemsEl.push(itemEl);
                fragment.appendChild(itemEl);
            });
            this.listEl.appendChild(fragment);
        }

        updateSearchList(list = []) {
            this.listItemsEl.map((itemEl, index) => {
                if (list[index]) {
                    itemEl.classList.remove(LIST_ITEM_EMPTY);
                    itemEl.children[0].nodeValue = list[index]
                } else {
                    itemEl.classList.add(LIST_ITEM_EMPTY);
                }
            });
        }

        connectedCallback() {
            const wrapEl = document.createElement('div');
            wrapEl.classList.add('input-wrap');
            
            const inputEl = document.createElement('input');
            inputEl.classList.add('form-control');
            inputEl.addEventListener('keyup', this.onKeyUp);
            wrapEl.appendChild(inputEl);

            this.listEl = document.createElement('div');
            this.listEl.classList.add('list');
            wrapEl.appendChild(this.listEl);

            this.appendChild(wrapEl);
        }
    }

    window.customElements.define('search-input', SearchInput);
})()