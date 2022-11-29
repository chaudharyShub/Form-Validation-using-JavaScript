import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import trash from '../../images/trash.svg';
import edit from '../../images/edit.svg';
import './FormList.css';

function FormList() {

    const notify = () => {
        toast.success("Form DELETED Successfully", {
            position: toast.POSITION.TOP_CENTER,
            pauseOnHover: false,
            autoClose: 2000,
            theme:"colored",
        });
    }

    const context = useContext(StateContext);
    const navigate = useNavigate();
    const arr = JSON.parse(localStorage.getItem('output'));
    const [outputArray, setOutputArray] = useState(arr);

    const style = {
        fontSize: '2rem',
        fontWeight: '600',
        textDecoration: 'underline'
    }

    const localityParameterSets = outputArray && outputArray.map(value => {
        return Object.entries(value).map(([key, val]) => {
            return {
                name: key,
                value: val
            };
        });
    });

    const handleEditCard = (index) => {
        const arrayToBeEdited = [];
        for (const key in outputArray[index]) {
            const obj = {
                inputLabel: '',
                type: '',
                inputChildError: false,
                inputValue: '',
                id: '',
            }
            let a = outputArray[index][key].split('|');
            if (key === 'heading') context.onChangeHeading('ADD_HEADING', outputArray[index].heading);
            else {
                obj.inputLabel = key;
                obj.type = a[2];
                obj.inputChildError = false;
                obj.inputValue = a[0];
                obj.id = a[1];
                arrayToBeEdited.push(obj);
            }
        }
        context.handleSubmit('EDIT_ARRAY', arrayToBeEdited);
        context.onUpdate('UPDATE', index);
        navigate('/create-form');
    }

    const handleDeleteCard = (index) => {
        outputArray.splice(index, 1);
        setOutputArray([...outputArray]);
        localStorage.setItem('output', JSON.stringify(outputArray));
        notify();
    }

    return (
        <>
            <ToastContainer />
            <div className='form_list_main'>
                {
                    localityParameterSets && localityParameterSets.length > 0 ?
                        localityParameterSets.map((element, index) => {
                            return (
                                <div key={index} className='form_list_card'>
                                    <div className='edit_delete_container'>
                                        <button onClick={() => handleEditCard(index)}><img id='edit' className='edit' src={edit} /></button>
                                        <button onClick={() => handleDeleteCard(index)}><img id='delete' className='delete' src={trash} /></button>
                                    </div>
                                    {element.map((item, insideIndex) => {
                                        return (
                                            <div key={insideIndex}
                                                className='form_list_values'>
                                                {item.name === 'heading'
                                                    ? null
                                                    : <>
                                                        <b><p>{item.name}</p></b>
                                                        <span> : </span>
                                                    </>}
                                                <p style={item.name === 'heading' ? style : null}>
                                                    {item.value.split('|')[0]}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }) : <h4>No items founds !</h4>
                }
            </div>
        </>
    )
}

export default FormList;
