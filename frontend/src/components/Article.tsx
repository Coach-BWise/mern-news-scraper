import { useState } from "react";
import { Article as ArticleModel } from "../models/article";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./article.css";
import axios from "axios";
import { toast } from "react-toastify";

interface ArticleProps {
  article: ArticleModel;
  page: string;
  refresh: () => void;
}

const baseUrl = process.env.REACT_APP_BASE_API_ROOT_DIR
  ? process.env.REACT_APP_BASE_API_ROOT_DIR
  : "";

const Article = ({ article, page, refresh }: ArticleProps) => {
  const { _id, title, link, time, topic } = article;
  const tooltipBody = (
    <Tooltip id="tooltip">
      <span>Viewed</span>
    </Tooltip>
  );
  const tooltip = (
    <OverlayTrigger placement="top" overlay={tooltipBody}>
      <i className="fa-solid fa-eye" style={{ color: "#ff4da6" }}></i>
    </OverlayTrigger>
  );

  function tooltipHandler() {
    if (clicked === "true") {
      return tooltip;
    }
  }

  function getInitialState(): string | null {
    return localStorage.getItem(`ViewedArticle${_id}`);
  }

  function setViewedArticle(option: string) {
    localStorage.setItem(`ViewedArticle${_id}`, option.toString());
    setClicked(option);
  }

  function saveArticle() {
    axios.patch(`${baseUrl + "/" + _id}`, article).then(() => {
      refresh();
      toast.success(`Article was Saved!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    });
  }

  function deleteArticle() {
    axios.delete(`${baseUrl + "/" + _id}`).then(() => {
      refresh();
      toast.error(`Article was Deleted!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    });
  }

  const [clicked, setClicked] = useState(getInitialState());

  return (
    <Card className="h-100">
      <Card.Header className="h-100">{title}</Card.Header>
      <Card.Body className="d-flex justify-content-center align-items-center">
        {tooltipHandler()}
        <Button
          onClick={() => setViewedArticle("true")}
          variant="secondary"
          href={link}
          target="blank"
        >
          View Article
        </Button>
        {page == "home" && (
          <Button onClick={() => saveArticle()}>
            <i className="fa-regular fa-floppy-disk me-2"></i>
            <span>Save</span>
          </Button>
        )}
        {page == "saved" && (
          <Button onClick={() => deleteArticle()} variant="danger">
            <i className="fa-solid fa-trash-can me-2"></i>
            <span>Delete</span>
          </Button>
        )}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <p>{topic}</p>
        <p>{time}</p>
      </Card.Footer>
    </Card>
  );
};

export default Article;
