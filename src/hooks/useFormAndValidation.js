//хук валидации. 
//Этот код помещают в отдельный файл useFormAndValidation.js в папке hooks и импортируют функцию туда, где нужно валидировать:

import {useState, useCallback} from 'react';

export function useFormAndValidation(inputValues = {}) {

  const [ values, setValues ] = useState(inputValues);
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((
    newValues = {}, 
    newErrors = {}, 
    newIsValid = false
  ) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

 
//одной строчкой запускается вся валидация:
//const {values, handleChange, errors, isValid, resetForm, setValues} = useFormAndValidation()
//useCallback единожды создаем метод и обновляем его только тогда, когда меняется какой-то из параметров, которые мы поместим в качестве элемента массива и передаем вторым аргументом – по аналогии с массивами в других хуках. Так мы мемоизируем наш метод,и у нас не происходит лишний рендеринг