import produce from 'immer';

import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';
import { isEmpty } from '../util/types';
import { flatten } from '../util/object';
import { actionStatuses } from '../actions/fetch';

// type check for key variables, run before and after reducer
const typeCheck = (draft) => {
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
  if (!isArray(draft.selected))
    draft.selected = [];
  if (!isObject(draft.groups))
    draft.groups = {};
  if (!isArray(draft.groups.diamond))
    draft.groups.diamond = [];
  if (!isArray(draft.groups.spade))
    draft.groups.spade = [];
  if (!isString(draft.activities) && !isArray(draft.activities))
    draft.activities = actionStatuses.EMPTY;
  if (!isString(draft.volcano) && !isArray(draft.volcano))
    draft.volcano = actionStatuses.EMPTY;
};

// defines how state (redux store) changes in response to dispatched actions
const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_SAMPLE_LIST': {
      draft.list = payload;
      if (isArray(draft.list))
        draft.list = draft.list.map((sample) => flatten(sample, 1));
      break;
    }

    case 'SELECT_SAMPLES': {
      const { ids } = payload;
      draft.selected = ids.map((id) => ({ id }));
      // ungroup samples not in selected experiment
      for (const index of ['diamond', 'spade']) {
        for (const id of draft.groups[index] || []) {
          if (!draft.selected.find((sample) => sample.id === id))
            draft.groups = filterGrouped(draft.groups, id);
        }
      }
      break;
    }

    case 'UNGROUP_SAMPLE': {
      const { id } = payload;
      draft.groups = filterGrouped(draft.groups, id);
      break;
    }

    case 'GROUP_SAMPLE': {
      const { index, id, ids } = payload;
      const group = (index, id) => {
        draft.groups = filterGrouped(draft.groups, id);
        if (!isArray(draft.groups[index]))
          draft.groups[index] = [];
        draft.groups[index].push(id);
      };
      if (id)
        group(index, id);
      else if (ids) {
        for (const id of ids)
          group(index, id);
      }
      break;
    }

    case 'GROUP_SAMPLES_FROM_URL': {
      const { index, ids } = payload;
      if (!index)
        break;
      if (!isArray(ids) || !ids.length)
        draft.groups[index] = [];
      else
        draft.groups[index] = ids;
      break;
    }

    case 'UNGROUP_ALL_SAMPLES': {
      draft.groups = {};
      break;
    }

    case 'GET_SAMPLE_ACTIVITIES': {
      draft.activities = payload;
      break;
    }

    case 'SET_VOLCANO': {
      if (isEmpty(payload))
        draft.volcano = actionStatuses.EMPTY;
      else
        draft.volcano = payload;
      break;
    }

    default: {
      break;
    }
  }

  // fill in details of selected from full list
  if (isArray(draft.list)) {
    const sampleMap = {};
    for (const sample of draft.list) sampleMap[sample.id] = sample;
    for (const [key, selected] of Object.entries(draft.selected)) {
      const found = sampleMap[selected.id]
      if (found && !sampleIsLoaded(selected))
      draft.selected[key] = found;
    }
  }

  typeCheck(draft);
}, {});

export default reducer;

export const getGroupIndex = (groups, id) => {
  for (const [key, value] of Object.entries(groups)) {
    if (isArray(value) && value.includes(id))
      return key;
  }
};

export const filterGrouped = (groups, id) => {
  for (const [key, value] of Object.entries(groups)) {
    if (isArray(value))
      groups[key] = value.filter((sample) => sample !== id);
    else
      groups[key] = [];
  }
  return groups;
};

export const sampleIsLoaded = (sample) => (sample?.name ? true : false);
