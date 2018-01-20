import FormView from '../views/FormView.js';

const tag = '[MainController]';

export default {
    init(){
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            //on을 사용하려면 FormView.setup에서 this가 return되는지 확인해야한다.
            .on('@submit', e => this.onSubmit(e.detail.input))
    },

    onSubmit(input){
        console.log(tag, 'onSubmit()', input);
    }
}
