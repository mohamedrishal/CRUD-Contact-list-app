import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getAContacts, updateContact } from "../services/allAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Update() {
  const { id } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [contact, setContact] = useState([]);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isImgValid, setIsImgValid] = useState(true);

  // const navigate = useNavigate();

  const validate = () => {
    const { name, mobile, email, address, urlImg } = contact;

    setIsNameValid(!!name?.match(/^([a-zA-Z ]){2,30}$/));
    setIsEmailValid(
      !!email?.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    );
    setIsMobileValid(!!mobile?.match(/^\+\d{1,4}\d{10}$/));
    setIsAddressValid(!!address && address.length >= 1);
    setIsImgValid(!!urlImg && urlImg.length >= 1);
  };

  const getAUploadedContacts = async () => {
    const { data } = await getAContacts(id);
    setContact(data);
  };

  useEffect(() => {
    getAUploadedContacts();
    console.log(isEmailValid);
  }, []);

  useEffect(() => {
    validate();
    console.log(isEmailValid);
  }, [validate]);

  const handleUpload = async (e) => {
    // make api call uploadContact
    e.preventDefault();
    const { name, mobile, email, address, urlImg } = contact;

    if (!name || !mobile || !email || !address || !urlImg) {
      toast.warning("Please Fill the Form Completely..!");
    } else {
      if (
        !isNameValid ||
        !isEmailValid ||
        !isMobileValid ||
        !isAddressValid ||
        !isImgValid
      ) {
        toast.warning("Please Fill the Form Properly ..!");
      } else {
        const response = await updateContact(id, contact);
        if (response.status >= 200 && response.status < 300) {
          toast.success(`Updated Successfully!!!`);
          setContact(response.data);
          console.log(response.data);
          handleClose();
          // navigate("/contact");
        } else {
          toast.error(
            `Can't perform the Operation now. Please try after some time..`
          );
        }
      }
    }
  };

  return (
    <div
      style={{ height: "90vh" }}
      className="container mt-5 d-flex justify-content-center align-items-center"
    >
      <div className="d-flex justify-content-center align-items-center flex-column">
        <Button
          className="p-3 mb-5 px-5"
          variant="primary"
          onClick={handleShow}
        >
          <i class="fa-regular fa-pen-to-square fs-5 "></i> <br /> Update <br />{" "}
          <i className="fw-bolder">{contact.name} </i> <br /> Details
        </Button>

        <Link to={`/`} className="btn border mt-5">
          <i class="fa-solid fa-arrow-left"> </i> Back to Home
        </Link>
      </div>

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
              {!isNameValid && (
                <div className=" text-danger fw-bolder">Invalid User Name</div>
              )}
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
              {!isMobileValid && (
                <div className=" text-danger fw-bolder">
                  Invalid Mobile Number (with country code)
                </div>
              )}
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
              {!isEmailValid && (
                <div className=" text-danger fw-bolder">Invalid Email Id</div>
              )}
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
              {!isAddressValid && (
                <div className=" text-danger fw-bolder">Invalid addresses</div>
              )}
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload a Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setContact({
                    ...contact,
                    urlImg: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
              {!isImgValid && (
                <div className=" text-danger fw-bolder">
                  upload your Profile
                </div>
              )}
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

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Update;
