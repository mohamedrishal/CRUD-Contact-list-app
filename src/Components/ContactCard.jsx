import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { deleteAContact, getAllContacts } from "../services/allAPI";
import { Link } from "react-router-dom";

function ContactCard() {
  // Modal {

  // Modal }

  const [allContacts, setAllContacts] = useState([]);

  const getAllUploadedContacts = async () => {
    const { data } = await getAllContacts();
    setAllContacts(data);
  };

  useEffect(() => {
    getAllUploadedContacts();
  });

  console.log(allContacts);

  const removeContact = async (id) => {
    // make api call
    const response = await deleteAContact(id);
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-3 mt-5">
      {allContacts.length > 0 ? (
        allContacts.map((contact) => (
          <Card key={contact.id} className="mt-3 ps-5 pe-5" style={{ width: "95%" }}>
            {/* <Card.Img variant="top" src="" roundedCircle /> */}
            <div className="d-flex justify-content-center align-items-center mt-3">
              <Image
                style={{ height: "70px", width: "70px" }}
                src={contact?.urlImg}
                roundedCircle
              />
            </div>
            <Card.Body className="d-flex justify-content-center align-items-center">
              <Card.Title> {contact?.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Mobile : {contact?.mobile}</ListGroup.Item>
              <ListGroup.Item>Email : {contact?.email} </ListGroup.Item>
              <ListGroup.Item>Address : {contact?.address}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Link to={`/update/${contact.id}`} className="btn border border-success bors me-4 text-success">
                Update <i class="fa-solid fa-pen-to-square text-success"></i>
              </Link>
              <button
                className="btn border border-danger text-danger"
                onClick={() => removeContact(contact.id)}
              >
                Delete <i className="fa-solid fa-trash text-danger"></i>
              </button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="fw-bolder fs-5 text-danger">Nothing to display!!!</p>
      )}

      {/* Modal */}
    </div>
  );
}

export default ContactCard;
