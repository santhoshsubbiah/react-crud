import React, { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import firebaseDB from '../firebase'
function Contacts() {

    // -------------------------------- Hooks ------------------------------------------------------------

    const [contactCollection, setContactCollection] = useState({});

    const [currentID, setCurrentID] = useState('');

    useEffect(() => {
        firebaseDB.child('contacts').on('value', snpashot => {
            if (snpashot.val() !== null) {
                setContactCollection({
                    ...snpashot.val()
                })
            } else {
                setContactCollection({})
            }
        })
    }, [])

    // -------------------------------- Local Functions ---------------------------------------------------

    const addOrEdit = (obj) => {
        if (currentID === '') {
            firebaseDB.child('contacts').push(obj, err => {
                if (err) {
                    console.log(err);
                } else {
                    setCurrentID('');
                }
            })
        } else {
            firebaseDB.child(`contacts/${currentID}`).set(obj, err => {
                if (err) {
                    console.log(err);
                } else {
                    setCurrentID('');
                }
            })
        }

    }

    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record from database ?')) {
            firebaseDB.child(`contacts/${id}`).remove(err => {
                if (err) {
                    console.log(err);
                } else {
                    setCurrentID('');
                }
            })
        }

    }

    return (
        <div>
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4 text-center">Contact Register</h1>
                </div>
            </div>

            <div className="row">

                <div className="col-md-5">
                    <ContactForm {...({ addOrEdit, currentID, contactCollection })} />
                </div>

                <div className="col-md-7">
                    <table className="table table-borderless table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactCollection).map(id => {
                                    return (
                                        <tr key={id}>
                                            <td>{contactCollection[id].fullName}</td>
                                            <td>{contactCollection[id].mobile}</td>
                                            <td>{contactCollection[id].email}</td>
                                            <td>{contactCollection[id].address}</td>
                                            <td>
                                                <a className="btn text-primary" onClick={() => setCurrentID(id)}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </a>
                                                <a className="btn text-danger" onClick={() => onDelete(id)}>
                                                    <i className="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Contacts
