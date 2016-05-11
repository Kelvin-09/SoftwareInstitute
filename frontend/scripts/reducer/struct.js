/**
 * Created by kelvinsun on 2016/5/4.
 */
'use strict';

define(['immutable'], Immutable =>
    (state = {
        category: Immutable.Map(),
        outline : Immutable.Map(),
        all     : Immutable.Map(),
        original: Immutable.Map(),
    }, action) => {
    switch (action.type) {
        case 'STRUCT_INIT':
            const { category, outline, all } = action['data'];
            let result = {};
            !!category && (result['category'] = Immutable.fromJS(category));
            !!outline  && (result['outline']  = Immutable.fromJS(outline));
            !!all      && (result['all']      = Immutable.fromJS(all));
            !!all      && (result['original'] = Immutable.fromJS(all));
            return result;
        case 'STRUCT_RENAME': {
            const { outlineId, categoryId, name } =  action['data'];
            if (!outlineId || !categoryId) {
                return state;
            }
            const outlineIndex = state['all'].findKey(item => outlineId == item.get('id'));
            if (!!categoryId) {
                let categoryIndex = state['all'].getIn([outlineIndex, 'categories']).findKey(item => categoryId == item.get('id'));
                state['all'] = state['all'].updateIn([outlineIndex, 'categories', categoryIndex, 'name'], oldName => name);
                return Object.assign({}, state);
            } else {
                state['all'] = state['all'].update(outlineIndex, value => value.set('name', name));
                return Object.assign({}, state);
            }
        } case 'STRUCT_DELETE': {
            const { outlineId, categoryId } =  action['data'];
            if (!outlineId) {
                return state;
            }
            const outlineIndex = state['all'].findKey(item => outlineId == item.get('id'));
            if (!!categoryId) {
                let categoryIndex = state['all'].getIn([outlineIndex, 'categories']).findKey(item => categoryId == item.get('id'));
                state['all'] = state['all'].deleteIn([outlineIndex, 'categories', categoryIndex]);
                return Object.assign({}, state);
            } else {
                state['all'] = state['all'].delete(outlineIndex);
                return Object.assign({}, state);
            }
        } case 'STRUCT_MOVE': {
            const { originId, targetId, categoryId } = action['data'];
            if (!originId || !targetId || !categoryId) {
                return state;
            }
            const originIndex   = state['all'].findKey(item => originId == item.get('id')),
                  targetIndex   = state['all'].findKey(item => targetId == item.get('id')),
                  categoryIndex = state['all'].getIn([originIndex, 'categories']).findKey(item => categoryId == item.get('id')),
                  categoryItem  = state['all'].getIn([originIndex, 'categories', categoryIndex]);

            state['all'] = state['all'].updateIn([targetIndex, 'categories'], value => value.push(categoryItem));
            state['all'] = state['all'].deleteIn([targetIndex, 'categories', categoryIndex]);
            return Object.assign({}, state);
    } default:
            return state;
    }
});