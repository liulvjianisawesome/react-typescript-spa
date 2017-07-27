const Koa = require('koa')
const send = require('koa-send')
const Router = require('koa-router')
var bodyParser = require('koa-bodyparser')
const fs = require('fs')

const app = new Koa()
app.use(bodyParser())
const router = new Router()

// 获取列表数据
router.get('/api/authorlist', async function (ctx) {
  await send(ctx, 'demo/authorlist.json')
})

// 根据id获取单条记录
router.get('/api/author/:id', async function (ctx) {
  const id = ctx.params.id
  const authorlist = require('./demo/authorlist.json')
  const author = authorlist.data.list[id - 1]
  const authorData = require('./demo/author.json')
  Object.assign(authorData.data, author)
  fs.writeFileSync('./demo/author.json', JSON.stringify(authorData))
  await send(ctx, './demo/author.json')
})

// 添加或编辑数据
router.post('/api/author', async function (ctx) {
  const authorData = ctx.request.body
  const authorlist = require('./demo/authorlist.json')
  let isNew = true
  let curId = 0
  authorlist.data.list.forEach((author) => {
    curId++
    if (author.name == authorData.name) {
      Object.assign(author, authorData)
      isNew = false
    }
  })
  if (isNew) {
    authorlist.data.list.push(Object.assign({}, { id: curId + 1 }, authorData))
  }
  fs.writeFileSync('./demo/authorlist.json', JSON.stringify(authorlist))
  await send(ctx, './demo/authorlist.json')
})

// 删除一条数据
router.delete('/api/author', async function (ctx) {
  const id = parseInt(ctx.request.body.id)
  const authorlist = require('./demo/authorlist.json')
  authorlist.data.list.splice(id - 1, 1)
  for (let i = id - 1; i < authorlist.data.list.length; i++) {
    authorlist.data.list[i].id--
  }
  fs.writeFileSync('./demo/authorlist.json', JSON.stringify(authorlist))
  await send(ctx, './demo/authorlist.json')
})

// genre CRUD 接口
// 获得列表数据
router.get('/api/genres', async function (ctx) {
  await send(ctx, './demo/genrelist.json')
})

// 添加或编辑数据
router.post('/api/genre', async function (ctx) {
  const genreData = ctx.request.body
  const genrelist = require('./demo/genrelist.json')
  let isNew = true
  let curId = 0
  genrelist.data.forEach((genre) => {
    curId++
    if (genre.name == genreData.name) {
      Object.assign(genre, genreData)
      isNew = false
    }
  })
  if (isNew) {
    genrelist.data.push(Object.assign({}, { id: curId + 1 }, genreData))
  }
  fs.writeFileSync('./demo/genrelist.json', JSON.stringify(genrelist))
  await send(ctx, './demo/genrelist.json')
})

// 删除数据
router.delete('/api/genre', async function (ctx) {
  const id = parseInt(ctx.request.body.id)
  const genrelist = require('./demo/genrelist.json')
  genrelist.data.splice(id - 1, 1)
  for (let i = id - 1; i < genrelist.data.length; i++) {
    genrelist.data[i].id--
  }
  fs.writeFileSync('./demo/genrelist.json', JSON.stringify(genrelist))
  await send(ctx, './demo/1.json')
})

// book CRUD 接口
// 获得列表数据
router.get('/api/booklist', async function (ctx) {
  await send(ctx, './demo/booklist.json')
})


// 获取单条数据
router.get('/api/book/:id', async function (ctx) {
  const id = ctx.params.id
  const booklist = require('./demo/booklist.json')
  const book = booklist.data.list[id - 1]
  const bookData = require('./demo/book.json')
  Object.assign(bookData.data, book)
  fs.writeFileSync('./demo/book.json', JSON.stringify(bookData))
  await send(ctx, './demo/book.json')
})

// 添加或编辑数据
router.post('/api/book', async function (ctx) {
  const bookData = ctx.request.body
  const booklist = require('./demo/booklist.json')
  let isNew = true
  let curId = 0
  booklist.data.list.forEach((book) => {
    curId++
    if (book.id == bookData.id) {
      Object.assign(book, bookData)
      isNew = false
    }
  })
  if (isNew) {
    booklist.data.list.push(Object.assign({}, { id: curId + 1 }, bookData))
  }
  fs.writeFileSync('./demo/booklist.json', JSON.stringify(booklist))
  await send(ctx, './demo/booklist.json')
})

app.use(router.routes())

app.listen(4000, function () {
  console.log('server running on http://localhost:4000')
})
