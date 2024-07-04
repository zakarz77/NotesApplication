import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "../../styles/NotePage.module.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

const NotePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/notes/${id}`).then((response) => {
        setNote(response.data);
      });
    }
  }, [id]);

  if (!note) return <div>Loading...</div>;

  return (
    <Container>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <div className={styles.buttonContainer}>
        <Link href={`/notes/edit/${note.id}`}>
          <Button>Edit Note</Button>
        </Link>
        <Link href='/'>
          <Button>Back</Button>
        </Link>
      </div>
    </Container>
  );
};

export default NotePage;
