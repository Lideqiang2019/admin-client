import {combineReducers} from 'redux'
import {SET_HEAD_TITLE} from './action-types'

const initialHeadTitle = '首页'

export function headTitle(state = initialHeadTitle, action){
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state;
    }
};

export default combineReducers(
    {
        headTitle
    }
)