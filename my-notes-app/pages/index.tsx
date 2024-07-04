import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Home.module.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/notes/${id}`);
      // Assuming response.data contains a success message or similar
      console.log("Note deleted successfully:", response.data);
      // After deletion, fetch notes again to update the list
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Container className={styles.container}>
      <Row className='mt-3'>
        <Col>
          <h1>Notes</h1>
          <input
            type='text'
            placeholder='Search notes'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`form-control mb-3 ${styles.searchInput}`}
          />
          <ListGroup className={styles.noteList}>
            {filteredNotes.map((note) => (
              <Link key={note.id} href={`/notes/${note.id}`}>
                <ListGroup.Item
                  action
                  className={styles.noteListItem}
                  onClick={() => {}}
                >
                  <div className={styles.noteInfo}>
                    <span className={styles.noteLink}>{note.title}</span>
                    <Link href='/'>
                      <Button
                        variant='danger'
                        className={styles.deleteButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Link>
                  </div>
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
          <Link href='/notes/new'>
            <Button className={`mt-3 ${styles.addNoteButton}`}>Add Note</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
