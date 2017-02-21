import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    // Ember.$('#people').peoplePicker({});
  },
  
  model() {
    this.controllerFor('goals.new').set('names', []);
    return this.store.createRecord('goal');
  },

  isValid : function(){
    debugger;
  },

  actions: {
    saveGoal(newGoal) {
      debugger;
      var that = this;
      newGoal.set('sims', this.controllerFor('goals.new').get('names'));
      newGoal.save().then(() => {
        this.transitionTo('goals.all');
      });
      // newGoal.save().then(() => this.transitionTo('goals'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});
