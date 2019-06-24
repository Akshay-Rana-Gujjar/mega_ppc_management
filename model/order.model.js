var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

var orderSchema = new mongoose.Schema({
    order_date : String,
    order_date_timestamp : Number,
    delivery_date: String,
    delivery_date_timestamp: Number,
    mkt: String,
    customer_name: String,
    grade: String,
    sup_condi: String,
    rate: Number,
    size: String,
    piece: String,
    ob: String,
    des: String,
    bal: String,
    gt: String,
    product: String,
    quantity: String,
    po_no: String,
    po_date: String,
    po_date_timestamp: Number,
    pyt : String,
    frtg: String,
    remarks: String,
    approval :{type : Boolean, default : false},
    onhold :{type : Boolean, default : false},
    status : String
});

orderSchema.pre("save", function(next){

    this.bal=this.ob=this.quantity;
    this.des = 0;
    this.status = "not approval"
    this.order_date_timestamp = new Date(this.order_date).getTime()
    this.delivery_date_timestamp = new Date(this.delivery_date).getTime()
    this.po_date_timestamp = new Date(this.po_date).getTime()
    next();
});

var Order = mongoose.model('orders',orderSchema);

module.exports = Order;