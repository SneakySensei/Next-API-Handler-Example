import createHttpError from "http-errors";
import * as Yup from "yup";

import { NextApiHandler } from "next";

import { apiHandler } from "utils/api";
import { validateRequest } from "utils/yup";

// Fake DB to demonstrate the API
const BLOG_DB = [
  {
    id: 1,
    title: "Top 10 anime betrayals",
    content: "Lorem ipsum dolor sit amet ....",
    publishedTimestamp: 1665821111000,
  },
];

type GetResponse = {
  data: typeof BLOG_DB | typeof BLOG_DB[number];
};

/**
 * returns all articles or the article with the given id if query string is provided
 */
const getArticle: NextApiHandler<GetResponse> = async (req, res) => {
  const { id } = req.query;
  if (id) {
    // find and return article with given id
    const article = BLOG_DB.find((article) => article.id === Number(id));

    if (!article)
      throw new createHttpError.NotFound(`Article with id ${id} not found!`);
    // OR
    // if (!article) throw new createHttpError[404](`Article with id ${id} not found!`)
    res.status(200).json({ data: article });
  } else {
    res.status(200).json({ data: BLOG_DB });
  }
};

type PostResponse = {
  data: typeof BLOG_DB[number];
  message: string;
};

const postArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
  content: Yup.string()
    .required("Content is required!")
    .max(
      5000,
      ({ max }) => `Character limit exceeded! Max ${max} characters allowed!`
    ),
  publishedTimestamp: Yup.number()
    .required("Published timestamp is required!")
    .lessThan(Date.now(), "Published timestamp cannot be in the future!"),
});

const createArticle: NextApiHandler<PostResponse> = async (req, res) => {
  const data = validateRequest(req.body, postArticleSchema);
  const newArticle = { ...data, id: BLOG_DB.length + 1 };
  BLOG_DB.push(newArticle);

  res
    .status(201)
    .json({ data: newArticle, message: "Article created successfully!" });
};

type DeleteResponse = {
  data: typeof BLOG_DB[number];
  message: string;
};

const deleteArticleById: NextApiHandler<DeleteResponse> = async (req, res) => {
  const { id } = req.query;

  if (!id) throw new createHttpError.BadRequest("Article id is required!");

  const articleIndex = BLOG_DB.findIndex(
    (article) => article.id === Number(id)
  );

  if (articleIndex < 0)
    throw new createHttpError.NotFound(`Article with id ${id} not found!`);

  BLOG_DB.splice(articleIndex, 1);

  res.status(200).json({
    data: BLOG_DB[articleIndex],
    message: "Article deleted successfully!",
  });
};

export default apiHandler({
  GET: getArticle,
  POST: createArticle,
  DELETE: deleteArticleById,
});
