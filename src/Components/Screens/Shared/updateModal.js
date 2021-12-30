import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";
import * as mdb from 'mdb-ui-kit';
window.mdb = mdb;

export default function UpdateModal(props) {



    return (
        <>
            <a onClick={props.handleShow} class="btn btn-info"><i class="far fa-edit fa-fw me-3"></i>Update</a>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Your Exercise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group mb-4">
                            <h5>Exercise Duration (in Minutes)</h5>
                            <NumberPicker value={props.duration} onChange={props.onNumberChange} defaultValue={props.defaultValue} />
                        </div>
                        <div class="form-group mb-4">
                            <textarea value={props.descriptionValue} onChange={props.onChange} placeholder='Exercise Description' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </form>
                    <DatePicker selected={props.startDate} onChange={props.changeDate} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClick}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.onSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}