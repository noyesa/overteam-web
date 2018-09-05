import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr(),
  competitive: DS.attr(),
  portrait: DS.attr()
});
