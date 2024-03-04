// AdminPanel.js
import React, { useState, useEffect } from 'react';
import './Contact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';

const AdminPanel = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/contactFormSubmissions');
            if (!response.ok) {
                throw new Error('Failed to fetch submissions');
            }
            const data = await response.json();
            setSubmissions(data);
        } catch (error) {
            console.error('Error fetching submissions:', error.message);
            // Handle error (display error message, etc.)
        }
    };

    const removeSubmission = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/contactFormSubmissions/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                 alert("Form deleted")
                fetchSubmissions();
            } else {
                throw new Error('Failed to delete submission');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the submission');
        }
    };


    return (
        <div className="admin-panel">
            <h2>Contact Form Submissions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission, index) => (
                        <tr key={index}>
                            <td>{submission.name}</td>
                            <td>{submission.phone}</td>
                            <td>{submission.email}</td>
                            <button onClick={() => removeSubmission(submission._id)} className='button'>Delete</button>
                            <ToastContainer/>
                        </tr>
                    ))}
                   
                </tbody>
            </table>
            <div>
            </div>
        </div>

    );
};

export default AdminPanel;
