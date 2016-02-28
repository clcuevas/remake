import DS from 'ember-data';

export default DS.Model.extend({
  authorID: DS.attr('string'),
  itemType: DS.attr('string'),
  itemName: DS.attr('string'),
  imageURL: DS.attr('string'),
  caption: DS.attr('string'),
  exp: DS.attr('date'),
  qty: DS.attr('number'),
  qtyType: DS.attr('string'),
  cost: DS.attr('number'),
  storageType: DS.attr('string')
});
