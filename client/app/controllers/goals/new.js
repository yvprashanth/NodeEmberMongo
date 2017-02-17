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
  isValid : function(){
    return true;
  }.property('model'),
  showBlockedReason : function(){
    if(this.get('model.status'))
      return this.get('model.status').key === 3;
    return false;
  }.property('model.status'),
  actions : {
    foo(state) {
        debugger;
        this.set('model.status', state);
    }
  }
});