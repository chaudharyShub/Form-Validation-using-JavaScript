import React, { useContext } from 'react';
import { StateContext } from '../../App';
import './User.css';

function User() {

    const context = useContext(StateContext);

    return (
        <div className='user_main'>
            <h2>Preview :</h2>
            <div className='user_main_inner'>
                {
                    context.headingState.heading.title
                        ? <h3>{context.headingState.heading.title}</h3>
                        : ''
                }
                {
                    context.state.outputItems.length
                        ? <div>
                            {
                                context.state.outputItems.map((element, index) => (
                                    <div key={index} className='output_items'>
                                        <p className='key'>
                                            {element.inputLabel}
                                        </p>
                                        <span>:</span>
                                        <p className='value'>
                                            {element.inputValue}
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
