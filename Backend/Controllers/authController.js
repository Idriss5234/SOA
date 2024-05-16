const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://idkr5234:DSos7I5Pail1TuJe@soa.o9omsdr.mongodb.net/?retryWrites=true&w=majority&appName=SOA";
const dbName = "SOA";
const collectionName = "users";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const test = (req, res) => {
    res.json('test is working')
}

// register endpoint
// const registerUser = async (req,res) => {
//     try {
//         const {name, email, password} = req.body
//         //Check if name was entered
//         if(!name) {
//             return res.json({
//                 error: 'name is required'
//             })
//         }
//         // Check if password is good
//         if (!password || password.length < 6) {
//             return res.json({
//                 error: 'Password is required and should be at least 6 characters long'
//             })
//         }
//         //Check email
//         const exist = await User.findOne({email})
//         if (exist) {
//             return res.json({
//                 error: 'Email is already taken'
//             })
//         }

//         const hashedPassword = await hashPassword(password)
//         // Create user in database
//         const user = await User.create({
//             name,
//             email, 
//             password: hashedPassword,
//         })

//         return res.json(user)
//     } catch (error) {
//         console.log(error)
//     }
// }
// Fonction pour enregistrer un nouvel utilisateur
const registerUser = async (req, res) => {
    try {
      await client.connect();
  
      const database = client.db("SOA");
      const collection = database.collection("users"); // Nom de votre collection d'utilisateurs
  
      const { name, email, password } = req.body;
  
      // Vérification des champs requis
      if (!name) {
        return res.json({ error: 'Le nom est requis' });
      }
  
      if (!password || password.length < 6) {
        return res.json({ error: 'Le mot de passe est requis et doit comporter au moins 6 caractères' });
      }
  
      // Vérification de l'existence de l'email dans la base de données
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.json({ error: 'Cet email est déjà utilisé' });
      }
  
      // Hachage du mot de passe
      // const hashedPassword = await hashPassword(password);
  
      // Création d'un nouvel utilisateur dans la base de données
      const newUser = {
        name,
        email,
        password
      };
  
      const result = await collection.insertOne(newUser);
      console.log("Utilisateur enregistré avec succès:", result.insertedId);
  
      // Retourner les détails de l'utilisateur créé
      res.json({
        _id: result.insertedId,
        name: newUser.name,
        email: newUser.email
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
      res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    } finally {
      // Fermeture de la connexion à la base de données
      await client.close();
    }
  };
  
  module.exports = registerUser;

//login endpoint
// const loginUser = async (req,res) => {
// try {
//     const {email, password}= req.body

//     // Check if user exists
//     const user = await User.findOne({email})
//     if(!user) {
//         return res.json({
//             error: 'No user found'
//         })
//     }

//     //check if passwords match
//     const match = await comparePassword(password, user.password)
//     if(match) {
//         jwt.sign({email: user.email, id: user._id, name: user.name}, '12345678', {}, (err,token) => {
//             if(err) throw err
//             res.cookie('token',token).json(user)
//         })
//     }
//     if(!match) {
//         res.json({
//             error: "Passwords do not match"
//         })
//     }

// } catch (error) {
//     console.log(error)
// }
// }
const loginUser = async (req, res) => {
    try {
      await client.connect();
  
      const database = client.db("SOA");
      const collection = database.collection("users"); // Nom de votre collection d'utilisateurs
  
      const { email, password } = req.body;
  
      // Recherche de l'utilisateur par email
      const user = await collection.findOne({ email });
      if (!user) {
        return res.json({ error: 'Aucun utilisateur trouvé' });
      }
  
      // Vérification du mot de passe
      // const isMatch = await comparePassword(password, user.password);
      if (password === user.password) {
        // Génération du jeton JWT
        const token = jwt.sign({ email: user.email, id: user._id, name: user.name }, '12345678');
  
        // Envoi du jeton JWT dans un cookie et des détails de l'utilisateur en réponse JSON
        res.cookie('token', token).json({
          _id: user._id,
          name: user.name,
          email: user.email
        });
      } else {
        // En cas de non-correspondance du mot de passe
        res.json({ error: "Les mots de passe ne correspondent pas" });
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification de l'utilisateur:", error);
      res.status(500).json({ error: 'Erreur lors de l\'authentification de l\'utilisateur' });
    } finally {
      // Fermeture de la connexion à la base de données
      await client.close();
    }
  };

const getProfile= (req,res) => {
    const {token} =req.cookies
    if(token) {
        jwt.verify(token,'12345678',{},(err,user) => {
            if(err) throw err
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}