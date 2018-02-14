new Vue({
  el: '#app',
  data: {
    query: ''
  },
  methods: {
    onSubmit(e){
      debugger;
    },
    onKeyup(){
      if(!this.query.length){
        this.onReset();
      }
    },
    onReset(){
      this.query = '';
      // TODO: 검색결과 숨기기
      debugger;
    }
  }
})
