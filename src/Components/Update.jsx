import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getAContacts, updateContact } from "../services/allAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";

function Update() {
  const { id } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [contact, setContact] = useState([]);

  const navigate = useNavigate();

  const getAUploadedContacts = async () => {
    const { data } = await getAContacts(id);
    setContact(data);
  };

  useEffect(() => {
    getAUploadedContacts();
  }, []);

  const handleUpload = async (e) => {
    // make api call uploadContact
    e.preventDefault();
    const { name, mobile, email, address, urlImg } = contact;

    if (!name || !mobile || !email || !address || !urlImg) {
      toast.warning("Please Fill the Form Completely..!");
    } else {
      const response = await updateContact(id, contact);
      if (response.status >= 200 && response.status < 300) {
        toast.success(`Updated Successfully!!!`);
        setContact(response.data);
        console.log(response.data);
        handleClose()
        // navigate("/contact");
      } else {
        toast.error(`Can't perform the Operation now. Please try after some time..`);
      }
    }
  };

  return (
    <div
      style={{ height: "70vh" }}
      className="mt-5 d-flex justify-content-center align-items-center"
    >
      <Button className="p-3" variant="primary" onClick={handleShow}>
        <i class="fa-regular fa-pen-to-square fs-5"></i> <br /> Edit <br />{" "}
        <i>"{contact.name}" </i> Contact
      </Button>

      <Link
        style={{ top: "70vh", left: "40vh" }}
        to={`/contact`}
        className="btn border me-4 position-absolute"
      >
        <i class="fa-solid fa-arrow-left"> </i> Back to Contact
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                defaultValue={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Number"
                autoFocus
                defaultValue={contact.mobile}
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
                defaultValue={contact.email}
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
                defaultValue={contact.address}
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
                defaultValue={contact.urlImg}
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
      
    </div>
  );
}

export default Update;
