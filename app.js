const express = require('express');
const AppError = require('./utils/appError');
const globleErrorHandling = require('./utils/globleErrorHandling')
const dotenv = require('dotenv');
const productRouter = require('./router/productRouter')
const userRouter = require('./router/userRouter')
const cartRouter = require('./router/cartRouter')
const  mongoose  = require('mongoose');


const app = express();
app.use(express.json({limit: '10kb'}))

dotenv.config ({path: './config.env'});
const db = process.env.DATABASE_LOCAL;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('db connected'))
    .catch(() => console.error('db not connected'));

    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/cart', cartRouter)



    app.all('*', (req, res, next) => {
        return next(new AppError(`can't find ${req.originalUrl} on this server`));
    })
    

app.use(globleErrorHandling)

app.listen(7001, () => {
    console.log('server running on port no.7001');
})