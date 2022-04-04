import express from "express";
const router = express.Router();
import {
  getMovieById,
  createMovies,
  updateMovieById,
  deleteMovieById,
  getAllMovies,
} from "../helper.js";

router.get("/", async function (request, response) {
  // find give cursor that is pagination, convert to array (toArray)
  //find()  it retrieve all movies 135 movies from db
  //filter | find
  const movies = await getAllMovies();
  response.send(movies);
});

router.put("/:id", async function (request, response) {
  console.log(request.params);
  //db.movies.updateOne({id:"101"}, {$set: updatedata}) //  mongodb cmd
  const { id } = request.params;
  const updatedata = request.body;
  const result = await updateMovieById(id, updatedata);
  response.send(result);
});

router.delete("/:id", async function (request, response) {
  console.log(request.params);
  //filter | find
  //db.movies.deleteOne({id:"101"}) // this is in mongodb
  const { id } = request.params;
  //const movie = movies.find((mv) => mv.id === id);
  const result = await deleteMovieById(id);
  response.send(result);
});

router.get("/:id", async function (request, response) {
  console.log(request.params);
  //filter | find
  const { id } = request.params;
  //const movie = movies.find((mv) => mv.id === id);
  const movie = await getMovieById(id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ Message: "No such Movie Found🌝" });
});

router.post("/", async function (request, response) {
  //db.movies.insertMany(data)
  const data = request.body;
  console.log(data);
  const result = await createMovies(data);
  response.send(result);
});

export const moviesRouter = router;
