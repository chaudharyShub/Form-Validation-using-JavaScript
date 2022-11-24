import React from 'react';
import Creator from './Creator/Creator';
import User from './User/User';
import './CreateForm.css';

function CreateForm() {
    return (
        <div className='create_form_main'>
            <div className="creator">
                <Creator />
            </div>
            <div className="user">
                <User />
            </div>
        </div>
    );
}

export default CreateForm;
