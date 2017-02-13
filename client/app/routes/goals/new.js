import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('goal');
  },

  actions: {

    saveGoal(newGoal) {
      newGoal.save().then((response) => {
        debugger;
        this.transitionTo('goals')
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