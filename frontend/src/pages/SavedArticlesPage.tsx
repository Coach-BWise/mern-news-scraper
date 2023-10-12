import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Article as ArticleModel } from "../models/article";
import Article from "../components/Article";
import AppNavbar from "../components/AppNavbar";
import Jumbotron from "../components/Jumbotron";
import axios from "axios";

const SavedArticlesPage = () => {
  const [articles, setArticles] = useState<ArticleModel[]>([]);

  async function getArticles() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/articles/true"
      );
      const articles = response.data as ArticleModel[];
      setArticles(articles);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Container>
      <AppNavbar setArticles={setArticles} scrapeOption={false} />
      <Jumbotron />
      {articles.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-4 mt-1">
          {articles.map((article) => (
            <Col key={article._id}>
              <Article refresh={getArticles} article={article} page="saved" />
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
          <Card.Header>No Saved Articles</Card.Header>
          <Card.Body>
            Click "Home" to Scrape for New Articles and Save.
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default SavedArticlesPage;
