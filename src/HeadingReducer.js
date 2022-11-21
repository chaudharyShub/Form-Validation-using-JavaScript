export const initialHeadingState = {
    heading: {
        title: '',
        isError: false,
    },
    displayedHeading: '',
}

export const headingReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_HEADING':
            return {
                ...state,
                heading: {
                    ...state.heading,
                    title: action.payload,    // action.payload is e.target.value
                    isError: action.payload.length > 4 ? false : true
                }
            }
        case 'HEADING_ERROR':
            return {
                ...state,
                heading: {
                    ...state.heading,
                    isError: true
                }
            }
        case 'DISPLAY_HEADING':
            return {
                ...state,
                displayedHeading: action.payload
            }
        default:
            return state;
    }
}

