import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Article as ArticleModel } from "../models/article";
import Article from "../components/Article";
import AppNavbar from "../components/AppNavbar";
import Jumbotron from "../components/Jumbotron";
import axios from "axios";
import { toast } from "react-toastify";

const HomePage = () => {
  const [articles, setArticles] = useState<ArticleModel[]>([]);

  async function getArticles() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_API_ROOT_DIR + "/false"
      );
      const articles = response.data as ArticleModel[];
      setArticles(articles);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  useEffect(() => {
    toast.promise(
      getArticles(),
      {
        pending: "Grabbing Articles from DB...",
        success: "Articles Loaded!",
        error: "Error Occurred while trying to get articles!",
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
  }, []);

  return (
    <Container>
      <AppNavbar
        setArticles={setArticles}
        scrapeOption={true}
        articles={articles}
      />
      <Jumbotron />
      {articles.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-4 mt-1">
          {articles.map((article) => (
            <Col key={article._id}>
              <Article refresh={getArticles} article={article} page="home" />
            </Col>
          ))}
        </Row>
      )}
      {articles.length == 0 && (
        <Card
          style={{
            textAlign: "center",
            marginTop: "3rem",
            fontSize: "2rem",
          }}
        >
          <Card.Header>No Current Articles</Card.Header>
          <Card.Body>Click "Scrape New Articles" Above.</Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default HomePage;
