import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
    return this.store.findRecord('goal', params.goal_id);
  },

  actions: {

    saveLibrary(newGoal) {
      newGoal.save().then(() => this.transitionTo('goals.all'));
    },

    willTransition(transition) {

      let model = this.controller.get('model');

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
