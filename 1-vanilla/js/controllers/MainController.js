import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/keywordView.js';
import HistoryView from '../views/HistoryView.js';

import SearchModel from '../models/SearchModel.js';
import KeywordModel from '../models/KeywordModel.js';
import HistoryModel from '../models/HistoryModel.js';

const tag = '[MainController]';

export default {
    init(){
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            //on을 사용하려면 FormView.setup에서 this가 return되는지 확인해야한다.
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm());

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName));


        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword));

        HistoryView.setup(document.querySelector('#search-history'))
            .on('@click', e => this.onClickHistory(e.detail.keyword))
            .on('@remove', e => this.onRemoveHistory(e.detail.keyword))

        ResultView.setup(document.querySelector('#search-result'));

        this.selectedTab = '최근 검색어';
        
        this.renderView();
    },

    renderView(){
        console.log(tag, 'renderView()');
        TabView.setActiveTab(this.selectedTab);

        if(this.selectedTab === '추천 검색어'){
            this.fetchSearchKeyword();
            HistoryView.hide();
        }else{
            this.fetchSearchHistory();
            KeywordView.hide()
        }

        ResultView.hide();
    },

    fetchSearchKeyword(){
        KeywordModel.list().then(data => {
            KeywordView.render(data)
        });
    },

    fetchSearchHistory(){
        HistoryModel.list().then(data => {
            HistoryView.render(data).bindRemoveBtn();
            //render함수가 호출되고나면 DOM이 생성되고 그 후에 이벤트를 바인딩할 수 있으므로 이와같이 체이닝을 이용한다.
            //체이닝을 하려면 render함수가 this를 return 해야한다.
        });
    },

    search(query){
        console.log(tag, 'search()', query);
        FormView.setValue(query);
        SearchModel.list(query)
            .then(data => {
                this.onSearchResult(data);
            })
    },

    onSubmit(input){
        console.log(tag, 'onSubmit()', input);
        this.search(input);
    },

    onResetForm(){
        console.log(tag, 'onReset()');
        ResultView.hide();
        this.renderView();
    },

    onSearchResult(data){
        console.log(tag, 'onSearchResult()');
        TabView.hide();
        KeywordView.hide();
        ResultView.render(data);
    },

    onChangeTab(tabName){
        console.log('tag', 'onChangeTab()')
        this.selectedTab = tabName;
        this.renderView();
    },

    onClickKeyword(keyword){
        console.log('tag', 'onClickKeyword()');
        this.search(keyword);
    },

    onClickHistory(keyword){
        console.log('tag', 'onClickHistory()');
        this.search(keyword);
    },

    onRemoveHistory(keyword){
        console.log('tag', 'this.onRemoveHistory()');
        HistoryModel.remove(keyword);
        this.renderView();
    }
}
