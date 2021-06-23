import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';

// Instant Search Widgets
import { hits, searchBox, configure, index } from 'instantsearch.js/es/widgets';

// Autocomplete Template
import autocompleteProductTemplate from '../templates/autocomplete-product';

// Query Suggestion Template
import querySuggestionTemplate from '../templates/querySuggestions';

/**
 * @class Autocomplete
 * @description Instant Search class to display content in the page's autocomplete
 */
class Autocomplete {
  /**
   * @constructor
   */
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   *
  */
  _registerClient() {
    this._searchClient = algoliasearch(
      'TMTMOSOUOG',
      '6436a9e0a3ab058db9e9723ce53e5533'
    );

    this._searchInstance = instantsearch({
      indexName: 'dev_ecommerce',
      searchClient: this._searchClient,
    });
  }


  /*
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      configure({
        hitsPerPage: 3,
      }),
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#autocomplete-hits',
        templates: { item: autocompleteProductTemplate },
      }),
      index({ indexName: 'dev_ecommerce_query_suggestions' })
        .addWidgets([
          configure({
            hitsPerPage: 2,
          }),
          hits({
            container: '#suggestions-hits',
            templates: {
              item: querySuggestionTemplate,
              empty: '<div>No suggestions</div>'
            }
          })
        ])
    ]);
  }


  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default Autocomplete;
