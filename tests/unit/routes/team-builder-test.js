import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | team-builder', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:team-builder');
    assert.ok(route);
  });
});
