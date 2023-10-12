import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Article as ArticleModel } from "../models/article";
import Article from "../components/Article";
import AppNavbar from "../components/AppNavbar";
import Jumbotron from "../components/Jumbotron";
import axios from "axios";

const HomePage = () => {
  const [articles, setArticles] = useState<ArticleModel[]>([]);

  async function getArticles() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/articles/false"
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
      <AppNavbar setArticles={setArticles} scrapeOption={true} />
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