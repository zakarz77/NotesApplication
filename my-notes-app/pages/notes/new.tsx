import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Container, Form, Button } from "react-bootstrap";
import styles from "../../styles/NotePage.module.css";

const NewNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/notes", { title, content });
    router.push("/");
  };

  const handleBack = () => {
    router.push("/"); // Navigate back to the home page
  };

  return (
    <Container>
      <h1>New Note</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className='formLabel'>Title</Form.Label>
          <Form.Control
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='formLabel'>Content</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <div className={styles.buttonContainer}>
          <Button type='submit' className='mr-2'>
            Create Note
          </Button>
          <Button variant='secondary' onClick={handleBack}>
            Back
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default NewNote;
