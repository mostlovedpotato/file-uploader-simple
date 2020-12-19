import React,{useState} from 'react';
import './xd.css';
import Message from './Message';
import axios from 'axios';

export const Fileupload = () => {
    const [file,setFile] = useState('');
    const [filename,setFilename]= useState('Choose File');
    const [uploadedFile,setUploadedFile] = useState({});
    const [message,setMessage] = useState('');

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
                    'Content-Type':'multipart/form-data'
                }
            })
            const {fileName,filePath} = res.data;
            setUploadedFile({fileName,filePath});
            setMessage("File Uploaded");
            
        } catch (error) {
            if(error.response.status===500) {
                setMessage("There is a problem in b/w");
            }else{
                setMessage(error.response.data.msg);
            }
        }
    }

    return (
        <>
            {message ? <Message msg={message} /> : null}
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
            >Upload</button>
          </form>
          {uploadedFile ? (
              <div className="row mt-5">
                  <div>
                      <h3 className="text-center">{uploadedFile.fileName}</h3>
                      <img style={{width:'100%'}} src={uploadedFile.filePath}></img>
                  </div>
              </div>
          ):null}
        </>
    )
}
export default Fileupload