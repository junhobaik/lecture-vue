import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/keywordView.js';

import SearchModel from '../models/SearchModel.js';
import keywordModel from '../models/KeywordModel.js';
import keywordView from '../views/keywordView.js';

const tag = '[MainController]';

export default {
    init(){
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            //on을 사용하려면 FormView.setup에서 this가 return되는지 확인해야한다.
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm());

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tab));


        keywordView.setup(document.querySelector('#search-keyword'));

        ResultView.setup(document.querySelector('#search-result'));

        this.selectedTab = '추천 검색어';
        
        this.renderView();
    },

    renderView(){
        console.log(tag, 'renderView()');
        TabView.setActiveTab(this.selectedTab);

        if(this.selectedTab === '추천 검색어'){
            this.fetchSearchKeyword();
        }else{

        }

        ResultView.hide();
    },

    fetchSearchKeyword(){
        keywordModel.list().then(data => {
            KeywordView.render(data);
        })
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
        console.log(tag, 'onSearchResult()');
        ResultView.render(data);
    },

    onChangeTab(tabName){
        console.log('tag', 'onChangeTab()')
    }
}
