import React, { useContext, useState } from 'react';
import { StateContext } from '../../../App';
import './CreatorDetails.css';

function CreatorDetails() {

    const context = useContext(StateContext);
    console.log(context.state.inputTypeArray);
    const [input, setInput] = useState({
        isError: true,
        errorKey: ''
    });
    const array = [];

    const onChangeInput = e => {
        const { id, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [id]: value,
            isError: value.length < 4 ? true : false,
            errorKey: id,
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();

        for (let i = 0; i < context.state.inputTypeArray.length; i++) {
            let target = e.target[i];
            let errorMsg = e.target.children[i].childNodes[2];

            if (target.value.length <= 4) {
                target.style.border = '1px solid red';
                errorMsg.style.display = 'block';
                setInput(prevState => ({
                    ...prevState,
                    isError: true,
                    errorKey: target
                }))
            }
            else if (!input.isError && target.value.length >= 4) {
                target.style.border = '1px solid black';
                errorMsg.style.display = 'none';
                array.push({
                    key: target.name.toUpperCase(),
                    value: target.value
                });
                setInput(prevState => ({
                    ...prevState,
                    isError: false,
                    errorKey: target
                }))
            }
        }
        console.log(array);
    }

    return (
        <div className='creator_details_main'>
            <form onSubmit={handleSubmit} name="myForm">
                {
                    context.state.inputTypeArray.length > 0 &&
                    context.state.inputTypeArray.map((items, index) => {
                        return (
                            <div key={index} className='creator_details_inner'>
                                <label>{items.inputLabel}</label>
                                <input
                                    name={items.inputLabel}
                                    type={items.type}
                                    id={index}
                                    onChange={onChangeInput} />
                                <p style={{ display: 'none' }}> *please enter {items.inputLabel} </p>
                            </div>
                        )
                    })
                }
                {
                    context.state.inputTypeArray.length
                        ? <button className='btn btn-dark mt-3' type='submit'>Submit</button>
                        : <h6>Please select input field.</h6>
                }
            </form>
        </div>
    );
}

export default CreatorDetails;
