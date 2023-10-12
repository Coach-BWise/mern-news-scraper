import express from "express";
import * as ArticleController from "../controllers/articleController";

const router = express.Router();

router.get("/:saved", ArticleController.getArticles);

router.post("/", ArticleController.insertScrapedArticles);

router.patch("/:id", ArticleController.updateSavedArticle);

router.delete("/", ArticleController.deleteAllUnsavedArticles);

router.delete("/:id", ArticleController.deleteArticle);

router.post("/scrape", ArticleController.scrapeNews);

export default router;
