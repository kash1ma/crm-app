import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createClient } from "../../services/clientsService";

export default function ClientForm({ onClose }) {
  const [contacts, setContacts] = useState([{ type: "phone", value: "" }]);
  const [name, setname] = useState("");
  const [lastName, setLastName] = useState("");
  const [surname, setSurname] = useState("");

  const handleAddContact = () => {
    if (contacts.length < 10) {
      setContacts([...contacts, { type: "phone", value: "" }]);
    }
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      name,
      lastName,
      surname,
      contacts,
    };
    console.log(clientData);

    try {
      await createClient(clientData);
      console.log("Client created successfully", clientData);
      onClose();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите фамилию"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Отчество</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите отчество"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>

      <Form.Label>Контакты</Form.Label>
      {contacts.map((contact, index) => (
        <div key={index} className="mb-3 d-flex align-items-center">
          <Form.Select
            className="me-2"
            value={contact.type}
            onChange={(e) => handleContactChange(index, "type", e.target.value)}
          >
            <option value="phone">Телефон</option>
            <option value="Email">Емейл</option>
            <option value="Facebook">Фейсбук</option>
            <option value="VK">ВК</option>
            <option value="Другое">Другое</option>
          </Form.Select>
          <Form.Control
            type="text"
            placeholder="Введите контакт"
            value={contact.value}
            onChange={(e) =>
              handleContactChange(index, "value", e.target.value)
            }
            required
          />
          <Button
            variant="danger"
            className="ms-2"
            onClick={() => handleRemoveContact(index)}
          >
            Удалить
          </Button>
        </div>
      ))}
      {contacts.length < 10 && (
        <Button variant="secondary" onClick={handleAddContact}>
          Добавить контакт
        </Button>
      )}

      <div className="mt-4">
        <Button variant="primary" type="submit">
          Сохранить
        </Button>
        <Button variant="secondary" onClick={onClose} className="ms-2">
          Отмена
        </Button>
      </div>
    </Form>
  );
}
