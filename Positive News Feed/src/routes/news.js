const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')
const bcrypt = require('bcrypt')

const users = []

newsRouter.get('', async(req, res) => {
    try {
        const newsAPI = await axios.get(`http://localhost:3001/api/posts`)
        res.render('news', { articles : newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('news', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('news', { articles : null })
            console.log(err.request)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    }
})

newsRouter.get('/:id', async(req, res) => {

    let articleID = req.params.id

    try {
        const newsAPI = await axios.get(`http://localhost:3001/api/posts${articleID}`)
        res.render('newsSingle', { article : newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSingle', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('newsSingle', { article : null })
            console.log(err.request)
        } else {
            res.render('newsSingle', { article : null })
            console.error('Error', err.message)
        }
    }
})

newsRouter.post('', async(req, res) => {

    let search = req.body.search

    try {
        const newsAPI = await axios.get(`http://localhost:3001/api/posts${search}`)
        res.render('newsSearch', { articles : newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('newsSearch', { articles : null })
            console.log(err.request)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    }
})

// AUTH PAGE

newsRouter.get("/auth/:method?", function(req, res, next){

    if (req.params.method == "login" || req.params.method == "signin"){
        res.render("auth", {method: "login"})
    } else if (req.params.method == "signup" || req.params.method == "register"){
        res.render("auth", {method: "signup"})
    }

})



newsRouter.post("/auth/:method?", async function(req, res, next){

    if (req.params.method == "login" || req.params.method == "signin"){
    

    } else if (req.params.method == "signup" || req.params.method == "register"){
        
        

        try{
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            users.push({
                name: req.body.text,
                password: hashedPassword
            })
            res.redirect('/login')

        }catch{

            res.redirect('/signup')
        }
        console.dir(users)



    }

})



module.exports = newsRouter