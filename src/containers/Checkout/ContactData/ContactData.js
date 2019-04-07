import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import styles from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            building: '',
            postalCode: '',
        },
    }

    

    render() {
        return (
            <div className={styles.ContactData}>
                <h3>Fill in your contact data!</h3>
                <form className={styles.DataForm}>
                    <input type='text' name='name' placeholder='Your Name'/>
                    <input type='text' name='email' placeholder='Your Email'/>
                    <input type='text' name='street' placeholder='Your Street'/>
                    <input type='text' name='building' placeholder='Your Building'/>
                    <input type='text' name='postal' placeholder='Your Postal Code'/>
                    <Button
                        click={null}
                        type='Success'>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
