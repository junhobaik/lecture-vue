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
    tabList: [],
  },

  created(){
    this.selectedTab = this.tabs[0];
    KeywordModel.list().then(data => {
      this.tabList = data;
    });
  },

  methods: {
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
    onClick(e){
      this.selectedTab = e.target.innerText;

      if(this.selectedTab === this.tabs[0]){
        KeywordModel.list().then(data => {
          this.tabList = data;
        })
      }else{
        HistoryModel.list().then(data => {
          this.tabList = data;
        })
      }
      
    }
  }
})
