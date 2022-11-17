import React, { useContext } from 'react';
import { StateContext } from '../../../App';
import './CreatorDetails.css';

function CreatorDetails2() {

    const context = useContext(StateContext);

    const onChangeInput = e => {
        const { id, value } = e.target;
        const obj = context.state.inputTypeArray.find(item => item.id === id);
        if (!obj) return;
        obj.inputValue = value;
        obj.inputChildError = value.length > 4 ? false : true
        context.handleSubmit({
            type: 'UPDATE_INPUT',
            paylod: {
                id,
                obj,
            }
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const heading = context.headingState.heading.title;
        if (heading === '' && heading.length < 4) {
            context.onChangeHeading('HEADING_ERROR');
            return;
        };
        const errorArr = context.state.inputTypeArray.filter(element => element.inputChildError);
        for (let i = 0; i < context.state.inputTypeArray.length; i++) {
            let target = e.target[i];
            let errorMsg = e.target.children[0].childNodes[i].children[2];
            // console.log(e.target.children[0].childNodes[i].children[2].style.display);
            if (target.value.length <= 4) {
                target.style.border = '1px solid red';
                errorMsg.style.display = 'block';
            }
            else if (target.value.length >= 4) {
                target.style.border = '1px solid black';
                errorMsg.style.display = 'none';
            }
        }
        if (errorArr.length) return;
        context.handleSubmit('SUBMIT', context.state.inputTypeArray);
    }

    return (
        <div className='creator_details_main'>
            <form onSubmit={handleSubmit} className="my_form">
                <div>
                    {
                        context.state.inputTypeArray.length > 0 &&
                        context.state.inputTypeArray.map(items => (
                            <div key={items.id} className='creator_details_inner' >
                                <label>{items.inputLabel}</label>
                                <input
                                    type={items.type}
                                    id={items.id}
                                    onChange={onChangeInput} />
                                <p style={{ display: 'none' }}> *please enter {items.inputLabel} </p>
                            </div>
                        ))
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
