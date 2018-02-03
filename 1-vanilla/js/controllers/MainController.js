import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';

import SearchModel from '../models/SearchModel.js';

const tag = '[MainController]';

export default {
    init(){
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            //on을 사용하려면 FormView.setup에서 this가 return되는지 확인해야한다.
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm())

        ResultView.setup(document.querySelector('#search-result'))
            
    },

    search(query){
        console.log(tag, 'search()', query);
        SearchModel.list(query)
            .then(data => {
                this.onSearchResult(data);
            })
        this.onSearchResult([]);
    },

    onSubmit(input){
        console.log(tag, 'onSubmit()', input);
        this.search(input);
    },

    onResetForm(){
        console.log(tag, 'onReset()');
        ResultView.hide();
    },

    onSearchResult(data){
        ResultView.render(data);
    }
}
