/**
 * Created by kelvinsun on 2016/5/4.
 */
'use strict';

define([], () => (state = { list: [], count: 0, }, action) => {
    switch (action.type) {
        case 'RESOURCE_LIST_SET':
            const { list, count } = action;
            return { list, count, };
        default:
            return state;
    }
});