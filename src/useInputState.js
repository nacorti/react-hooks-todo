import { useState } from 'react';

export default (initialName, initialDescription) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return {
    name,
    description,
    onNameChange: (event) => {
      setName(event.target.value);
    },
    onDescriptionChange: (event) => {
      setDescription(event.target.value);
    },
    reset: () => { 
      setName('');
      setDescription('');
    },
  };
};