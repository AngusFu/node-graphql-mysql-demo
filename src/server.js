const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-bodyparser');
const { graphqlKoa } = require('graphql-server-koa');

const Schema = require('./Schema');

const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;

app.use(KoaBody());
router.post('/graphql', graphqlKoa({ schema: Schema }));
router.get('/graphql', graphqlKoa({ schema: Schema }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
