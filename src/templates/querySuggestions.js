const querySuggestion = hit => `<div class="autocomplete-product">
      <h1 class="autocomplete-product__name">${hit._highlightResult.query.value}</h1>
      </div>`;
export default querySuggestion;