const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Razorpay = require("razorpay");

require("dotenv").config();

app.use(express.json());
app.use(cors({
    origin: ["https://tejaswinisales2-api.vercel.app/"],
    methods:["POST","GET","DELETE"],
    credentials:true
}));
app.use(express.urlencoded({extended:false}));

mongoose.connect("mongodb+srv://hbhavsar847:Harshal2004@cluster0.wldqsom.mongodb.net/e-commerce");

//api

app.get("/", (req, res) => {

    res.send("hello world")
})

//Image Storage Engine
const Storage = multer.diskStorage({
    destination: './upload/Images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: Storage })

//creating upload endpoint for image
app.use('/Images', express.static('upload/Images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        Image_url: `http://localhost:${port}/Images/${req.file.filename}`
    })
})

//Schema for creting Products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//creating API for deleting product

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("remote");
    res.json({
        success: true,
        name: req.body.name
    })
})

//creating API for getting all products
app.get('/allproducts', async (req, res) => {

    let products = await Product.find({})
    console.log("all products Fetched");
    res.send(products);
})


// Schema creating for user model

const Users = mongoose.model('Users', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// creating endpoint for registering the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing use found with the same username" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;

    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})

// creating end point for the user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "wrong password" })
        }
    }
    else {
        res.json({ success: false, errors: "wrong email id" })
    }
})

//creating endpoint for newcollection data
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollection fetched");
    res.send(newcollection);
})


//creating end point for the popular
app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({ category: "32", category: "40", category: "43", category: "55" });
    let popular_in_women = products.slice(0.4);
    console.log("popular in women Fetched");
    res.send(popular_in_women);
})

//creaing middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next(); // Pass control to the next middleware function
        } catch (error) {
            return res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
}


app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added" , req.body.itemId);

    try {
        let userData = await Users.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).send({ errors: "User not found" });
        }

        // Assuming cartData is an object with itemIds as keys and quantities as values
        userData.cartData[req.body.itemId] += 1;

        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        res.send("Added");
    } catch (error) {
        console.error(error);
        res.status(500).send({ errors: "Internal Server Error" });
    }
});

// GET endpoint to fetch all user data
app.get('/users', async (req, res) => {
    try {
        let allUserData = await Users.find();
        res.send(allUserData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ errors: "Internal Server Error" });
    }
});

// creating endpoint to remove product from cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed" , req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("removed")
})


//creating endpoint for the storage
app.post('/getcart' , fetchUser , async(req,res)=>{
console.log("Getcart");
let userData = await Users.findOne({_id:req.user.id});
res.json(userData.cartData);

})


// creating endpoint for the razorpay
app.post('/order' , async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(300).send("Error");
        }

        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Error creating order");
    }
});

// Endpoint to receive data
app.post('/submit-data', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    // Here you can process the received data, such as saving it to a database
    res.status(200).json({ message: 'Data received successfully' });
  });


  // Define a schema for the contact form data
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
  });
  
  // Create a model based on the schema
  const Contact = mongoose.model('Contact', contactSchema);
  
  // POST endpoint to handle form submission
  app.post('/api/submitForm', async (req, res) => {
    try {
      // Extract form data from the request body
      const { name, phone, email } = req.body;
  
      // Create a new contact document
      const newContact = new Contact({ name, phone, email });
  
      // Save the contact document to the database
      await newContact.save();
  
      // Respond with a success message
      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Respond with an error message
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// GET endpoint to fetch all contact form submissions
app.get('/api/contactFormSubmissions', async (req, res) => {
    try {
      // Fetch all contact form submissions from the database
      const submissions = await Contact.find();
  
      // Respond with the fetched submissions
      res.status(200).json(submissions);
    } catch (error) {
      console.error('Error fetching contact form submissions:', error);
      // Respond with an error message
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Endpoint to delete a contact form submission by ID
app.delete('/api/contactFormSubmissions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Find the submission by ID and delete it
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact form submission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(port, (error) => {
    if (!error) {
        console.log("server is running on" + port)
    }
    else {
        console.log("Error" + error)
    }
})
