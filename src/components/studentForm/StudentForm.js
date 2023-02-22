import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import './StudentForm.scss';
import { useBadge } from '@mui/base';

const StudentForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [skill, setSkill] = useState('');
    const [company, setCompany] = useState('');
    const [pic, setPic] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const submitStudent = () => {

        // post to backend/students
        const reqOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, email, skill, company, pic, city})
        }

        fetch('http://localhost:9000/students', reqOptions)
            .then(res => res.json())
            .then(data => {
                // if(data.status === 'error'){
                //     console.log('error')
                //     setErrorMessage ('An error occurred.')
                // } 
                

                // redirect to student detail page
                navigate(`/students/${data.id}`)
                // show success
                // clear form - maybe? 
            })
    }

    const validateEmail = () => {

        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setEmailIsValid(true);
            setErrorMessage('')

        } else {
            setEmailIsValid(false);
            if(email)
                setErrorMessage('Please add a valid email.')
            else {
                setErrorMessage('')
            }
        }
    }

  return (
    <div className="studentForm">
        <div className="studentForm__title">Add Student: </div>
        <div className="studentForm__errors">{errorMessage}</div>
        <div className="studentForm__inputs">
        <TextField 
            id="outlined-basic" 
            label="First Name" 
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} />
        <TextField 
            id="outlined-basic" 
            label="Last Name" 
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} />
        <TextField 
            id="outlined-basic" 
            label="Company" 
            variant="outlined"
            value={company}
            onChange={(e) => setCompany(e.target.value)} 
            />
        <TextField 
            id="outlined-basic" 
            label="Skill" 
            variant="outlined"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
             />
        <TextField 
            id="outlined-basic" 
            label="Email" 
            required
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
             />
        <TextField 
            id="outlined-basic" 
            label="City" 
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
             />
        </div>
        
        <TextField 
            id="outlined-basic" 
            label="Image" 
            variant="outlined"
            value={pic}
            onChange={(e) => setPic(e.target.value)}
            fullWidth />

        <div className="studentForm__button">
            <Button 
                variant="contained"
                disabled={!emailIsValid}
                onClick={submitStudent}
                >
                    Add Student
            </Button>
        </div>
       
    </div>
  )
}

export default StudentForm;