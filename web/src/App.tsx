import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleFileData = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  }

  const sendData = async (file: File | null) => {
    if(file)
    {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('http://localhost:3334/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { text } = res.data;
      setInfo(text)
    }
  }

  useEffect(() => {
    sendData(file)
  }, [file])

  return (
    <main>
      <div className="container">
        <div className="read-file-area">
          <div className="read-file">
            <div className="read-file__title">
              <h1>Faça o upload do PDF</h1>
            </div>
            <div className="read-file__content">
              <label htmlFor="file-data">Suba o PDF</label>
              <input type="file" id='file-data' onChange={(e) => handleFileData(e)}/>
            </div>
          </div>
          {info && 
            <div className="read-file">
              <div className="readed-file">
                <p>{info}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </main>
  );
}

export default App;
