import "./notFoundPage.css";
import { Button } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <div>
      <div className="notFoundContainer">
        <img className="ops" src="/404.svg" />
        <br />
        <h3 className="mt-3">The webpage you are looking for is not found</h3>
        <br />
        <Button variant="secondary" className="button" href="/">
          Return To HomePage
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
