import React,{useState} from 'react'
import './xd.css'
import axios from 'axios';

export const Fileupload = () => {
    const [file,setFile] = useState('');
    const [filename,setFilename]= useState('Choose File');
    
    const onChange=(e)=>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const onSubmit = async (e)=>{
        e.preventDefualt();
        const formData=new FormData();
        formData.append('file',file);

        try {
            const res = await axios.post('/upload',formData,{
                headers:{
                    'Content-type':'multipart/form-data'
                }
            })
            const {fileName,filePath} = res.data;
            
        } catch (error) {
            
        }
    }

    return (
        <>
          <form onSubmit={onSubmit}>
            <div className="custom-file mb-4">
                <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                ></input>
                <label className="custom-file-label" htmlFor="customFile">{filename}</label>
            </div>

            <button 
            type="submit"
            value="Upload"
            className="btn btn-primary mt-4"
            ></button>
          </form>
        </>
    )
}
export default Fileupload