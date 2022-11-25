export const initialEditState = {
    editArray: []
}

export const editReducer = (state, action) => {
    switch (action.type) {
        case 'EDIT_ARRAY':
            return {
                ...state,
                editArray: [...action.payload]
            }
    }
}