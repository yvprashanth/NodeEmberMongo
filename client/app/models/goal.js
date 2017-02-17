import DS from 'ember-data';

export default DS.Model.extend({
    number : DS.attr('number'),
	title: DS.attr('string'),
    owner : DS.attr('string'),
    duedate : DS.attr('date'),
    status : DS.attr('string'),
    blockedreason : DS.attr('string'),
    notes : DS.attr('string'),
    sims : DS.hasMany('sim'), 
    team : DS.attr('string')
});
