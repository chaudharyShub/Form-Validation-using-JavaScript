import React, { useContext } from 'react';
import { StateContext } from '../../App';
import './User.css';

function User() {

    const context = useContext(StateContext);
    const heading = context.headingState.displayedHeading;

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
                            <button className='btn btn-primary' onClick={() => {
                                alert('Form Submitted Successfully!');
                                window.location.reload(true);
                            }}>Submit</button>
                        </div>
                        : <h6>Please submit a value!</h6>
                }
            </div>
        </div>
    );
}

export default User;
