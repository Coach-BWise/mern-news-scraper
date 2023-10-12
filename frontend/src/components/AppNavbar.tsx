import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./appNavbar.css";
import { Article as ArticleModel } from "../models/article";
import axios from "axios";

interface NavbarProps {
  setArticles: React.Dispatch<React.SetStateAction<ArticleModel[]>>;
  scrapeOption: boolean;
}

const baseUrl = process.env.REACT_APP_BASE_API_ROOT_DIR
  ? process.env.REACT_APP_BASE_API_ROOT_DIR
  : "";

const AppNavbar = ({ setArticles, scrapeOption }: NavbarProps) => {
  async function handleScrape() {
    await axios.delete(baseUrl);

    (await axios.post(baseUrl + "/scrape").then((response) => {
      setArticles(response.data);
    })) as ArticleModel[];
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Mongo Scraper</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/saved">Saved Articles</Nav.Link>
          {scrapeOption && (
            <Nav.Link onClick={handleScrape}>Scrape New Articles</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
