export const initialState = {
    inputTypeArray: [],
    outputItems: [],
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_INPUT_TYPE':
            return {
                ...state,
                inputTypeArray: [...state.inputTypeArray, action.payload],
            }
        case 'SUBMIT':
            return {
                ...state,
                outputItems: [...action.payload],
            }
        case 'UPDATE_INPUT':
            return {
                ...state,
                inputTypeArray: [...state.inputTypeArray, action.payload]
            }
        default:
            return state;
    }
}

