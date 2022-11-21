import React, { useContext, useState } from 'react';
import { StateContext } from '../../App';
import CreatorDetails2 from './CreatorDetails/CreatorDetails2';
import './Creator.css';

function Creator() {

    const context = useContext(StateContext);

    const style = {
        errorStyle: { border: '1.2px solid red' },
        simpleStyleHeading: { border: '1.2px solid transparent' },
        simpleStyleInputLabel: { border: '1.2px solid black' }
    }

    const listItems = [
        { id: 'text', name: 'Text' },
        { id: 'email', name: 'E-mail' },
        { id: 'password', name: 'Password' },
        { id: 'textarea', name: 'Textarea' },
        { id: 'number', name: 'Number' },
    ];

    const [inputDetail, setInputDetail] = useState({
        labelName: '',
        inputType: '',
        labelError: false,
        inputError: false,
    });

    const onChangeLabel = e => {
        const { value } = e.target;
        setInputDetail(prevState => ({
            ...prevState,
            labelName: value,
            labelError: value.length >= 4 ? false : true
        }));
    }

    const onSelectInputType = e => {
        const { id } = e.target;
        setInputDetail(prevState => ({
            ...prevState,
            inputType: id,
            inputError: id ? false : true
        }));
    }

    const handleAddInput = () => {

        const obj = {
            inputLabel: inputDetail.labelName,
            type: inputDetail.inputType,
            inputChildError: true,
            inputValue: '',
            id: Date.now().toString(),
        }

        if (obj.inputLabel.length < 4) {
            setInputDetail(prevState => ({
                ...prevState,
                labelError: true
            }));
        }
        if (!obj.type) {
            setInputDetail(prevState => ({
                ...prevState,
                inputError: true
            }));
        }
        if (context.state.inputTypeArray.length === 0 &&
            !inputDetail.labelError &&
            !inputDetail.inputError &&
            obj.inputLabel &&
            obj.type) {
            context.handleSubmit('ADD_INPUT_TYPE', obj);
            setInputDetail({
                labelName: '',
                inputType: '',
            });
        }
        else if (context.state.inputTypeArray.length >= 1 &&
            !inputDetail.labelError &&
            !inputDetail.inputError &&
            obj.inputLabel &&
            obj.type) {
            const isAvailable = context.state.inputTypeArray.find(item =>
                item.inputLabel.toUpperCase() === inputDetail.labelName.toUpperCase());
            isAvailable ? alert("Same label can't exist !!!") : context.handleSubmit('ADD_INPUT_TYPE', obj);
            setInputDetail({
                labelName: '',
                inputType: '',
            });
        }
    }

    return (
        <div className="dropdown input_main">

            <div className='form_heading'>
                <div className='form_heading_inner'>
                    <h5>Untitled Form</h5>
                    <input
                        type='text'
                        placeholder='Enter Title here...'
                        id='heading'
                        style={context.headingState.heading.isError ? style.errorStyle : style.simpleStyleHeading}
                        onChange={e => context.onChangeHeading('ADD_HEADING', e.target.value)}
                    />
                    <p style={context.headingState.heading.isError ? { display: 'block' } : { display: 'none' }}>
                        *please enter heading
                    </p>
                </div>
            </div>

            <div className='input_container_parent'>
                <div className='input_container_outer'>
                    <div className='input_container'>
                        <input
                            type='text'
                            placeholder='Untitled Label'
                            id='label'
                            value={inputDetail.labelName}
                            onChange={onChangeLabel}
                            style={inputDetail.labelError ? style.errorStyle : style.simpleStyleInputLabel}
                        />
                        <p style={{ display: inputDetail.labelError ? 'block' : 'none' }}>
                            *please enter valid label
                        </p>
                    </div>

                    <div className='input_field'>
                        <button
                            className={`btn btn-outline-${inputDetail.inputError ? 'danger' : 'primary'} dropdown-toggle mx-2`}
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {inputDetail.inputType.length > 1
                                ? (inputDetail.inputType[0].toUpperCase() + inputDetail.inputType.substring(1))
                                : 'Select Input Type'}
                        </button>
                        <p style={{ display: `${inputDetail.inputError ? 'block' : 'none'}` }}>
                            *please enter input field
                        </p>
                        <ul className="dropdown-menu" onClick={onSelectInputType}>
                            {listItems.map((items, index) => (
                                <li key={index}>
                                    <a className="dropdown-item" id={items.id} href="#">{items.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className='btn btn-primary addBtn'
                        onClick={handleAddInput}
                    >Add</button>
                </div>

                <div className="creator_detils">
                    <CreatorDetails2 />
                </div>

            </div>
        </div>
    );
}

export default Creator;
