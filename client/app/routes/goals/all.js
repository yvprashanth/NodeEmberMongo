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
    }
  }
});
