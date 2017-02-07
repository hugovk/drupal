/**
 * @file
 * Javascript for the node content editing form.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Behaviors for setting summaries on content type form.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches summary behaviors on content type edit forms.
   */
  Drupal.behaviors.contentTypes = {
    attach: function (context) {
      // Provide the vertical tab summaries.
      var tabs = {
        '#edit-submission': getSummaryEditSubmission,
        '#edit-workflow': getSummaryEditWorkflow,
        '#edit-language': getSummaryEditLanguage,
        '#edit-display': getSummaryEditDisplay
      };
      $.each(tabs, function (id, getSummary) {
        $(id, context).drupalSetSummary(function (context) {
          return getSummary(context).join(', ');
        });
      });
    }
  };

  function getSummaryEditSubmission(context) {
    var vals = [];
    vals.push(Drupal.checkPlain($('#edit-title-label', context).val()) || Drupal.t('Requires a title'));
    return vals;
  }

  function getSummaryEditWorkflow(context) {
    var vals = [];
    $('input[name^="options"]:checked', context).next('label').each(function () {
      vals.push(Drupal.checkPlain($(this).text()));
    });
    if (!$('#edit-options-status', context).is(':checked')) {
      vals.unshift(Drupal.t('Not published'));
    }
    return vals;
  }

  function getSummaryEditLanguage(context) {
    var vals = [];
    vals.push($('.js-form-item-language-configuration-langcode select option:selected', context).text());
    $('input:checked', context).next('label').each(function () {
      vals.push(Drupal.checkPlain($(this).text()));
    });
    return vals;
  }

  function getSummaryEditDisplay(context) {
    var vals = [];
    $('input:checked', context).next('label').each(function () {
      vals.push(Drupal.checkPlain($(this).text()));
    });
    if (!$('#edit-display-submitted', context).is(':checked')) {
      vals.unshift(Drupal.t("Don't display post information"));
    }
    return vals;
  }

})(jQuery, Drupal);
