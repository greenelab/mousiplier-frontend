import { createAction } from './';
import { createFetchAction } from './fetch';

import { urlSignatureDetails } from '../backend/signatures';
import { urlSignatureList } from '../backend/signatures';

// actions related to the "signature" sub-object of the state

// get full details of viewed signature (on signature details page)
export const getSignatureDetails = createFetchAction(
  'GET_SIGNATURE_DETAILS',
  urlSignatureDetails
);

// get full list of all signatures
export const getSignatureList = createFetchAction(
  'GET_SIGNATURE_LIST',
  urlSignatureList
);

// search for signature based on query
export const getSignatureSearch = createAction('GET_SIGNATURE_SEARCH');

// select signature based on id
export const selectSignature = createAction('SELECT_SIGNATURE');

// fill in remaining details of selected signature
export const getSignatureSelectedDetails = createAction(
  'GET_SIGNATURE_SELECTED_DETAILS'
);
