const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const TOKEN_SECRET = process.env.JWT_SECRET || 'your_secret_key';  // Use environment variable for production
//const bcrypt = require('bcrypt'); // If using bcrypt



// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors()); // Allow Cross-Origin requests
app.use(express.json()); // Parse JSON bodies

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    if (req.method !== 'GET') {
        console.log('Request body:', req.body); // Log the request body for non-GET requests
    }
    next();
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/billing-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        
        console.log('MongoDB connected');
        seedAdmin(); // Seed admin after successful connection
        seedStaff();
        })
        
    .catch((err) => console.error('Error connecting to MongoDB:', err));
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
    });

const adminSchema = new mongoose.Schema({
        name:{type: String},
        admin_id: {type: String, unique:true},
        password: {type: String}
        
    });
const staffSchema = new mongoose.Schema({
        staffName:{type: String, required: true},
        staff_id: {type: String,required: true, unique:true},
        password: {type: String,required: true},
        active: { type: Boolean, default: true }  // New field to indicate active/deactivated
    });
// Define an Order Schema and Model
const orderSchema = new mongoose.Schema({
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    date: { type: Date, required: true },  // Make the date field required
    location: { type: String, required: true },  // Make location required
    payment: { type: String, required: true },  // Make payment required
    serviceType: {type: String, required: true},
    totalAmount: { type: Number, required: true },
    orderNumber: { type: Number, required: true },  // Add the orderNumber field
    time: {type: Date,default: Date.now },  // Field for storing order time
    invoiceNumber: {type: String}  // New field for invoice number
});
orderSchema.index({ orderNumber: 1, date: 1, location: 1 }, { unique: true });

// Middleware to generate invoice number before saving
orderSchema.pre('save', async function (next) {
    const order = this;
    
    // Example logic to generate invoice number
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2); // Last two digits of the year
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Zero-padded month
    const day = ('0' + currentDate.getDate()).slice(-2); // Zero-padded day
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number

    // Example invoice number format: YYMMDD-RANDOM
    order.invoiceNumber = `${year}${month}${day}-${uniqueSuffix}`;

    next();
});

// Define the Cancel schema
const cancelSchema = new mongoose.Schema({
    items: [
        {
            name: { type: String },
            quantity: { type: Number },
            price: { type: Number }
        }
    ],
    date: { type: Date, required: true },  // Make the date field required
    location: { type: String, required: true },  // Make location required
    payment: { type: String, required: true },  // Make payment required
    serviceType: {type: String, required: true},
    totalAmount: { type: Number, required: true },
    orderNumber: { type: Number, required: true },  // Add the orderNumber field
    time: { type: String, required:true },  // Field for storing order time
    invoiceNumber: {type: String}  // New field for invoice number
});


// Create the Cancel model
const cancel = mongoose.model('cancel', cancelSchema);
const admin = mongoose.model('admin', adminSchema);
const staff = mongoose.model('staff', staffSchema);
const Order = mongoose.model('Order', orderSchema);

