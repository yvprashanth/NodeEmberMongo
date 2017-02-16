import Ember from 'ember';
 const statusStates = [
    { key: 1, value : 'Not Started'},
    { key: 2, value : 'In Progress' },
    { key: 3, value : 'Blocked' },
    { key: 4, value : 'Complete' }
  ];

export default Ember.Controller.extend({
  statusStates : statusStates,
  statusState : statusStates[0],
  showBlockedReason : function(){
     return this.get('statusState').key === 3 
  }.property('statusState'),
  actions : {
    foo(state) {
        debugger;
        this.set('statusState', state);
    }
  }
});