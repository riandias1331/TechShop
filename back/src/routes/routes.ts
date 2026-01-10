import { Router } from 'express'
const route: Router = Router()


import * as userControllerMongo from '../controllers/user.mogo.controller'
import * as userControllerPostgres from '../controllers/user.postgres'
import * as auth from '../middlewares/auth'
import validateUser from '../utils/validator'

// Mongo
  //Private Routes
  route.get('/mongo', auth.authMiddleware, userControllerMongo.getUserAll)
  route.get('/mongo/:id', auth.authMiddleware, userControllerMongo.getUser)
  route.put('/mongo/:id', auth.authMiddleware, validateUser, userControllerMongo.updateUser)
  route.delete('/mongo/:id', auth.authMiddleware, userControllerMongo.deleteUser)
  route.delete('/mongo', auth.authMiddleware, userControllerMongo.deleteUserAll)

  //Public Routes
  route.post('/mongo', validateUser, userControllerMongo.createUser)
  route.post('/api/register', validateUser, userControllerMongo.register)
  route.post('/api/login', userControllerMongo.login)


// postgres
  //Private
  route.get("/postgres", auth.authMiddleware, userControllerPostgres.getAllUsers)
  route.get("/postgres/:id", auth.authMiddleware, userControllerPostgres.getUserById)
  route.put("/postgres/:id", auth.authMiddleware, validateUser, userControllerPostgres.updateUser)
  route.delete("/postgres", auth.authMiddleware, userControllerPostgres.deleteAll)
  route.delete("/postgres/:id", auth.authMiddleware, userControllerPostgres.deleteUser)
  
  //Public
  route.post("/postgres", validateUser, userControllerPostgres.createUser)




export default route