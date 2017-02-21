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
  names: ['foo', 'bar', 'baz'],
  isValid : function(){
    return true;
  }.property('model'),
  showBlockedReason : function(){
    if(this.get('model.status')){
      return this.get('model.status').key === 3;
    }
    return false;
  }.property('model.status'),
  actions : {
    foo(state) {
        debugger;
        this.set('model.status', state);
    },

    addSim(newGoal){
      debugger;
      var newSim = this.store.createRecord('sim', {
        link : 'https://guides.emberjs.com/v2.2.0/tutorial/ember-cli/',
        team : 'SCPlat',
        goal : newGoal
      });
      // var arrayOfSims = this.get('model').get('sims');
      // arrayOfSims.push(newSim);
      this.get('model').set('sims', newSim);
    },
  }
});