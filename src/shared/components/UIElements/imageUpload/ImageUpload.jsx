import React, { useEffect, useRef, useState } from 'react';
import './ImageUpload.css';
import Button from '../../FormElements/Button';

const ImageUpload = (props) => {
   const filePickerRef = useRef();
   const [file, setFile]  = useState();
   const [previewUrl, setPreviewUrl] = useState();
   const [isValid, setIsValid] = useState(false);

   useEffect(() => {
    if(!file) return;

    const fileReader = new FileReader();
    // runs when file is loaded OR completes his task
    fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
    };
    // covert file into dataURL
    fileReader.readAsDataURL(file);
   },[file]);
   
   const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
        if(event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
        }
    console.log(pickedFile);
        props.onInput(props.id, pickedFile, fileIsValid);
   }

   const pickImageHandler = () => { 
    // accessing input with useRef hook 
    filePickerRef.current.click();
   };

  return (
    <div className='form-control'>
        <input ref={filePickerRef} type='file' id={props.id} style={{display: 'none'}} onChange={pickedHandler} accept='.jpg, .png, .jpeg' />
        <div className={`image-upload ${props.center && 'center'}`}>
            <div className="image-upload__preview">
               {previewUrl && <img src={previewUrl } alt="Preview" />}
               {!previewUrl && <p> Plase pick an image</p>}
            </div>
            <Button type='button' onClick={pickImageHandler}>PICK IMAGE</Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
    </div>
  )
}

export default ImageUpload;