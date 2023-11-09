import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { uploadContact } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function Add() {
  // const navigate = useNavigate();

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

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isImgValid, setIsImgValid] = useState(true);

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

  useEffect(() => {
    validate();
  }, [validate]);

  const handleUpload = async () => {
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
        if (urlImg) {
          const img = new FormData();
          img.append("image", urlImg);
          console.log(`image url....4${img}`);
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
            console.log(`rfdd${contact}`);
          }
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
              {!isNameValid && (
                <div className=" text-danger fw-bolder">Invalid User Name</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Mobile Number"
                autoFocus
                defaultValue={"+91"}
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
    </>
  );
}

export default Add;
