var cdb = require('cartodb.js');
var Backbone = require('backbone');
var RowModel = require('./row_model');
var RowsView = require('./rows_view');

/**
 * Model for the IP addresses georeference option.
 */
module.exports = cdb.core.Model.extend({

  TAB_LABEL: 'IP Addresses',
  TITLE: "Select the column that that contains the IP's name",
  DESC: 'Convert IP address into geographical locations.',

  initialize: function(attrs) {
    if (!attrs.geocodeStuff) throw new Error('geocodeStuff is required');
    if (!attrs.columnsNames) throw new Error('columnsNames is required');
  },

  createView: function() {
    this._initRows();
    this.set({
      canContinue: false,
      hideFooter: false,
    });

    return new RowsView({
      model: this
    });
  },

  assertIfCanContinue: function() {
    this.set('canContinue', !!this._columnNameValue());
  },

  continue: function() {
    var d = this.get('geocodeStuff').geocodingChosenData({
      type: 'ip',
      kind: 'ipaddress',
      column_name: this._columnNameValue(),
      geometry_type: 'point'
    });

    this.set('geocodeData', d);
  },

  _initRows: function() {
    var rows = new Backbone.Collection([
      new RowModel({
        comboViewClass: 'Combo',
        label: 'In which column are your IP addresses stored?',
        placeholder: 'Select column',
        data: this.get('columnsNames')
      })
    ]);
    this.set('rows', rows);
  },

  _columnNameValue: function() {
    return this.get('rows').first().get('value');
  },

});