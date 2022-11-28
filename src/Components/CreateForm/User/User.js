import React, { useContext, useEffect } from 'react';
import { StateContext } from '../../../App';
import './User.css';

function User() {

    const context = useContext(StateContext);
    const heading = context.headingState.displayedHeading;
    const arr = [];
    let localObject;

    const setItemInObject = () => {
        const formObject = {};
        formObject['heading'] = heading;
        for (let i = 0; i < context.state.outputItems.length; i++) {
            formObject[context.state.outputItems[i].inputLabel] =
                `${context.state.outputItems[i].inputValue}|${context.state.outputItems[i].id}|${context.state.outputItems[i].type}`;
        }
        arr.push(formObject);
        localObject = formObject;
    }

    useEffect(() => {
        setItemInObject();
    });

    const handleSubmitDetails = () => {
        let output = localStorage.getItem('output');
        if (context.edit.update) {
            const a = JSON.parse(output);
            a.splice(context.edit.index, 1, localObject);
            output = [...a];
            localStorage.setItem('output', JSON.stringify(output));
            alert('Form UPDATED !');
            window.location.reload(true);
        }
        else {
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
                    context.state.outputItems.length
                        ? <div>
                            {
                                context.state.outputItems.map((element, index) => (
                                    <div id={element.id} type={element.type} key={index} className='output_items'>
                                        <p className='key'>
                                            {element.inputLabel.toUpperCase()}
                                        </p>
                                        <span>:</span>
                                        <p className='value'>
                                            {element.inputValue[0]?.toUpperCase() + element.inputValue.substring(1)}
                                        </p>
                                    </div>
                                ))
                            }
                            <button
                                className='btn btn-primary'
                                onClick={handleSubmitDetails}>
                                {context.edit.update ? 'Update' : 'Submit'}
                            </button>
                        </div>
                        : <h6>Please submit a value!</h6>
                }
            </div>
        </div>
    );
}

export default User;
