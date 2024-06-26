import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(
    session({
        secret: 'asdfasdfasfd',
        saveUninitialized: true,
        resave: false
    })
)
nunjucks.configure('views', {
    autoescape: true,
    express: app,
})

app.get('/', (req, res) => {
    console.log(req.session)
    if(req.session.email){
        res.render('index.html.njk', {email: req.session.email})
    }
    else{
        res.render('index.html.njk')
    }
    
})

app.get('/login', (req, res) => {
    res.render('login.html.njk')
})

app.post('/dashboard', (req,res) => {
    //console.log(req.body)
    const email = req.body.email
    req.session.email = email
    res.render('dashboard.html.njk')
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err)
        }
        else{
            res.redirect('/')
        }
    })
})

app.listen(4545, () => console.log(`Take us to warp ${4545}`))



