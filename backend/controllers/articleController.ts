import { RequestHandler } from "express";
import ArticleModel, { Article } from "../models/Article";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import axios from "axios";
import { load } from "cheerio";

export const getArticles: RequestHandler = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({
      saved: req.params.saved,
    }).exec();
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

interface InsertManyBody {
  title?: string;
  link?: string;
  topic?: string;
  time?: string;
  saved?: boolean;
}

export const insertScrapedArticles: RequestHandler<
  unknown,
  unknown,
  InsertManyBody[],
  unknown
> = async (req, res, next) => {
  try {
    const articles = ArticleModel.insertMany(req.body);
    res.status(201).json(articles);
  } catch (err) {
    next(err);
  }
};
interface UpdateSavedParams {
  id: string;
}

interface UpdateSavedBody {
  title?: string;
  link?: string;
  topic?: string;
  time?: string;
  saved?: boolean;
}

export const updateSavedArticle: RequestHandler<
  UpdateSavedParams,
  unknown,
  UpdateSavedBody,
  unknown
> = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    if (!isValidObjectId(articleId)) {
      throw createHttpError(400, "Invalid article id");
    }
    if (req.body.saved === undefined) {
      throw createHttpError(400, "Missing saved field parameter");
    }
    await ArticleModel.findByIdAndUpdate(
      articleId,
      { saved: !req.body.saved },
      { new: true }
    ).then((article) => {
      if (!article) {
        throw createHttpError(404, "Article not found");
      }
      res.status(200).json(article);
    });
  } catch (err) {
    next(err);
  }
};
export const deleteAllUnsavedArticles: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    await ArticleModel.deleteMany({ saved: false });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
export const deleteArticle: RequestHandler = async (req, res, next) => {
  const articleId = req.params.id;
  if (!isValidObjectId(articleId)) {
    throw createHttpError(400, "Invalid article id");
  }

  try {
    const article = await ArticleModel.findByIdAndDelete(articleId);
    if (!article) {
      throw createHttpError(404, "Article not found");
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const scrapeNews: RequestHandler = async (req, res, next) => {
  try {
    const articles = await axios.get("https://www.tampabay.com/news");
    let arr: Article[] = [];
    const $ = load(articles.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $(".feed-item .story-item").each(function (i, element) {
      // Save an empty result object
      // Create a new Article using the `result` object built from scraping
      let result: Article = {
        title: $(element).find("a").text(),
        link: "https://tampabay.com" + $(element).find("a").attr("href"),
        topic: $(element).find(".sectionbullet").text().trim(),
        time: $(element).find(".timestamp").text(),
      } as Article;

      if (!result.title) {
        throw createHttpError(
          400,
          "Scraping failed: Missing title field at least one article"
        );
      } else if (!result.link) {
        throw createHttpError(
          400,
          "Scraping failed: Missing link field at least one article"
        );
      }
      arr.push(result);
    });

    let articlesFromDB = await ArticleModel.insertMany(arr);
    res.status(201).json(articlesFromDB);
  } catch (err) {
    next(err);
  }
};
