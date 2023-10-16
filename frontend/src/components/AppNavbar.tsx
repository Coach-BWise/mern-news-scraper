import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./appNavbar.css";
import { Article as ArticleModel } from "../models/article";
import axios from "axios";
import { toast } from "react-toastify";

interface NavbarProps {
  setArticles: React.Dispatch<React.SetStateAction<ArticleModel[]>>;
  scrapeOption?: boolean;
  articles?: ArticleModel[];
}

const baseUrl = process.env.REACT_APP_BASE_API_ROOT_DIR
  ? process.env.REACT_APP_BASE_API_ROOT_DIR
  : "";

const AppNavbar = ({ setArticles, scrapeOption, articles }: NavbarProps) => {
  async function handleScrape() {
    if (articles && articles.length > 0) {
      await toast.promise(
        axios.delete(baseUrl),
        {
          pending:
            "Clearing unsaved articles from Database to reload with Scraped Articles...",
          success: "Database Cleared!",
          error: "Error Occurred while trying to delete unsaved articles!",
        },
        {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
    }

    let response = await toast.promise(
      axios.post(baseUrl + "/scrape"),
      {
        pending: "Scraping...",
        success: "Articles Loaded!",
        error: "Scrape Failed!",
      },
      {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      }
    );
    setArticles(response.data);
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Mern Scraper</Navbar.Brand>
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
