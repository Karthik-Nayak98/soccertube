import { Model, RestSerializer, Server } from 'miragejs';
import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from './backend/controllers/CategoryController';
import {
  getAllVideosHandler,
  getVideoHandler,
} from './backend/controllers/VideoController';
import { categories } from './backend/db/categories';
import { videos } from './backend/db/videos';
export function makeServer({ environment = 'development' } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      video: Model,
      category: Model,
      user: Model,
      like: Model,
      history: Model,
      playlist: Model,
      watchlater: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      server.logging = false;
      videos.forEach((item) => {
        server.create('video', { ...item });
      });
      categories.forEach((item) => server.create('category', { ...item }));
    },

    routes() {
      this.namespace = 'api';
      this.passthrough('https://sgiefsnhlrnvbruulcwn.supabase.co/***');

      // video routes (public)
      this.get('/videos', getAllVideosHandler.bind(this));
      this.get('/video/:videoId', getVideoHandler.bind(this));

      // TODO: POST VIDEO TO DB

      // categories routes (public)
      this.get('/categories', getAllCategoriesHandler.bind(this));
      this.get('/categories/:categoryId', getCategoryHandler.bind(this));
    },
  });
}
