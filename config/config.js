let env = process.env.NODE_ENV || 'dev'   // 1
let mongodb_uri = 'mongodb://localhost:27017/ShoppingCartDB'
process.env.MONGODB_URI = mongodb_uri
process.env.PORT = 5000;
