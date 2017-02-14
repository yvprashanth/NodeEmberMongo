import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('newgoal');
  this.route('goals', function() {
    this.route('new');
    this.route('index');
    this.route('all');
    this.route('edit', {path : '/:goal_id/edit'});
  });
});

export default Router;
