const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()

app.use(cors())
app.use(bodyParser.json())

const Device = require("./models/devices")
const mongoUrl = "mongodb+srv://andacozturk:12345@cluster0.lmu4pdb.mongodb.net/?retryWrites=true&w=majority"

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => { console.log("connected to db"); })
    .catch(err => { console.log(err); })

app.post("/device", (req, res) => {
    let newDevice = new Device(req.body);
    newDevice.save()
    console.log('Item Saved');
    res.status(200).json()
})

app.get('/api', async (req, res) => {
    let devices = await Device.find({}, '-__v')
    res.send(devices)
})

app.put('/update', async (req, res) => {
    try {
        await Device.findByIdAndUpdate(req.body._id, {
            deviceName: req.body.deviceName,
            deviceType: req.body.deviceType,
            ownerName: req.body.ownerName,
            batteryStatus: req.body.batteryStatus,
        });
        res.send('Item Updated!');
    } catch (err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
})

app.delete('/delete', async (req, res) => {
    try {
        await Device.findByIdAndDelete(req.body._id);
        res.send('Item Deleted!');
    } catch (err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
})

app.listen(8080)