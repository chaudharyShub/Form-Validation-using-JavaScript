import React, { useContext, useEffect } from 'react';
import { StateContext } from '../../../App';
import './User.css';

function User() {

    const context = useContext(StateContext);
    const heading = context.headingState.displayedHeading;
    const contextStateOutputItems = context.state.outputItems;
    const arr = [];

    const setItemInObject = () => {
        const formObject = {};
        formObject['heading'] = heading;
        for (let i = 0; i < contextStateOutputItems.length; i++) {
            formObject[contextStateOutputItems[i].inputLabel] = contextStateOutputItems[i].inputValue;
        }
        arr.push(formObject);
    }

    useEffect(() => {
        setItemInObject();
    });

    const handleSubmitDetails = () => {
        let output = localStorage.getItem('output');
        if (output === null) {
            output = [...arr];
        } else {
            const a = JSON.parse(output);
            output = [...a, ...arr];
        }
        localStorage.setItem('output', JSON.stringify(output));
        alert('Form Submitted Successfully!');
        window.location.reload(true);
    }

    return (
        <div className='user_main'>
            <h2>Preview :</h2>
            <div className='user_main_inner'>
                {
                    heading
                        ? <h3>
                            {heading[0].toUpperCase() +
                                heading.substring(1)}
                        </h3>
                        : null
                }
                {
                    contextStateOutputItems.length
                        ? <div>
                            {
                                contextStateOutputItems.map((element, index) => (
                                    <div key={index} className='output_items'>
                                        <p className='key'>
                                            {element.inputLabel.toUpperCase()}
                                        </p>
                                        <span>:</span>
                                        <p className='value'>
                                            {element.inputValue[0].toUpperCase() + element.inputValue.substring(1)}
                                        </p>
                                    </div>
                                ))
                            }
                            <button
                                className='btn btn-primary'
                                onClick={handleSubmitDetails}>
                                Submit
                            </button>
                        </div>
                        : <h6>Please submit a value!</h6>
                }
            </div>
        </div>
    );
}

export default User;
