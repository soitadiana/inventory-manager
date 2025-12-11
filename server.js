const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); 

// Database Connection
mongoose.connect('mongodb+srv://diana:iansane333@cluster0.kyllmlr.mongodb.net/inventoryDB?appName=Cluster0')
.then(() => console.log("Connected to MongoDB Cloud"))
.catch(err => console.error("DB Connection Error:", err));

// Database Schema
const ItemSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    price: Number,
    supplier: String
});

const Item = mongoose.model('Item', ItemSchema);

// Routes with Error Logging

// 1. CREATE
app.post('/api/items', async (req, res) => {
    try {
        console.log("Received Data:", req.body); // This will print what you typed!
        const newItem = new Item(req.body);
        await newItem.save();
        console.log("Item Saved Successfully!");
        res.json(newItem);
    } catch (err) {
        console.error("SAVE FAILED:", err.message); // This prints the error!
        res.status(500).json({ error: err.message });
    }
});

// 2. READ
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error("FETCH FAILED:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 3. DELETE
app.delete('/api/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        console.error("DELETE FAILED:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));