import React from 'react';
import { connect } from 'react-redux';

import SearchComponent from '../../../components/search';
import Single from './single';
import { getExperimentSearch } from '../../../actions/experiments';
import { selectExperiment } from '../../../actions/experiments';
import { isArray } from '../../../util/types';
import { isSelected } from '../../../reducers/experiments';
import { toCamelCase } from '../../../util/string';
import { mapExperiment } from '../';

import './index.css';

// experiment search section

let Search = ({ results, select, search }) => (
  <SearchComponent
    length={results?.length || null}
    placeholder='search for a experiment'
    onSearch={(value) => {
      const string = value.trim();
      search({
        index: 0,
        query: string,
        cancelType: 'GET_EXPERIMENT_SEARCH'
      });
    }}
    onKeySelect={(highlightedIndex) =>
      select({ accession: results[highlightedIndex].accession })
    }
    SingleComponent={<Single />}
  />
);

const mapStateToProps = (state) => ({
  results:
    state.experiment.searches.length === 1 &&
    isArray(state.experiment.searches[0].results) &&
    state.experiment.searches[0].results.length ?
      state.experiment.searches[0].results.map((result) =>
        mapExperimentResult(result, state)
      ) :
      null
});

const mapDispatchToProps = (dispatch) => ({
  search: (...args) => dispatch(getExperimentSearch(...args)),
  select: (...args) => dispatch(selectExperiment(...args))
});

export const mapExperimentResult = (result, state) => {
  const experiment = mapExperiment(result);
  experiment.selected = isSelected(result, state);
  experiment.highlightedField = toCamelCase(result.max_similarity_field || '');
  return experiment;
};

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;