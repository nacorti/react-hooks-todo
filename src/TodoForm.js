import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from './useInputState';

const TodoForm = ({ saveTodo }) => {
    const { name, description, reset, onNameChange, onDescriptionChange } = useInputState('');
    return (
        <form
            onSubmit={(event) => {
                console.log('submit!');
                event.preventDefault();
                saveTodo({ name, description });
                reset();
            }}
        >
            <div>
                <TextField
                    variant="outlined" 
                    placeholder="Add Todo" 
                    margin="normal"
                    onChange={onNameChange}
                    value={name}
                />
                <TextField
                    variant="outlined" 
                    placeholder="Add Description" 
                    margin="normal"
                    onChange={onDescriptionChange}
                    value={description}
                />
            </div>
            <button>Create Todo</button>
            
        </form>
    );
};

export default TodoForm;