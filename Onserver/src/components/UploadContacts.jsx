import React, { useState } from 'react';
import {addContactsBulkApi} from "../api/contacts";
import {addNewContactsBulk} from "../actions/User";
import { Button } from 'antd';
import { connect } from 'react-redux';
import Alerts from "./Alert"

const UploadContacts = (props) => {

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const onFinish = (values) => {
        addContactsBulkApi(values)
        .then(res => {
            setMessageType('success')
            setMessage("Contacts added Successfully")
            props.AddNewContactsBulk(res.data)
        })
        .catch(err => {
            const {message} = err.response.data
            setMessageType('error')
            setMessage(message)
        })
    };
    
    const onChange = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsText(file);
        reader.onload = () => {
            const result = csvJSON(reader.result)
            onFinish(result)
            console.log(result)
        };
        reader.onerror = function (error) {
        console.log('Error: ', error);
        }
    }
      
    return (
        <div>            
            {message && <Alerts type={messageType} message={message}/>}
            <div>
                <input type="file" accept=".csv" onChange={(e)=>onChange(e)} />
            </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    AddNewContactsBulk : (data) => dispatch(addNewContactsBulk(data))
})
  
export default connect( "", mapDispatchToProps)(UploadContacts);


function csvJSON(csv) {
    const lines = csv.split('\n')
    const result = []
    const headers = lines[0].trim().split(',')

    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
    }
    return result
}