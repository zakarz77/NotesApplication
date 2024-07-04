import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const EditNote = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/notes/${id}`).then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/notes/${id}`, { title, content });
    router.push("/");
  };

  return (
    <Container>
      <h1>Edit Note</h1>
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
        <Button type='submit' className='mt-3'>
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditNote;
