var mongoose =require("mongoose")

var devicesSchema = new mongoose.Schema({
    deviceName:String,
    deviceType:String,
    ownerName:String,
    batteryStatus:Number
})

module.exports = mongoose.model('Devices',devicesSchema)