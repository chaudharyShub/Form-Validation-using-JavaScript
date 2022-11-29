import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../../App';
import './CreatorDetails.css';

function CreatorDetails2() {

    const context = useContext(StateContext);
    // const [value, setValue] = useState([]);

    const onChangeInput = (e, id) => {
        // * Process 1
        // const tempVal = [...value];
        // tempVal[index] = { ...tempVal[index], inputValue: e.target.value };
        // setValue(tempVal);

        // * Process 2
        const localArray = [...context?.state?.inputTypeArray];
        const index = localArray.findIndex(item => item.id === id);
        localArray[index].inputValue = e.target.value;
        localArray[index].inputChildError = e.target.value.length <= 4 ? true : false;
        context.onChangeField('UPDATE_INPUT', localArray);
    }

    // * Process 1
    // useEffect(() => {
    //     let arr = []
    //     context?.state?.inputTypeArray?.forEach(element => {
    //         arr.push({ ...element, inputChildError: false });
    //     });
    //     setValue(arr);
    // }, [context?.state?.inputTypeArray]);

    const handleSubmit = e => {
        e.preventDefault();
        const heading = context.headingState.heading.title;
        if (heading === '' && heading.length < 4) {
            context.onChangeHeading('HEADING_ERROR');
            return;
        };
        const errorArr = context?.state?.inputTypeArray.filter(element => element.inputChildError);
        for (let i = 0; i < context?.state?.inputTypeArray.length; i++) {
            let target = e.target[i];
            let errorMsg = e.target.children[0].childNodes[i].children[2];
            if (target.value.length <= 4) {
                target.style.border = '1px solid red';
                errorMsg.style.display = 'block';
                errorArr.push(target)
            }
            else if (target.value.length >= 4) {
                target.style.border = '1px solid black';
                errorMsg.style.display = 'none';
            }
        }
        if (errorArr.length) return;
        context.handleSubmit('SUBMIT', context?.state?.inputTypeArray);
        context.onChangeHeading('DISPLAY_HEADING', context.headingState.heading.title);
    }

    return (
        <div className='creator_details_main'>
            <form onSubmit={handleSubmit} className="my_form">
                <div>
                    {
                        context.state.inputTypeArray.length > 0 &&
                        context.state.inputTypeArray?.map(items => {
                            // console.log(items);
                            return (
                                <div key={items.id} className='creator_details_inner' >
                                    <label>
                                        {items.inputLabel[0].toUpperCase() + items.inputLabel.substring(1)}
                                    </label>
                                    <input
                                        type={items.type}
                                        id={items.id}
                                        value={items.inputValue}
                                        onChange={e => onChangeInput(e, items.id)} />
                                    <p style={{ display: 'none' }}>
                                        *please enter {items.inputLabel[0].toUpperCase() +
                                            items.inputLabel.substring(1)}
                                    </p>
                                </div>
                            )
                        })
                    }
                    {
                        context.state.inputTypeArray.length
                            ? <button className='btn btn-dark mt-3' type='submit'>Submit</button>
                            : <h6>Please select input field.</h6>
                    }
                </div>
            </form>
        </div>
    );
}

export default CreatorDetails2;
