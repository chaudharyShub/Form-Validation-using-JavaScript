export const initialUpdateState = {
    update: false,
    index: ''
}

export const updateReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state,
                update: true,
                index: action.payload
            }
        default:
            return state;
    }
}