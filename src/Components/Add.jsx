import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { uploadContact } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add() {

  const navigate = useNavigate();


  const [contact, setContact] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    urlImg: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpload = async () => {
    const { name, mobile, email, address, urlImg } = contact;

    if (!name || !mobile || !email || !address || !urlImg) {
      toast.warning("Please Fill the Form Completely..!");
    } else {
      // make api call uploadContact
      const response = await uploadContact(contact);
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        toast.success(`Contact uploaded Successfully!!!`);
        setContact({
          name: "",
          mobile: "",
          email: "",
          address: "",
          urlImg: "",
        });
        handleClose();
        console.log(response.data);
        // navigate("/contact");
      } else {
        toast.error(`Can't perform the Operation now. Please try after some time..`);
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <i class="fa-solid fa-user-plus fa-beat-fade fa-lg p-4"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number"
                autoFocus
                onChange={(e) =>
                  setContact({ ...contact, mobile: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) =>
                  setContact({ ...contact, address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your Photo URl</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image Address (url)"
                autoFocus
                onChange={(e) =>
                  setContact({ ...contact, urlImg: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer
      position="top-center"
      autoClose={2000}
      />
    </>
  );
}

export default Add;
