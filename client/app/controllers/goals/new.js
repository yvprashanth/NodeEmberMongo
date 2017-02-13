import Ember from 'ember';

export default Ember.Controller.extend({
  statusStates : [
    { key: 1, value : 'Not Started' },
    { key: 2, value : 'In Progress' },
    { key: 3, value : 'Blocked' },
    { key: 4, value : 'Complete' }
  ],
  names: ['Not Started', 'In Progress', 'Blocked', 'Complete'],
  statusState : '',
  actions : {
    foo(state) {
        this.set('statusState', state);
    }
  }
});