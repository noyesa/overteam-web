import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import { mean } from 'lodash';

export default Controller.extend({
  battletagInput: '',

  averageSR: computed('profiles.@each.skillRating', function() {
    const skillRatings = this.get('profiles').mapBy('skillRating');
    return skillRatings.length ? Math.round(mean(skillRatings)) : 0;
  }),

  init() {
    this._super(...arguments);
    this.set('profiles', []);
  },

  actions: {
    addBattletag() {
      this._addBattletags(...this.get('battletagInput').split(','));
      this.set('battletagInput', '');
    }
  },

  _addBattletags(...battletags) {
    battletags.forEach(battletag => {
      const profile = EmberObject.create({ username: battletag });
      const sanitizedBattletag = battletag.replace(/#/g, '-');
      const profiles = this.get('profiles');
      profiles.pushObject(profile);
      this.get('store')
        .findRecord('profile', sanitizedBattletag)
        .then(loadedProfile => {
          profile.setProperties({
            username: loadedProfile.get('username'),
            portrait: loadedProfile.get('portrait'),
            skillRating: loadedProfile.get('competitive.rank')
          });
        })
        .catch(err => {
          profiles.removeObject(profile);
        });
    });
  }
});
