import Ember from 'ember';

const {
  inject,
  Route
} = Ember;

export default Route.extend({
  store: inject.service('store'),

  model(params) {
    return this.get('store').findAll('items');
  }
});