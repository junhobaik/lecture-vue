import SearchModel from './models/SearchModel.js';
import KeywordModel from './models/KeywordModel.js';
import HistoryModel from './models/HistoryModel.js';

new Vue({
  el: '#app',
  data: {
    query: '',
    submitted: false,
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    searchResult: [],
    keywords: []
  },

  created(){
    this.selectedTab = this.tabs[0];
    this.fetchKeyword();
  },

  methods: {
    fetchKeyword(){
      KeywordModel.list().then(data => {
        this.keywords = data;
      });
    },
    onSubmit(e){
      this.search();
    },
    onKeyup(){
      if(!this.query.length){
        this.onReset();
      }
    },
    search(){
      SearchModel.list().then(data => {
        this.submitted = true;
        this.searchResult = data;
      })
    },
    onReset(){
      this.query = '';
      this.submitted = false;
      this.searchResult = [];
    },
    onClickTab(tab){
      this.selectedTab = tab;
    },
    onClickKeyword(keyword){
      this.query = keyword;
      this.search();
    }
  }
})
