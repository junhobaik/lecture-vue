<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>

    <div class="container">
      <search-form v-bind:value="query" v-on:@submit="onSubmit" v-on:@reset="onReset">
      </search-form>

      <div class="content">
        <div v-if="submitted">
          <search-result v-bind:data="searchResult" v-bind:query="query"></search-result>
        </div>
        <div v-else>
          <tabs v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@change="onClickTab">
          </tabs>

          <div v-if="selectedTab === tabs[0]">
            <list v-bind:data="keywords" v-on:@click="onClickKeyword" type="keywords">
            </list>
          </div>
          <div v-else>
            <list v-bind:data="history" v-on:@click="onClickKeyword" v-on:@remove="onClickRemoveHistory" type="history">
            </list>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import FormComponent from '../src/components/FormComponent.vue';
  import ListComponent from '../src/components/ListComponent.vue';
  import TabComponent from '../src/components/TabComponent.vue';
  import ResultComponent from '../src/components/ResultComponent.vue';

  import HistoryModel from '../src/models/HistoryModel.js';
  import KeywordModel from '../src/models/KeywordModel.js';
  import SearchModel from '../src/models/SearchModel.js';

  export default {
    name: 'app',
    data() {
      return {
        query: '',
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '',
        keywords: [],
        history: [],
        searchResult: []
      }
    },
    components: {
      'search-form': FormComponent,
      'list': ListComponent,
      'search-result': ResultComponent,
      'tabs': TabComponent
    },
    created() {
      this.selectedTab = this.tabs[0]
      this.fetchKeyword()
      this.fetchHistory()
    },
    methods: {
      onSubmit(inputValue) {
        this.query = inputValue;
        this.search()
      },
      onReset(e) {
        this.resetForm()
      },
      onClickTab(tab) {
        this.selectedTab = tab
      },
      onClickKeyword(keyword) {
        this.query = keyword;
        this.search()
      },
      onClickRemoveHistory(keyword) {
        HistoryModel.remove(keyword)
        this.fetchHistory()
      },
      fetchKeyword() {
        KeywordModel.list().then(data => {
          this.keywords = data
        })
      },
      fetchHistory() {
        HistoryModel.list().then(data => {
          this.history = data
        })
      },
      search() {
        SearchModel.list().then(data => {
          this.submitted = true
          this.searchResult = data
        })
        HistoryModel.add(this.query)
        this.fetchHistory()
      },
      resetForm() {
        this.query = ''
        this.submitted = false
        this.searchResult = []
      }
    }
  }

</script>
