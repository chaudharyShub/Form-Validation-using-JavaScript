import React, { useEffect, useState } from 'react';
import './FormList.css';
import trash from '../../images/trash.svg';
import edit from '../../images/edit.svg';

function FormList() {

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

    const handleEditCard = () => {
        console.log('edit button clicked');
    }

    const handleDeleteCard = (index) => {
        outputArray.splice(index, 1);
        setOutputArray([...outputArray]);
        localStorage.setItem('output', JSON.stringify(outputArray));
        alert('Form DELETED Successfully!');
    }

    return (
        <div className='form_list_main'>
            {
                localityParameterSets && localityParameterSets.length > 0 ?
                    localityParameterSets.map((element, index) => {
                        return (
                            <div key={index} className='form_list_card'>
                                <div className='edit_delete_container'>
                                    <button onClick={handleEditCard}><img id='edit' className='edit' src={edit} /></button>
                                    <button onClick={() => handleDeleteCard(index)}><img id='delete' className='delete' src={trash} /></button>
                                </div>
                                {element.map((item, insideIndex) => {
                                    return (
                                        <div key={insideIndex} className='form_list_values'>
                                            {item.name === 'heading'
                                                ? null
                                                : <>
                                                    <b><p>{item.name}</p></b>
                                                    <span> : </span>
                                                </>}
                                            <p style={item.name === 'heading' ? style : null}>{item.value}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }) : <h4>Please submit a form to view !</h4>
            }
        </div>
    )
}

export default FormList;
