import Ember from 'ember';

export default Ember.Route.extend({
 statusStates : [
    Ember.Object.create({ key: 1, value : 'Not Started' }),
    Ember.Object.create({ key: 2, value : 'In Progress' }),
    Ember.Object.create({ key: 3, value : 'Blocked' }),
    Ember.Object.create({ key: 4, value : 'Complete' })
  ],
  names: ['Stefan', 'Miguel', 'Tomster', 'Pluto'],
  model() {
    return this.store.findAll('goal');
  },
  actions : {
    foo() {
      debugger;
    },
    deleteGoal(goal) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        debugger;
        var that = this;
        this.store.find('goal', goal.id).then(function (post) {
          post.deleteRecord();
          post.get('isDeleted'); // => true
          post.save(); // => DELETE to /posts/1
          that.goal.destroyRecord();
        });
        
      }
    }
  }
});