const seedAdmin = async () => {
    try {
        // Hardcoded admin credentials
        const admin_id = "mrveg@gmail.com"; 
        const adminPassword = "password123";

        // Check if the admin already exists
        const existingAdmin = await admin.findOne({ admin_id });
        if (!existingAdmin) {
            // Hash the admin password using bcryptjs
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            // Create and save new admin
            const newAdmin = new admin({
                name: 'Mr. Veg',
                admin_id,
                password: hashedPassword
            });

            await newAdmin.save();
            console.log('Admin user created with default credentials');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

const seedStaff = async () => {
    try {
        // Hardcoded admin credentials
        const staff_id = "mrvegKadma@gmail.com"; 
        const staffPassword = "password123";
        const active = true;

        // Check if the admin already exists
        const existingStaff = await staff.findOne({ staff_id });
        if (!existingStaff) {
            // Hash the staff password using bcryptjs
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(staffPassword, salt);

            // Create and save new admin
            const newStaff = new staff({
                staffName: 'Mr. Veg Kadma',
                staff_id,
                password: hashedPassword,
                active
            });

            await newStaff.save();
            console.log('Staff user created with default credentials');
        } else {
            console.log('Staff user already exists');
        }
    } catch (error) {
        console.error('Error seeding staff:', error);
    }
};

app.post('/api/staff/login', async (req, res) => {
    const { staff_id, staffPassword } = req.body;

    try {
        // Check if the staff exists
        const existingStaff = await staff.findOne({ staff_id });
        if (!existingStaff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        // Check if the staff account is active
        if (!existingStaff.active) {
            return res.status(403).json({ message: "This account has been deactivated. Please contact your admin." });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(staffPassword, existingStaff.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If you want to use JWT for authentication, generate a token here
        const token = jwt.sign({ staff_id: existingStaff.staff_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token, staffName: existingStaff.staffName });
    } catch (error) {
        console.error('Error during staff login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/orders/canceled', async (req, res) => {
    try {
        // Fetch all canceled orders from the Cancel collection
        const canceledOrders = await cancel.find();

        /*if (canceledOrders.length === 0) {
            return res.status(404).json({ message: 'No canceled orders found' });
        }*/

        // Return the canceled orders
        res.status(200).json(canceledOrders);
    } catch (error) {
        console.error('Error fetching canceled orders:', error);
        res.status(500).json({ message: 'Error fetching canceled orders', error });
    }
});

// Assuming you already have the necessary imports like express, mongoose, etc.

app.get('/api/staff', async (req, res) => {
    try {
        // Fetch all staff members from the database
        const staffList = await staff.find();  // Fetch all documents from the 'staff' collection

        // Send the list of staff members back to the frontend
        res.status(200).json(staffList);
    } catch (error) {
        console.error('Error fetching staff list:', error);
        res.status(500).json({ message: 'Error fetching staff list', error });
    }
});


// GET /api/orders - Fetch filtered orders based on date, month, location, and payment method
app.get('/api/orders', async (req, res) => {
    const { date, location, payment, month, orderNumber } = req.query;  // Get date, month, location, and payment from query parameters

    try {
        let query = {};

        // If date is provided, filter by date (assuming the date is in ISO format)
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999); // Include the whole day

            query.date = { $gte: startDate, $lte: endDate };
        }

        // If month is provided, filter by the entire month
        if (month) {
            const [year, monthNumber] = month.split('-');
            const startOfMonth = new Date(year, monthNumber - 1, 1); // First day of the month
            const endOfMonth = new Date(year, monthNumber, 0, 23, 59, 59, 999); // Last day of the month

            query.date = { $gte: startOfMonth, $lte: endOfMonth }; // Query for entire month
        }

        // If location is provided, filter by location
        if (location) {
            query.location = location;
        }

        // If payment method is provided, filter by payment
        if (payment) {
            query.payment = payment;
        }
        if (orderNumber) {
            query.orderNumber = orderNumber;
        }

        console.log('MongoDB query:', query);

        // Find orders that match the query
        const orders = await Order.find(query);
        // Format the time in 24-hour format for each order
        const formattedOrders = orders.map(order => {
            const formattedTime = new Date(order.time).toLocaleTimeString('en-GB', { hour12: false });  // Format time in HH:mm:ss
            return {
                ...order._doc,  // Spread the existing order fields
                time: formattedTime  // Add the formatted time
            };
        });
        res.json(formattedOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

// GET /api/orders - Fetch filtered orders based on date, month, location, and payment method
app.get('/api/orders/cancel', async (req, res) => {
    const { date, location, payment, month, orderNumber } = req.query;  // Get date, month, location, and payment from query parameters

    try {
        let query = {};

        // If date is provided, filter by date (assuming the date is in ISO format)
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999); // Include the whole day

            query.date = { $gte: startDate, $lte: endDate };
        }

        // If month is provided, filter by the entire month
        if (month) {
            const [year, monthNumber] = month.split('-');
            const startOfMonth = new Date(year, monthNumber - 1, 1); // First day of the month
            const endOfMonth = new Date(year, monthNumber, 0, 23, 59, 59, 999); // Last day of the month

            query.date = { $gte: startOfMonth, $lte: endOfMonth }; // Query for entire month
        }

        // If location is provided, filter by location
        if (location) {
            query.location = location;
        }

        // If payment method is provided, filter by payment
        if (payment) {
            query.payment = payment;
        }
        if (orderNumber) {
            query.orderNumber = orderNumber;
        }

        console.log('MongoDB query:', query);

        // Find orders that match the query
        const canceledOrders = await cancel.find(query);
        // Format the time in 24-hour format for each canceled order
        const formattedCanceledOrders = canceledOrders.map(order => {
            const formattedTime = new Date(order.time).toLocaleTimeString('en-GB', { hour12: false });  // Format time in HH:mm:ss
            return {
                ...order._doc,  // Spread the existing order fields
                time: formattedTime  // Add the formatted time
            };
        });
        res.json(formattedCanceledOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});


app.delete('/api/orders/cancel', async (req, res) => {
    const { orderNumber, date, location } = req.body;

    try {
        if (!orderNumber || !date || !location) {
            return res.status(400).json({ message: 'Missing orderNumber, date, or location' });
        }

        // Log the incoming request body for debugging
        console.log('Request Data:', req.body);

        // Parse the date and get the start and end of the day
        const orderDate = new Date(date);
        const startOfDay = new Date(orderDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(orderDate.setHours(23, 59, 59, 999));

        // Log the query that will be used to find the order
        console.log('Finding order with query:', {
            orderNumber: orderNumber,
            location: location,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        // Find the specific order that matches orderNumber, date, and location
        const orderToCancel = await Order.findOne({
            orderNumber: orderNumber,
            location: location,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        // Log the found order for debugging
        console.log('Order to cancel:', orderToCancel);

        if (!orderToCancel) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Capture the current time when the order is being canceled
        const cancelTime = new Date();
        const formattedCancelTime = cancelTime.toLocaleTimeString('en-GB', { hour12: false });

        // Log cancel time for debugging
        console.log('Formatted Cancel Time:', formattedCancelTime);

        // Copy the order to the Cancel collection before deleting
        const canceledOrder = new cancel({
            orderNumber: orderToCancel.orderNumber,
            date: orderToCancel.date,
            location: orderToCancel.location,
            payment: orderToCancel.payment,
            serviceType: orderToCancel.serviceType,
            items: orderToCancel.items,
            totalAmount: orderToCancel.totalAmount,
            invoiceNumber: orderToCancel.invoiceNumber,
            time: formattedCancelTime
        });

        // Save the copied order to the Cancel collection
        await canceledOrder.save();

        // Log the canceled order
        console.log('Canceled order saved:', canceledOrder);

        // Delete the specific order that matches orderNumber, date, and location
        const deletedOrder = await Order.findOneAndDelete({
            orderNumber: orderNumber,
            location: location,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        // Log the deleted order for debugging
        console.log('Deleted order:', deletedOrder);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found after saving to canceled orders' });
        }

        res.status(200).json({ 
            message: 'Order canceled successfully', 
            canceledOrder,
            cancelTime: formattedCancelTime
        });
    } catch (error) {
        // Log the error details
        console.error('Error canceling order:', error);
        res.status(500).json({ message: 'Error canceling order', error });
    }
});

// PUT /api/orders/update - Update an order's items based on orderNumber, date, and location
app.put('/api/orders/update', async (req, res) => {
    const { orderNumber, date, location, items } = req.body;

    try {
        if (!orderNumber || !date || !location || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Missing or invalid orderNumber, date, location, or items' });
        }

        const orderDate = new Date(date);
        const startOfDay = new Date(orderDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(orderDate.setHours(23, 59, 59, 999));

        // Recalculate the total amount from the updated items
        const updatedTotalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        
        // Capture the current time from the system/device
        const currentTime = new Date();

        // Format the current time in 24-hour format (HH:mm:ss)
        const updateTime = currentTime.toLocaleTimeString('en-GB', { hour12: false });

        // Find the existing order based on orderNumber, date, and location and update
        const updatedOrder = await Order.findOneAndUpdate(
            {
                orderNumber: orderNumber,
                location: location,
                date: { $gte: startOfDay, $lte: endOfDay }
            },
            {
                $set: {
                    items: items,
                    totalAmount: updatedTotalAmount,
                    time: currentTime  // Update the time
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        console.log('Order updated:', updatedOrder);

        res.status(200).json({
            message: 'Order updated successfully',
            orderId: updatedOrder._id,
            items: updatedOrder.items,
            date: updatedOrder.date,
            location: updatedOrder.location,
            payment: updatedOrder.payment,
            serviceType: updatedOrder.payment,
            totalAmount: updatedOrder.totalAmount,
            orderNumber: updatedOrder.orderNumber,
            invoiceNumber: updatedOrder.invoiceNumber,
            time: updateTime  // Include the formatted time in the response
        });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Error updating order', error });
    }
});


let tokenBlacklist = [];  // In-memory blacklist, consider Redis or a database for production

// Endpoint to activate or deactivate a staff member
app.put('/api/staff/toggle-activation', async (req, res) => {
    const { staff_id, action } = req.body;  // 'activate' or 'deactivate'

    try {
        // Find the staff member by staff_id
        const staffMember = await staff.findOne({ staff_id });

        if (!staffMember) {
            return res.status(404).json({ error: 'Staff member not found' });
        }

        // Update the active status based on the action
        if (action === 'activate') {
            staffMember.active = true;
        } else if (action === 'deactivate') {
            staffMember.active = false;

            // If deactivating, blacklist the staff's current token(s)
            tokenBlacklist.push(staffMember.staff_id);  // Add staff_id to blacklist
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }

        // Save the updated staff status in the database
        await staffMember.save();

        res.status(200).json({ message: `Staff member ${action}d successfully` });
    } catch (error) {
        console.error('Error toggling staff activation:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Token validation middleware (to check if token is blacklisted)
const checkTokenBlacklist = (req, res, next) => {
    const { staff_id } = req.body;  // Assuming the staff ID is part of the request body or token payload

    // Check if the staff_id is in the token blacklist (indicating the user has been deactivated)
    if (tokenBlacklist.includes(staff_id)) {
        return res.status(403).json({ message: 'Account is deactivated. Contact your admin.' });
    }

    next();  // Proceed if not blacklisted
};


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

    try {
        const verified = jwt.verify(token, TOKEN_SECRET);
        
        // Check if the token is in the blacklist
        if (tokenBlacklist.includes(verified.staff_id)) {
            return res.status(403).json({ message: 'Session expired, please log in again.' });
        }

        // Check if the staff account is active
        staff.findOne({ staff_id: verified.staff_id }, (err, staff) => {
            if (err || !staff) return res.status(404).json({ message: "Staff not found" });

            if (!staff.active) {
                return res.status(403).json({ message: 'This account has been deactivated. Please contact your admin.' });
            }

            // Attach staff info to the request object
            req.staff = verified;
            next();
        });
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};


app.get('/api/orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});



app.post('/api/orders/restore', async (req, res) => {
    const { orderId } = req.body;  // Order ID of the canceled order to restore

    try {
        // Find the canceled order by its ID in the cancel collection
        const canceledOrder = await cancel.findById(orderId);

        if (!canceledOrder) {
            return res.status(404).json({ message: 'Canceled order not found' });
        }

        // Insert the canceled order back into the orders collection
        const restoredOrder = await Order.create({
            items: canceledOrder.items,
            date: canceledOrder.date,
            location: canceledOrder.location,
            payment: canceledOrder.payment,
            serviceType: canceledOrder.serviceType,
            totalAmount: canceledOrder.totalAmount,
            orderNumber: canceledOrder.orderNumber,
            invoiceNumber: canceledOrder.invoiceNumber,
        });

        // Remove the order from the cancel collection
        await cancel.findByIdAndDelete(orderId);

        res.status(200).json({ message: 'Order restored successfully', restoredOrder });
    } catch (error) {
        console.error('Error restoring order:', error);
        res.status(500).json({ message: 'Error restoring order', error });
    }
});
// here staff is indicating the branch, both are indicating the same thing
app.post('/api/staff/add-staff', async (req, res) => {
    try {
      console.log('Request Body:', req.body);  // Log the request body to verify incoming data
  
      const { staffName, staff_id, staffPassword } = req.body;
  
      // Check if branchID already exists
      const existingStaff = await staff.findOne({ staff_id });
      if (existingStaff) {
        console.log('Branch ID already exists');
        return res.status(400).json({ error: 'Branch ID already exists' });
      }
  
      console.log('Branch ID is unique, proceeding...');
      
      // Hash the staff password using bcryptjs
      const salt = await bcrypt.genSalt(10);
      console.log('Salt generated:', salt);
      const hashedPassword = await bcrypt.hash(staffPassword, salt);
      console.log('Password hashed:', hashedPassword);
  
      // Create new branch
      const newStaff = new staff({
        staffName,
        staff_id,
        password: hashedPassword
      });
  
      const savedStaff = await newStaff.save();
      console.log('Branch saved:', savedStaff);
  
      res.status(201).json({ message: 'Branch created successfully' });
    } catch (error) {
      console.error('Server Error during branch creation:', error);
      res.status(500).json({ error: 'Failed to create branch' });
    }
});

app.post('/api/staff/remove-staff', async (req, res) => {
    
    try {
        const { staff_id, staffPassword } = req.body;
        // Check if the branch exists
        const existingStaff = await staff.findOne({ staff_id });
        if (!existingStaff) {
            return res.status(404).json({ message: "Branch not found" });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(staffPassword, existingStaff.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If credentials match, delete the branch
        await staff.deleteOne({ staff_id });
        res.status(200).json({ message: "Branch removed successfully" });
    } catch (error) {
        console.error('Error removing branch:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


  
app.post('/api/orders', async (req, res) => {
    try {
        console.log('Incoming data:', JSON.stringify(req.body, null, 2));
        const { items, date, location, payment, serviceType } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid items array' });
        }

        // Calculate the total amount for the order
        const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const orderDate = new Date(date);
        const startOfDay = new Date(orderDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(orderDate.setHours(23, 59, 59, 999));

        // Get the count of orders for the specific location and date
        const orderCountForLocationToday = await Order.countDocuments({
            date: { $gte: startOfDay, $lte: endOfDay },
            location: location  // Count orders only for the given location
        });

        // Increment order number for the new order (starting from 1 for each location)
        const orderNumber = orderCountForLocationToday + 1;
        // Capture the current time from the system/device
        const currentTime = new Date();
        // Format time in 24-hour format (HH:mm:ss)
        const orderTime = currentTime.toLocaleTimeString('en-GB', { hour12: false });
        // Create a new order
        const newOrder = new Order({
            items,
            date: orderDate,
            location,
            payment,
            serviceType,
            totalAmount,
            orderNumber,  // Set the order number
            time: currentTime,  // Set the current time
        });

        const savedOrder = await newOrder.save();
        console.log('Order saved:', savedOrder);

        res.status(201).json({
            message: 'Order created successfully',
            orderId: savedOrder._id,
            items: savedOrder.items,  
            time: orderTime,  // Include the order time in the response
            location: savedOrder.location,
            payment: savedOrder.payment,
            serviceType: savedOrder.serviceType,
            totalAmount: savedOrder.totalAmount,
            orderNumber: savedOrder.orderNumber,  // Include the order number in the response
            date: savedOrder.date,
            invoiceNumber: savedOrder.invoiceNumber,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error });
    }
});
app.post('/api/admin/login', async (req, res) => {
    const { admin_id, password } = req.body;

    try {
        // Check if admin exists
        const existingAdmin = await admin.findOne({ admin_id });
        if (!existingAdmin) {
            console.log("Admin not found with admin_id:", admin_id);
            return res.status(404).json({ message: "Admin not found" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, existingAdmin.password);
        if (!isMatch) {
            console.log("Invalid password for admin_id:", admin_id);
            return res.status(400).json({ message: "Invalid ID or Password" });
        }

        // Successful login
        console.log("Admin login successful for admin_id:", admin_id);

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// PUT /api/admin/change-password - Change Admin Password
app.put('/api/admin/change-password', async (req, res) => {
    const { admin_id, currentPassword, newPassword } = req.body;

    try {
        // Check if admin exists
        const existingAdmin = await admin.findOne({ admin_id });
        if (!existingAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Check if current password is correct
        const isMatch = await bcrypt.compare(currentPassword, existingAdmin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password in the database
        existingAdmin.password = hashedPassword;
        await existingAdmin.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/staff/change-password', async (req, res) => {
    const { staff_id, currentStaffPassword, changeNewStaffPassword } = req.body;

    try {
        // Check if admin exists
        const existingStaff = await staff.findOne({ staff_id });
        if (!existingStaff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        // Check if current password is correct
        const isMatch = await bcrypt.compare(currentStaffPassword, existingStaff.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(changeNewStaffPassword, salt);

        // Update the password in the database
        existingStaff.password = hashedPassword;
        await existingStaff.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});