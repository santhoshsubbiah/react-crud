import React, { useState, useEffect } from 'react'

function ContactForm(props) {

    // -------------------------------- Hooks ------------------------------------------------------------

    const initialFieldValues = {
        fullName: '',
        mobile: '',
        email: '',
        address: ''
    }
    const [values, setValues] = useState(initialFieldValues);

    useEffect(() => {
        if (props.currentID === '') {
            setValues({
                ...initialFieldValues
            })
        } else {
            setValues({
                ...props.contactCollection[props.currentID]
            })
        }

    }, [props.currentID, props.contactCollection])

    // -------------------------------- Local Functions ---------------------------------------------------

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values, [name]: value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.addOrEdit(values);
    }

    return (
        <div>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Full Name" name="fullName" value={values.fullName} onChange={handleInputChange}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group input-group col-md-6">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                        </div>
                        <input className="form-control" placeholder="Mobile" name="mobile" value={values.mobile} onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group input-group col-md-6">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-envelope"></i>
                            </div>
                        </div>
                        <input className="form-control" placeholder="Email" name="email" value={values.email} onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <textarea className="form-control" placeholder="Address" name="address" value={values.address} onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary btn-block" type="submit" value={props.currentID === '' ? 'Save' : 'Update'}
                    />
                </div>
            </form>
        </div>
    )
}

export default ContactForm
