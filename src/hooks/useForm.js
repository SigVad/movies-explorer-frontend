import {useState} from 'react';
//универсальный пользовательский хук для контроля любого количества инпутов
//принимает объект значений, например {name:'', link:''}
export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    //console.log(event.target);
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
 
//Этот код помещают в отдельный файл useForm.js в папке hooks и импортируют функцию туда, где нужно контролировать инпуты