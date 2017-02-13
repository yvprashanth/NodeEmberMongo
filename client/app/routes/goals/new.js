import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('goal');
  },

  isValid : function(){
    debugger;
  },

  actions: {
    saveGoal(newGoal) {
      debugger;
      newGoal.save().then(() => this.transitionTo('goals'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});