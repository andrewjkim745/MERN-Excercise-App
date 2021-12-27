import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";
import * as mdb from 'mdb-ui-kit';
window.mdb = mdb;

export default function CreateModal() {
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                CREATE ONE HERE
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log your Exercise!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group mb-4">
                            <h5>Exercise Duration</h5>
                            <NumberPicker defaultValue={0} />
                        </div>
                        <div class="form-group mb-4">
                            <textarea placeholder='Exercise Description' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </form>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}