import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedItems, setSelectedItems] = useState({ name: '', quantity: 0, price: 0 });
    const [recentOrder, setRecentOrder] = useState(null);
    const [recentUpdatedOrder, setRecentUpdatedOrder] = useState(null);
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);  // Default to today's date
    const [payment, setPayment] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [filterPayment, setFilterPayment] = useState('');
    const [filteredTotalAmount, setFilteredTotalAmount] = useState(0);
    const [showSalesHistory, setShowSalesHistory] = useState(false); // New state for toggling
    const [showLoginModal, setShowLoginModal] = useState(false); // Toggle login modal
    //const [adminPassword, setAdminPassword] = useState('password'); // Admin password input state
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
    const [showPreview, setShowPreview] = useState(false);  // State to show/hide preview
    const [orderNumber, setOrderNumber] = useState('');
    const [cancelDate, setCancelDate] = useState('');
    const [cancelLocation, setCancelLocation] = useState('');
    const [loading, setLoading] = useState(true);  // To handle loading state
    //const [message, setMessage] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [updateLocation, setUpdateLocation] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showChangePasswordModal, setChangePasswordModal] = useState(false); // Toggle Change Password modal
    const [admin_id, setAdminID] = useState(''); // Hardcoded admin ID
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [serviceType, setServiceType] = useState('Dine-In');  // Default to 'Dine-In'
    const [showSuccess, setShowSuccess] = useState(false);
    const [showSuccessCancel, setShowSuccessCancel] = useState(false);
    const [canceledOrders, setCanceledOrders] = useState([]);
    const [showCanceledOrders, setShowCanceledOrders] = useState([]);
    const [filterCanceledDate, setFilterCanceledDate] = useState('');
    const [filterCanceledMonth, setFilterCanceledMonth] = useState('');
    const [filterCanceledLocation, setFilterCanceledLocation] = useState('');
    const [filterCanceledPayment, setFilterCanceledPayment] = useState('');
    const [filteredCanceledTotalAmount, setFilteredCanceledTotalAmount] = useState(0);
    const [showChangeStaffPasswordModal, setChangeStaffPasswordModal] = useState(false); // Toggle Change Password modal
    const [staff_id, setStaffID] = useState(''); // Hardcoded admin ID
    const [staffPassword, setStaffPassword] = useState("");
    const [currentStaffPassword, setCurrentStaffPassword] = useState('');
    const [newStaffPassword, setNewStaffPassword] = useState('');
    const [showStaffLoginModal, setShowStaffLoginModal] = useState(true); // Toggle login modal
    const [showAuthorised, setShowAuthorised] = useState(false); // Authentication status
    const [showAddBranchModal, setShowAddBranchModal] = useState(false);
    const [branchName, setBranchName] = useState('');
    const [branchID, setBranchID] = useState('');
    const [newBranchPassword, setNewBranchPassword] = useState('');
    const [showSuccessAddStaff, setShowSuccessAddStaff] = useState(false);
    //const [currentPassword, setCurrentPassword] = useState('');
    const [changeNewStaffPassword, setChangeNewStaffPassword] = useState('');
    const [changeBranchID, setChangeBranchID] = useState('');
    const [showSuccessChangeStaffPassword, setShowSuccessChangeStaffPassword] = useState(false);
    const [showCancelStaffModal, setShowCancelStaffModal] = useState('');
    const [cancelBranchID, setCancelBranchID] = useState('');
    const [cancelBranchPassword, setCancelBranchPassword] = useState('');
    const [showCancelStaffSuccessMessage, setShowCancelStaffSuccessMessage] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [showSuccessChangeAdminPassword, setShowSuccessChangeAdminPassword] = useState(false);
    const [showAdminCornerLoginModal, setShowAdminCornerLoginModal] = useState(false);
    const [showAdminSection, setShowAdminSection] = useState(false);
    const [showAdminAuthenticated, setShowAdminAuthenticated] = useState(false);
    const [staffList, setStaffList] = useState([]);
    const [showBranchControls, setShowBranchControls] = useState(false);
    const [staffName,setStaffName] = useState([]);
    const [showAdminLogoutConfirm, setShowAdminLogoutConfirm] = useState(false);
    const [showStaffLogoutConfirm, setShowStaffLogoutConfirm] = useState(false);



    
        useEffect(() => {
          document.title = "Mr. Veg"; // Set the title of the webpage
          // Dynamically update the favicon
          const link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/x-icon';
          link.href = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEak0zhvb6o7aSFG8qQ0YGhfbbg5I4JmTC5Q&s';
          document.head.appendChild(link);
          return () => {
            document.head.removeChild(link); // Cleanup when component unmounts
        };
        }, []); // Empty dependency array ensures it runs once after the component mounts
        
    const handleStaffLogin = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:5000/api/staff/login', { staff_id, staffPassword });
                setStaffName(response.data.staffName);
                setShowAuthorised(true);
                setShowStaffLogoutConfirm(false);
                setShowStaffLoginModal(false);
                
            } catch (err) {
                setError(err.response?.data?.message || 'Error logging in');
            }
        };

    const menu = [
        { category: 'Steam', items: [{ name: 'Soya Momo (Steam)', price: 50 }, { name: 'Veg Momo (Steam)', price: 60 }, { name: 'Corn Momo (Steam)', price: 70 }, { name: 'Mushroom Momo (Steam)', price: 70 }, { name: 'Paneer Momo (Steam)', price: 80 }, { name: 'Corn Cheese Momo (Steam)', price: 90 }] },
        { category: 'Fried', items: [{ name: 'Soya Momo (Fried)', price: 60 }, { name: 'Veg Momo (Fried)', price: 70 }, { name: 'Corn Momo (Fried)', price: 80 }, { name: 'Mushroom Momo (Fried)', price: 80 }, { name: 'Paneer Momo (Fried)', price: 90 }, { name: 'Corn Cheese Momo (Fried)', price: 100 }] },
        { category: '440 Volts', items: [{ name: 'Soya Momo (440 Volts)', price: 100 }, { name: 'Veg Momo (440 Volts)', price: 110 }, { name: 'Corn Momo (440 Volts)', price: 110 }, { name: 'Mushroom Momo (440 Volts)', price: 110 }, { name: 'Paneer Momo (440 Volts)', price: 120 }, { name: 'Corn Cheese Momo (440 Volts)', price: 130 }] },
        { category: 'Creamy', items: [{ name: 'Soya Momo (Creamy)', price: 110 }, { name: 'Veg Momo (Creamy)', price: 120 }, { name: 'Corn Momo (Creamy)', price: 120 }, { name: 'Mushroom Momo (Creamy)', price: 130 }, { name: 'Paneer Momo (Creamy)', price: 140 }, { name: 'Corn Cheese Momo (Creamy)', price: 150 }] },
        { category: 'Kurkure', items: [{ name: 'Soya Momo (Kurkure)', price: 140 }, { name: 'Veg Momo (Kurkure)', price: 150 }, { name: 'Corn Momo (Kurkure)', price: 160 }, { name: 'Mushroom Momo (Kurkure)', price: 160 }, { name: 'Paneer Momo (Kurkure)', price: 160 }, { name: 'Corn Cheese Momo (Kurkure)', price: 180 }] },
        { category: 'Chilli', items: [{ name: 'Soya Momo (Chilli)', price: 140 }, { name: 'Veg Momo (Chilli)', price: 150 }, { name: 'Corn Momo (Chilli)', price: 160 }, { name: 'Mushroom Momo (Chilli)', price: 160 }, { name: 'Paneer Momo (Chilli)', price: 160 }, { name: 'Corn Cheese Momo (Chilli)', price: 180 }] },
        { category: 'Burger', items: [{ name: 'Momo Burger', price: 30 }, { name: 'Veg Burger', price: 40 }, { name: 'Paneer Burger', price: 60 }, { name: 'Paneer Cheese Burger', price: 75 }, { name: 'Veg Cheese Burger', price: 55 }] },
        { category: 'Sandwich', items: [{ name: 'Veg Grilled Sandwich', price: 40 }, { name: 'Veg Cheese Grilled Sandwich', price: 55 }, { name: 'Cheese Corn Sandwich', price: 65 }, { name: 'Paneer Tandoori Sandwich', price: 70 }, { name: 'Spicy Veg Sandwich', price: 50 }, { name: 'Spicy Veg Cheese Grilled Sandwich', price: 70 }, { name: 'Paneer Tandoori Cheese', price: 85 }] },
        { category: 'French Fries', items: [{ name: 'French Fries Simply Salt', price: 50 }, { name: 'Masala French Fries', price: 60 }, { name: 'Peri Peri French Fries', price: 80 }] },
        { category: 'Potato Twister', items: [{ name: 'Masala Potato Twister', price: 50 }, { name: 'Peri Peri Potato Twister', price: 60 }] },
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/api/orders')
            .then((response) => setOrders(response.data))
            .catch((error) => console.error('Error fetching orders:', error));
    }, []);

    const addItem = (item) => {
        const existingItem = items.find(i => i.name === item.name);
        if((selectedItems[item.name] ||0)>0){
        if (existingItem) {
            setItems(items.map(i => 
                i.name === item.name ? { ...i, quantity: (selectedItems[item.name] || 0) } : i
            ));
        } else {
            setItems([...items, { ...item, quantity: selectedItems[item.name] || 0 }]);
        }}
    };

    const handleQuantityChange = (name, value) => {
        setSelectedItems({
            ...selectedItems,
            [name]: parseInt(value)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = { items, date, location, payment, serviceType , totalAmount: calculateTotal()};
        axios.post('http://localhost:5000/api/orders', orderData)
            .then((response) => {
                const newOrder = response.data;
                setOrders([...orders, newOrder]);
                setRecentOrder(newOrder);  // Set the recent order
                showSuccessMessage();
                resetForm();
            })
            .catch((error) => console.error('Error creating order:', error));
    };
    
    const handlePrint = () => {
        if (recentOrder) {
            // Open a new window with the order details and trigger print
            const printWindow = window.open('', '_blank');
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const dateOnly = new Date(recentOrder.date).toLocaleDateString('en-CA', options);
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Bill</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                            }
                            .text-center {
                                text-align: center;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                            }
                            table, th, td {
                                border: 0px solid black;
                            }
                            th, td {
                                padding: 10px;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <center>
                            <div>
                                <!-- Adding the image -->
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEak0zhvb6o7aSFG8qQ0YGhfbbg5I4JmTC5Q&s" 
                                style="maxWidth:50px;max-height:50px;border-radius:150px;"></img>
                                <h1 class="text-center"><b style="color:GREEN">Mr.</b><b style="color:GREEN"> Veg</b></h1>
                                Address: ${recentOrder.location},<br>Jamshedpur<br>
                                Ph. No. : 7070808307 | 9241704026 <br>
                                Date: ${dateOnly}<br>
                                Time: ${recentOrder.time}<br>
                                <strong>Order No.: ${recentOrder.orderNumber}<br>
                                Service Type:${recentOrder.serviceType}</strong><br>
                                Invoice Number: ${recentOrder.invoiceNumber}
                                _______________________________________________
                                <table border="0" cellpadding="10">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Price(Rs.)</th>
                                            <th>Sub Total(Rs.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${recentOrder.items.map(item => `
                                            <tr>
                                                <td style="text-align:left">${item.name}</td>
                                                <td><center>${item.quantity}</center></td>
                                                <td><center>${item.price}</center></td>
                                                <td><center>${item.price * item.quantity}</center></td>
                                            </tr>
                                        `).join('')}
                                        <tr><td colSpan="4">_______________________________________________</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className="text-left" style="text-align:left;font-size:21px"><strong>Total Amount: </strong></td>
                                            <td style="font-size:21px"><strong>Rs. ${recentOrder.totalAmount}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>_______________________________________________</center>
                            <strong>Payment mode: ${recentOrder.payment}</strong>
                            <br><br>
                        
                        <footer><center>
                        <p style="color:black">Thank You....  Visit Again</p></center>
                    </footer>
                    </body>
                    
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        } else {
            alert('No recent order to print!');
        }
    };
    
    const handleUpdatedPrint = () => {
        if (recentUpdatedOrder) {
            // Open a new window with the order details and trigger print
            const printWindow = window.open('', '_blank');
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const dateOnly = new Date(recentUpdatedOrder.date).toLocaleDateString('en-CA', options);
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Bill</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                            }
                            .text-center {
                                text-align: center;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                            }
                            table, th, td {
                                border: 0px solid black;
                            }
                            th, td {
                                padding: 10px;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <center>
                            <div>
                                <!-- Adding the image -->
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEak0zhvb6o7aSFG8qQ0YGhfbbg5I4JmTC5Q&s" 
                                style="maxWidth:50px;max-height:50px;border-radius:150px;"></img>
                                <h1 class="text-center"><b style="color:GREEN">Mr.</b><b style="color:GREEN"> Veg</b></h1>
                                Address: ${recentUpdatedOrder.location},<br>Jamshedpur<br>
                                Ph. No. : 7070808307 | 9241704026 <br>
                                Date: ${dateOnly}<br>
                                <strong>Order No.: ${recentUpdatedOrder.orderNumber}<br>
                                Service Type:${recentUpdatedOrder.serviceType}</strong><br>
                                Invoice Number: ${recentUpdatedOrder.invoiceNumber}

                                <hr className="hr-divider" />

                                <table border="0" cellpadding="10">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Price(Rs.)</th>
                                            <th>Sub Total(Rs.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${recentUpdatedOrder.items.map(item => `
                                            <tr>
                                                <td style="text-align:left">${item.name}</td>
                                                <td><center>${item.quantity}</center></td>
                                                <td><center>${item.price}</center></td>
                                                <td><center>${item.price * item.quantity}</center></td>
                                            </tr>
                                        `).join('')}
                                        <tr><td colSpan="4">
                                        
                                        <hr className="hr-divider" />
                                        
                                        </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className="text-left" style="text-align:left;font-size:21px"><strong>Total Amount: </strong></td>
                                            <td style="font-size:21px"><strong>Rs. ${recentUpdatedOrder.totalAmount}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                            
                            <hr className="hr-divider" />
                            
                            </center>
                            <strong>Payment mode: ${recentUpdatedOrder.payment}</strong>
                            <br><br>
                        
                        <footer><center>
                        <p style="color:black">Thank You....  Visit Again</p></center>
                    </footer>
                    </body>
                    
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        } else {
            alert('No recent order to print!');
        }
    };
    
    // Fetch orders function that can be reused by both useEffect and the Refresh button
    const fetchOrders = async () => {
    try {
      //setLoading(true);  // Show loading before fetching
      const response = await axios.get('http://localhost:5000/api/orders');  // Fetch all orders
      setOrders(response.data);
      setLoading(false); // Stop loading once orders are fetched
    } catch (error) {
        console.error('Error fetching orders:', error);
      setLoading(false); // Stop loading if there is an error
    }
    };
    // Function to fetch canceled orders from the backend
    const fetchCanceledOrders = async () => {
        try {
            //setLoading(true);  // Show loading before fetching
            const response = await axios.get('http://localhost:5000/api/orders/canceled');
            setCanceledOrders(response.data);  // Set the canceled orders in state
            setLoading(false);
        } catch (error) {
            console.error('Error fetching canceled orders:', error);
            setLoading(false);
        }
    };
    

    const fetchStaffList = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/staff');  // Add your endpoint to fetch staff list
          setStaffList(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching staff list:', error);
          setLoading(false);
        }
      };
    
      const toggleActivation = async (staff_id, currentStatus) => {
        try {
          const action = currentStatus ? 'deactivate' : 'activate';
          const response = await axios.put('http://localhost:5000/api/staff/toggle-activation', { staff_id, action });
          
          console.log(response.data.message);
          fetchStaffList(); // Refresh the list after updating status
        } catch (error) {
          console.error('Error toggling activation status:', error);
        }
      };
    // Handle change in item quantity
    const handleQuantitychange = (itemName, value) => {
        const updatedItems = items.map((item) =>
            item.name === itemName ? { ...item, quantity: parseInt(value) } : item
        );
        setItems(updatedItems);
    };

    /*// Handle change in item price
    const handlePriceChange = (itemName, value) => {
        const updatedItems = items.map((item) =>
            item.name === itemName ? { ...item, price: parseFloat(value) } : item
        );
        setItems(updatedItems);
    };*/

    // Handle updating the order
    const handleUpdate = async (e) => {
        e.preventDefault();
        const Confirmation = window.confirm(`Do you want to Update the order #${orderNumber} for ${updateLocation} on ${new Date(updateDate).toLocaleDateString()}?`);
        if (!Confirmation) {
            return; // User canceled the action
          }
        try {
            const response = await fetch('http://localhost:5000/api/orders/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderNumber: orderNumber,  // Use the recent order's order number
                    date: updateDate,  // Use the recent order's date
                    location: updateLocation,  // Use the recent order's location
                    items: items  // Updated items with new quantities and prices
                }),
            });
            const updatedOrder = response.data;
            const data = await response.json();
            if (!response.ok) {
                alert('Error updating order: ' + data.message);
            } 
            setRecentUpdatedOrder(data);
            setShowSuccess(true);
            // Hide the success message after a few seconds
            setTimeout(() => setShowSuccess(false), 3000);
            fetchOrders();
            resetForm();
            
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Failed to update the order.');
        }
    };

  // useEffect to fetch orders when component loads
    useEffect(() => {
    fetchOrders();  // Call fetchOrders when the component is mounted
    }, []);  // Empty dependency array to only run on component mount
    
    // Fetch canceled orders when the component mounts
    useEffect(() => {
    fetchCanceledOrders();
    }, []);

 
    const cancelOrder = async (orderNumber, date, location) => {  
    // Show confirmation popup
    const isConfirmed = window.confirm(`Cancelling an Order can lead to wastage of Food.Are you sure you want to cancel the Order No.: #${orderNumber}; for Location: ${location} ;on ${new Date(date).toLocaleDateString()}?`);

    if (!isConfirmed) {
      return; // User canceled the action
    }
    try {
        const response = await axios.delete('http://localhost:5000/api/orders/cancel', {
        data: {
            orderNumber,
            date,
            location,
        },
        });
        console.log(response.data.message); // Order canceled successfully
        setShowSuccessCancel(true);
        // Hide the success message after a few seconds
        setTimeout(() => setShowSuccessCancel(false), 3000);
        fetchOrders();  // Refetch the orders after deletion to update the list
        fetchCanceledOrders();
        resetForm();
      // Remove the canceled order from the orders list and update the state
        
    } catch (error) {
        console.error('Error canceling the order:', error);
        alert('Failed to cancel the order. Please try again.');
    }
    };

    if (loading) {
    return <div>Loading...</div>;  // Show loading spinner while fetching orders
    }

    const filterOrders = () => {
        axios.get('http://localhost:5000/api/orders', {
            params: {
                date: filterDate,
                location: filterLocation,
                payment: filterPayment,
                month: filterMonth,
                orderNumber: orderNumber,
            }
        })
        .then((response) => {
            setOrders(response.data);
    
            // Calculate the sum of the totalAmount from all filtered orders
            const totalSum = response.data.reduce((sum, order) => sum + order.totalAmount, 0);
            setFilteredTotalAmount(totalSum); // Set the calculated sum to state
            resetForm();
        })
        .catch((error) => console.error('Error filtering orders:', error));
    };

    const filterCanceledOrders = () => {
        axios.get('http://localhost:5000/api/orders/cancel', {
            params: {
                date: filterCanceledDate,
                location: filterCanceledLocation,
                payment: filterCanceledPayment,
                month: filterCanceledMonth,
                orderNumber: orderNumber,
            }
        })
        .then((response) => {
            setCanceledOrders(response.data);
    
            // Calculate the sum of the totalAmount from all filtered orders
            const totalSum = response.data.reduce((sum, order) => sum + order.totalAmount, 0);
            setFilteredCanceledTotalAmount(totalSum); // Set the calculated sum to state
            resetForm();
        })
        .catch((error) => console.error('Error filtering orders:', error));
    };
    
    const calculateTotal = () => {
        return items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { admin_id, password });
            console.log('Success:', response);  // Log the success response
            setIsAuthenticated(true);
            setShowLoginModal(false);
            alert(response.data.message);  // Display the success message
        } catch (err) {
            console.error('Error object:', err);  // Log the complete error object
            console.error('Error response:', err.response);  // Log the error response
        
            // Check if err.response exists before accessing
            if (err.response) {
                setError(err.response.data?.message || 'Error logging in');
            } else {
                setError('Unknown error occurred');
            }
        }
    };

    axios.get('http://localhost:5000/api/orders', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).catch(error => {
        if (error.response.status === 403) {
            alert('Your account has been deactivated or your session has expired. Please contact your admin or log in again.');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    });
    
    const handleAdminCornerLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { admin_id, password });
            setShowAdminSection(true);
            setShowAdminLogoutConfirm(false);
            setShowAdminCornerLoginModal(false);
            setShowAdminAuthenticated(true);
            //alert(response.data.message);  // Display the success message
        } catch (err) {
            console.error('Error object:', err);  // Log the complete error object
            console.error('Error response:', err.response);  // Log the error response
        
            // Check if err.response exists before accessing
            if (err.response) {
                setError(err.response.data?.message || 'Error logging in');
            } else {
                setError('Unknown error occurred');
            }
        }
    };

    
    // Function to handle password change
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/api/admin/change-password', {
                admin_id: admin_id,
                currentPassword,
                newPassword
            });
            //alert(response.data.message);
            setShowSuccessChangeAdminPassword(true);
            setTimeout(() => setShowSuccessChangeAdminPassword(false), 3000);
            handlePasswordClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Error changing password');
        }
    };
    // Function to handle password change
    const handleChangeStaffPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/api/staff/change-password', {
                staff_id :changeBranchID,
                currentStaffPassword,
                changeNewStaffPassword
            });
            //alert(response.data.message);
            handleStaffPasswordClose();
            setShowSuccessChangeStaffPassword(true);
            setTimeout(() => setShowSuccessChangeStaffPassword(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error changing password');
        }
    };
    const resetForm = () => {
        setItems([]);
        setSelectedItems({});
        setLocation('');
        setDate(new Date().toISOString().split('T')[0]);
        setPayment('');
        setCancelLocation('');
        setCancelDate('');
        setUpdateLocation('');
        setUpdateDate('');
        setOrderNumber('');
        setFilterLocation('');
        setFilterDate('');
        setFilterPayment('');
        setFilterMonth('');
        setFilterCanceledLocation('');
        setFilterCanceledDate('');
        setFilterCanceledPayment('');
        setFilterCanceledMonth('');
        setAdminID('');
        setPassword('');
    };
    const handleClose = () => {
        setIsAuthenticated(false);
        setChangePasswordModal(false);
        setShowCanceledOrders(false);
        setAdminID('');
        setPassword('');
    };
    const handlePasswordClose = () => {
        setChangePasswordModal(false);
        setPassword('');
        setConfirmPassword('');
        setError('');
    };
    const handleStaffPasswordClose = () => {
        setChangeStaffPasswordModal(false);
        setChangeBranchID('');
        setChangeNewStaffPassword('');
        setCurrentStaffPassword('');
        setError('');
    };
    const handleCancelStaffClose = () => {
        setShowCancelStaffModal(false);
        setCancelBranchID('');
        setCancelBranchPassword('');
        setError('');
    };
    
    const handleRestoreOrder = (orderId) => {
        axios.post('http://localhost:5000/api/orders/restore', { orderId })
            .then((response) => {
                alert('Order restored successfully!');
                fetchCanceledOrders(); // Refresh the canceled orders list
                fetchOrders(); // Refresh the active orders list
                
            })
            .catch((error) => {
                console.error('Error restoring order:', error);
                alert('Failed to restore the order.');
            });
    };
    
    const showSuccessMessage = () => {
        const successBox = document.getElementById('successBox');
        successBox.style.display = 'block';
    
        // Hide the box after 3 seconds (you can adjust the time as needed)
        setTimeout(() => {
            successBox.style.display = 'none';
        }, 3000);
    };

    const handleAddBranch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/staff/add-staff', {
                staffName: branchName,
                staff_id: branchID,
                staffPassword: newBranchPassword
            });
        if(response){ 
          console.log('Branch added successfully:', response.data);
          setShowAddBranchModal(false);
          setShowSuccessAddStaff(true);
          setTimeout(() => setShowSuccessAddStaff(false), 3000);
          // Handle success (e.g., close modal, show success message)
          fetchStaffList();
          }
        } catch (error) {
          console.error('Error adding branch:', error.response.data.error);
          // Handle error (e.g., show error message)
        }
      };

      const handleRemoveBranch = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/staff/remove-staff', {
            staff_id: cancelBranchID,
            staffPassword: cancelBranchPassword
          });
    
          if (response.status === 200) {
            handleCancelStaffClose();
            setShowCancelStaffSuccessMessage(true);
            setTimeout(() => setShowCancelStaffSuccessMessage(false), 3000);
            //setErrorMessage(''); // Clear any previous error messages
          }
        } catch (error) {
            console.error('Error removing branch:', error.response.data.error);
            // Handle error (e.g., show error message)
        }
      };
    /*const showSuccessMessageUpdate = () => {
        const successBox = document.getElementById('successBoxUpdate');
        successBox.style.display = 'block';
    
        // Hide the box after 3 seconds (you can adjust the time as needed)
        setTimeout(() => {
            successBox.style.display = 'none';
        }, 3000);
        
    };*/
    return (
        <div className="App container mt-5">
        {showStaffLoginModal && (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' ,color:'black'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h3><b className="text-center mb-4" style={{ color: 'orange' }}>Mr.</b>
                        <b className="text-center mb-4" style={{ color: 'green' }}> Veg </b></h3>
                            <h5 className="modal-title">_Branch Login </h5>
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{backgroundColor:'red'}}                                    
                                onClick={() => {setShowStaffLoginModal(false);
                                    setStaffID('');setStaffPassword('');

                                }}
                            >
                                <span>&times;</span>
                            </button>
                        </div> {/*modal-body*/}
                        <div className="modal-body">
                            <form onSubmit={handleStaffLogin}>
                                <div className="form-group">
                                    <label htmlFor="staffID">Branch ID :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="staffID"
                                        value={staff_id}
                                        onChange={(e) => setStaffID(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="adminPassword">Password :</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="staffPassword"
                                        value={staffPassword}
                                        onChange={(e) => setStaffPassword(e.target.value)}
                                        required
                                    />
                                </div><center>
                                <button type="submit" className="btn btn-primary" style={{width:'200px'}}>
                                    Login
                                </button></center>
                            </form><br></br>
                            <a onClick={() => {setShowStaffLoginModal(false);
                                              setShowAdminCornerLoginModal(true);
                                            }
                            }
                            style={{color:'Orange', cursor:'pointer'}}><strong>Admin's Corner</strong></a>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {showAdminCornerLoginModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' ,color:'black'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h3><b className="text-center mb-4" style={{ color: 'orange' }}>Mr.</b>
                            <b className="text-center mb-4" style={{ color: 'green' }}> Veg </b></h3>
                                <h5 className="modal-title">_Admin Login </h5>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{backgroundColor:'red'}}                                    
                                    onClick={() => {setShowAdminCornerLoginModal(false);
                                                    setShowStaffLoginModal(true);
                                                    setAdminID('');
                                                    setPassword('');                
                                    }}
                                >
                                    <span>&times;</span>
                                </button>
                            </div> {/*modal-body*/}
                            <div className="modal-body">
                                <form onSubmit={handleAdminCornerLogin}>
                                    <div className="form-group">
                                        <label htmlFor="adminID">Admin ID :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="adminID"
                                            value={admin_id}
                                            onChange={(e) => setAdminID(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="adminPassword">Password :</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="adminPassword"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div><center>
                                    <button type="submit" className="btn btn-primary" style={{width:'200px'}}>
                                        Login
                                    </button></center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        
        {showAuthorised && (
          
        <div>
            {staffName &&(
        <div className="staff-corner" style={{textAlign:'left'}}><FontAwesomeIcon icon={faUserCircle} size="2x" />
        <p style={{fontSize:'15px', cursor:'pointer', right:''}}>{staffName}</p></div>
    )}  
    <hr className="hr-divider" style={{height:'1px'}} />
    <div className="logout-corner">
    <p style={{fontSize:'15px', cursor:'pointer', color:'white'}} onClick={() =>setShowStaffLogoutConfirm(true)}>
    <strong>Logout</strong></p>
    </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEak0zhvb6o7aSFG8qQ0YGhfbbg5I4JmTC5Q&s" 
            style={{maxWidth:'120px',maxHeight:'120px',borderRadius:'150px',position:'absolute',opacity:'1',paddingTop:'10px'}}></img>
            
                {showStaffLogoutConfirm && (
                <div className="confirmation-modal">
                <div className="confirmation-box" style={{color:'grey'}}>
                    <h6>Do you really want to logout of your account?</h6>
                    <button onClick={() =>{setIsAuthenticated(false);setShowAuthorised(false);
                     setShowStaffLoginModal(true);
                     setStaffID('');setStaffPassword('');}}>Yes</button>
                    <button onClick={() =>{setShowStaffLogoutConfirm(false)}}>No</button>
                </div>
            </div>
            )}
            <center><h1><b className="text-center mb-4" style={{ color: 'orange' }}>Mr.</b>
            <b className="text-center mb-4" style={{ color: 'green' }}> Veg</b></h1><br></br></center>
            <h2 className="text-center mb-4" style={{ color: 'white' }}>Bill Generator</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        {/* Menu Table */}
                        <center><h3>Menu</h3></center>
                        <div className="table-responsive">
                            <table className="table table-striped" >
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Item</th>
                                        <th>Price (Rs.)</th>
                                        <th>Select Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menu.map((category, index) => (
                                        category.items.map((item, i) => (
                                            <tr key={index + '-' + i}>
                                                {i === 0 && (
                                                    <td rowSpan={category.items.length}>
                                                        {category.category}
                                                    </td>
                                                )}
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={selectedItems[item.name] || 0}
                                                        min="0"
                                                        onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-primary" onClick={() => addItem(item)}>Add</button>
                                                </td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="form-group">
                        <label htmlFor="location">Location:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            >
                                <option value="">Select a location</option>
                                <option value="M.I.G,Adityapur-2">M.I.G</option>
                                <option value="Near Ganesh Puja Maidan,Kadma">Kadma</option>
                                <option value="Sakchi">Sakchi</option>
                                <option value="Bistupur">Bistupur</option>
                                <option value="Rd. No.: 11,Adityapur-2">Rd. No.: 11</option>
                                <option value="S-type Cafe,Adityapur-1">S-type Cafe</option>
                                <option value="M P tower,Adityapur-1">M P tower</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment">Payment Method:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="payment"
                                value={payment}
                                onChange={(e) => setPayment(e.target.value)}
                                required
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI Payment</option>
                                <option value="Card">Card Payment</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="serviceType">Service Type:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="serviceType"
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                                required
                            >
                                <option value="">Select a Service Type</option>
                                <option value="Dine-In">Dine-In</option>
                                <option value="parcel">Parcel</option>
                                
                            </select>
                    </div>
                    
                    <div className="mt-4">
                    {/* Live Order Preview */}
                    <h3>Order Preview</h3>
                    {items.length === 0 ? (
                        <p>No items added yet.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price (Rs.)</th>
                                        <th>Sub Total(Rs.)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={item.name + index}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price}</td>
                                            <td>{item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h4>Total Amount: Rs. {calculateTotal()}</h4>
                        </div>
                        )}
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-success mr-3">Confirm Order</button>
                            <button type="button" className="btn btn-danger ml-3" onClick={resetForm}>Cancel</button>
                        </div>
                        <div>
                        <div id="successBox" 
                        style={{display:'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', color: 'green', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <span style={{fontSize: '50px'}}>✔</span>
                        <p style={{color:'black'}}>Order Recorded Successfully!</p>
                        </div></div>


                    <div className="row mt-4">
                    <div className="col-12 text-center">
                    {recentOrder && (
                            <button type="button" className="btn btn-info ml-3" onClick={handlePrint}>Print Bill</button>
                        )}
                        
                    </div>
                </div>
                
            </form>
            {/*<center>____________________________________________________________________________________</center> */}
            <hr className="hr-divider" />
            <br></br>
            <br></br>
            <br></br>
            {/* Update Order Section */}
            <div className="row mb-4">
            <h3>Update Section</h3>
                <div className="col-md-4">
                    <label htmlFor="updateDate">Order Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="updateDate"
                        value={updateDate}
                        onChange={(e) => setUpdateDate(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="updateLocation">Location:</label>
                    <select
                        className="form-control"
                        id="updateLocation"
                        value={updateLocation}
                        onChange={(e) => setUpdateLocation(e.target.value)}
                    >
                        <option value="">Select a location</option>
                        <option value="M.I.G,Adityapur-2">M.I.G</option>
                        <option value="Near Ganesh Puja Maidan,Kadma">Kadma</option>
                        <option value="Sakchi">Sakchi</option>
                        <option value="Bistupur">Bistupur</option>
                        <option value="Rd. No.: 11,Adityapur-2">Rd. No.: 11</option>
                        <option value="S-type Cafe,Adityapur-1">S-type Cafe</option>
                        <option value="M P tower,Adityapur-1">M P tower</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="orderNumber">Order Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Enter Order Number"
                    />
                </div>
        <div className="mt-4">
            <h3>Update Preview</h3>
            {items.length === 0 ? (
                <p>No items added yet to update.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price (Rs.)</th>
                                <th>Sub Total (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.name + index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={item.quantity}
                                            min="0"
                                            onChange={(e) => handleQuantitychange(item.name, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        
                                        {item.price}
                                    </td>
                                    <td>{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Total Amount: Rs. {calculateTotal()}</h4>
                </div>
            )}
            <div className="text-center mt-4">
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    Update Order
                </button>
                <button type="button" className="btn btn-danger ml-3" onClick={resetForm}>Cancel</button>
                
            </div>
            
        </div>     
        {showSuccess &&(
                        
                        <div id="successBoxUpdate" 
                        style={{display:'block',width: '300px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', color: 'green', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <span style={{fontSize: '50px'}}>✔</span>
                        <p style={{color:'black'}}>Order Updated Successfully!</p>
                        </div> 
                    )}

                <div className="row mt-4">
                <div className="col-12 text-center">
                {recentUpdatedOrder &&(
                            <button type="button" className="btn btn-info ml-3" onClick={handleUpdatedPrint}>Print Bill</button>
                        )}</div>
                </div>
        {/*<center>____________________________________________________________________________________</center> */}
        <hr className="hr-divider" />

            {/* Button to open login modal */}
            <center><br></br>
                <button
                    className="btn btn-warning"
                    onClick={() => setShowLoginModal(true)}
                >
                    Sales History ▼
                </button>
            </center>
            <br></br>
            {/*<center>____________________________________________________________________________________</center> */}
            <hr className="hr-divider" />
            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' ,color:'black'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h3><b className="text-center mb-4" style={{ color: 'orange' }}>Mr.</b>
                            <b className="text-center mb-4" style={{ color: 'green' }}> Veg </b></h3>
                                <h5 className="modal-title">_Admin Login </h5>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{backgroundColor:'red'}}                                    
                                    onClick={() => setShowLoginModal(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div> {/*modal-body*/}
                            <div className="modal-body">
                                <form onSubmit={handleLogin}>
                                    <div className="form-group">
                                        <label htmlFor="adminID">Admin ID :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="adminID"
                                            value={admin_id}
                                            onChange={(e) => setAdminID(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="adminPassword">Password :</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="adminPassword"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div><center>
                                    <button type="submit" className="btn btn-primary" style={{width:'200px'}}>
                                        Login
                                    </button></center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Conditionally render the sales history and filter section only if authenticated */}
            {isAuthenticated && (
                <div><center><div>{/* Close Button*/} 
                {isAuthenticated && <button onClick={handleClose} className="btn btn-danger ml-3" style={{backgroundColor:'red'}}>Close History ▲</button>}</div></center>
                <br></br>
                <br></br>
                <div className="row mb-4">
                    <div className="col-md-4">
                        <label htmlFor="filterDate">Filter by Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="filterDate"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                    </div>
                    {/* Filter by Month */}
                    <div className="col-md-3">
                        <label htmlFor="filterMonth">Filter by Month:</label>
                        <input
                            type="month"
                            className="form-control"
                            style={{maxWidth:'230px'}}
                            id="filterMonth"
                            value={filterMonth}
                            onChange={(e) => setFilterMonth(e.target.value)}
                        />
                    </div> <div style={{maxWidth:'45px'}}></div>
                    <div className="col-md-4">
                        <label htmlFor="filterLocation">Filter by Location:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="filterLocation"
                                value={filterLocation}
                                onChange={(e) => setFilterLocation(e.target.value)}
                            >
                                <option value="">Select a location</option>
                                <option value="M.I.G,Adityapur-2">M.I.G</option>
                                <option value="Near Ganesh Puja Maidan,Kadma">Kadma</option>
                                <option value="Sakchi">Sakchi</option>
                                <option value="Bistupur">Bistupur</option>
                                <option value="Rd. No.: 11,Adityapur-2">Rd. No.: 11</option>
                                <option value="S-type Cafe,Adityapur-1">S-type Cafe</option>
                                <option value="M P tower,Adityapur-1">M P tower</option>
                            </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="filterPayment">Filter by Payment Method:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="filterPayment"
                                value={filterPayment}
                                onChange={(e) => setFilterPayment(e.target.value)}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI Payment</option>
                                <option value="Card">Card Payment</option>
                            </select>
                    </div>
                    <div style={{maxWidth:'240px'}}></div>
                    <div className="col-md-4">
                    <label htmlFor="orderNumber">Filter by Order No.:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Enter Order Number"
                    />
                    </div>
                    <br></br>
                    <br></br><center><br></br>
                    <div className="col-md-4 text-center align-self-end">
                        <button
                            className="btn btn-primary"
                            onClick={filterOrders}
                            style={{width:'120px'}}
                        >
                        Filter Sales
                        </button>
                    </div></center>
                </div>

                {/* Cancel Order Section */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <label htmlFor="cancelDate">Order Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="cancelDate"
                        value={cancelDate}
                        onChange={(e) => setCancelDate(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="cancelLocation">Location:</label>
                    <select
                        className="form-control"
                        id="cancelLocation"
                        value={cancelLocation}
                        onChange={(e) => setCancelLocation(e.target.value)}
                    >
                        <option value="">Select a location</option>
                        <option value="M.I.G,Adityapur-2">M.I.G</option>
                        <option value="Near Ganesh Puja Maidan,Kadma">Kadma</option>
                        <option value="Sakchi">Sakchi</option>
                        <option value="Bistupur">Bistupur</option>
                        <option value="Rd. No.: 11,Adityapur-2">Rd. No.: 11</option>
                        <option value="S-type Cafe,Adityapur-1">S-type Cafe</option>
                        <option value="M P tower,Adityapur-1">M P tower</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="orderNumber">Order Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Enter Order Number"
                    />
                </div>
                <div className="col-md-12 text-center mt-3">
                    <button
                        className="btn btn-danger"
                        onClick={() => cancelOrder(orderNumber, cancelDate, cancelLocation)}
                    >
                        Cancel Order
                    </button>
                </div>
                {/*{showCancelConfirmation &&(
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        width: '400px',
                    }}>
                        <p>Are you sure you want to cancel the order #{orderNumber} for {location} on {new Date(date).toLocaleDateString()}?</p>
                        <button style={{ marginRight: '10px' }} onClick={cancelOrder(orderNumber, cancelDate, cancelLocation)}>Confirm</button>
                        <button onClick={setCancelConfirmation(false)}>Cancel</button>
                    </div>
                </div>
            )}*/}
            </div>
            
            {showSuccessCancel &&(
                        
                        <div id="successBoxUpdate" 
                        style={{display:'block',width: '300px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', color: 'green', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <span style={{fontSize: '50px'}}>✔</span>
                        <p style={{color:'black'}}>Order Cancelled Successfully!</p>
                        </div> 
                    )}
            <div className="mt-5">
                {/* Order History */}
                <center><h2>Order History</h2></center>
                <button onClick={fetchOrders}>Refresh Orders</button>  {/* Refresh Button */}
                <div className="table-responsive"  style={{ maxHeight: '800px', maxWidth: '800px', overflowY: 'auto' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Order Number</th> {/* Add this column */}
                                <th>Order ID</th>
                                <th>Invoice No.</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Service Type</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Price (Rs.)</th>
                                <th>Total Amount (Rs.)</th>
                                <th>Payment Mode</th>
                                <th>Cancel</th> {/* Add Cancel Column */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <React.Fragment key={order._id}>
                                    {order.items.map((item, index) => (
                                        <tr key={item.name + index}>
                                            {index === 0 && (
                                                
                                                    <td rowSpan={order.items.length}>
                                                        {order.orderNumber} {/* Display orderNumber */}
                                                    </td>)}
                                                    {index === 0 && (
                                                    <td rowSpan={order.items.length}>
                                                        {order._id}
                                                    </td>)}
                                                    {index === 0 && (
                                                    <td rowSpan={order.items.length}>
                                                        {order.invoiceNumber}  {/* Display Invoice Number */}
                                                    </td>)}
                                                
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            {index === 0 &&(
                                                <td rowSpan={order.items.length}>
                                                {order.serviceType}
                                            </td>)}
                                            {index === 0 &&(
                                                <td rowSpan={order.items.length}>
                                                {order.date}
                                            </td>)}
                                            {index === 0 &&(
                                                <td rowSpan={order.items.length}>
                                                {order.time}
                                            </td>)}
                                            
                                            {index === 0 &&(
                                            <td rowSpan={order.items.length}>
                                                {order.location}
                                                </td>)}
                                            <td>{item.price}</td>
                                            {index === 0 && (
                                                <td rowSpan={order.items.length}>
                                                    <strong>{order.totalAmount}</strong>
                                                </td>
                                            )}
                                            {index === 0 &&(
                                            <td rowSpan={order.items.length}>
                                                {order.payment}
                                                </td>)}
                                                {index === 0 && (
                                            <td rowSpan={order.items.length}>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => cancelOrder(order.orderNumber, order.date, order.location)}
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                        {/* Total Sum Row */}

                        
                        <tfoot>
                        <tr>
                            <td colSpan="9" className="text-right"><strong>Total Sales Amount (Filtered):</strong></td>
                            <td><strong>Rs. {filteredTotalAmount}</strong></td>
                        </tr>
                        </tfoot>
                    </table>
                    
                </div><br></br>
                <div colSpan="8" className="text-right">
                    <strong>Total Sales Amount (Filtered): </strong>
                    <strong>  Rs. {filteredTotalAmount}</strong>
                    </div>
            </div>
            <div>
                <br></br>{/*<center>____________________________________________________________________________________</center> */}
                <hr className="hr-divider" />
            <center><h4 onClick={() => {
                   setShowCanceledOrders(true);  // Call the first function
                   fetchCanceledOrders();        // Call the second function
                        }}
                    style={{color:'orange',cursor:'pointer', float:'left'}}>View Cancelled Orders ▼</h4></center>
                                    <div style={{maxWidth:'400px'}}></div>
                                    <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{backgroundColor:'red'}}
                                    onClick={() => setShowCanceledOrders(false)}
                                >
                                    <span>&times;</span>
                                </button>
                </div>
                <div>
                {showCanceledOrders && (
                <div>
                <div className="row mb-4">
                    <div className="col-md-4">
                        <label htmlFor="filterCanceledDate">Filter by Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="filterCanceledDate"
                                value={filterCanceledDate}
                                onChange={(e) => setFilterCanceledDate(e.target.value)}
                            />
                    </div>
                    
                    {/* Filter by Month */}
                    <div className="col-md-3">
                        <label htmlFor="filterCanceledMonth">Filter by Month:</label>
                        <input
                            type="month"
                            className="form-control"
                            style={{maxWidth:'230px'}}
                            id="filterCanceledMonth"
                            value={filterCanceledMonth}
                            onChange={(e) => setFilterCanceledMonth(e.target.value)}
                        />
                    </div> <div style={{maxWidth:'45px'}}></div>
                    <div className="col-md-4">
                        <label htmlFor="filterCanceledLocation">Filter by Location:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="filterCanceledLocation"
                                value={filterCanceledLocation}
                                onChange={(e) => setFilterCanceledLocation(e.target.value)}
                            >
                                <option value="">Select a location</option>
                                <option value="M.I.G,Adityapur-2">M.I.G</option>
                                <option value="Near Ganesh Puja Maidan,Kadma">Kadma</option>
                                <option value="Sakchi">Sakchi</option>
                                <option value="Bistupur">Bistupur</option>
                                <option value="Rd. No.: 11,Adityapur-2">Rd. No.: 11</option>
                                <option value="S-type Cafe,Adityapur-1">S-type Cafe</option>
                                <option value="M P tower,Adityapur-1">M P tower</option>
                            </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="filterCanceledPayment">Filter by Payment Method:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="filterCanceledPayment"
                                value={filterCanceledPayment}
                                onChange={(e) => setFilterCanceledPayment(e.target.value)}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI Payment</option>
                                <option value="Card">Card Payment</option>
                            </select>
                    </div>
                    <div style={{maxWidth:'240px'}}></div>
                    <div className="col-md-4">
                    <label htmlFor="orderNumber">Filter by Order No.:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Enter Order Number"
                    />
                    </div>
                    <br></br>
                    <br></br><center><br></br>
                    <div className="col-md-4 text-center align-self-end">
                        <button
                            className="btn btn-primary"
                            onClick={filterCanceledOrders}
                            style={{width:'200px'}}
                        >
                        Filter Cancelled Orders
                        </button>
                    </div></center></div><button onClick={fetchCanceledOrders}>Refresh Orders</button>  {/* Refresh Button */}
                    {canceledOrders && (
                        
                <div className="table-responsive"  style={{ maxHeight: '800px', maxWidth: '800px', overflowY: 'auto' }}>
                    
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Order Number</th> {/* Add this column */}
                                <th>Order ID</th>
                                <th>Invoice No.</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Service Type</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Price (Rs.)</th>
                                <th>Total Amount (Rs.)</th>
                                <th>Payment Mode</th>
                                <th>Restore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {canceledOrders.map(order => (
                            <React.Fragment key={order._id}>
                            {order.items.map((item, index) => (
                                <tr key={item.name + index}>
                                    {index === 0 && (
                                        <td rowSpan={order.items.length}>
                                                {order.orderNumber} {/* Display orderNumber */}
                                            </td>)}
                                            {index === 0 && (
                                            <td rowSpan={order.items.length}>
                                                {order._id}
                                            </td>)}
                                            {index === 0 && (
                                            <td rowSpan={order.items.length}>
                                                {order.invoiceNumber}  {/* Display Invoice Number */}
                                            </td>)}
                                        <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    {index === 0 &&(
                                        <td rowSpan={order.items.length}>
                                        {order.serviceType}
                                    </td>)}
                                    {index === 0 &&(
                                        <td rowSpan={order.items.length}>
                                        {order.date}
                                    </td>)}
                                    {index === 0 &&(
                                        <td rowSpan={order.items.length}>
                                        {order.time}
                                    </td>)}
                                    {index === 0 &&(
                                    <td rowSpan={order.items.length}>
                                        {order.location}
                                        </td>)}
                                    <td>{item.price}</td>
                                    {index === 0 && (
                                        <td rowSpan={order.items.length}>
                                            <strong>{order.totalAmount}</strong>
                                        </td>
                                    )}
                                    {index === 0 &&(
                                    <td rowSpan={order.items.length}>
                                        {order.payment}
                                        </td>)}
                                    {index === 0 &&(
                                    <td rowSpan={order.items.length}>
                                    <button 
                                    className="restore-btn" 
                                    onClick={() => handleRestoreOrder(order._id)}>
                                    Restore Order
                                    </button>
                                    </td>)}
                                </tr>
                            ))}
                        </React.Fragment>
                        ))}
                    </tbody>
                </table><div colSpan="8" className="text-right">
                    <strong>Total Sales Amount (Cancelled): </strong>
                    <strong>  Rs. {filteredCanceledTotalAmount}</strong>
                    </div></div>
            ) }</div>
            )}
            
            </div>
            {/*<center>____________________________________________________________________________________</center> */}
            <hr className="hr-divider" />
            <br></br>
            
                     </div>
            )}   
            <hr className="hr-divider" />
            
        </div>
        
            <footer>
                <center>
                    <p style={{ color: 'grey' }}>&copy; 2024 Mr. Veg. All rights reserved.</p>
                </center>
                <p style={{color:'grey', fontSize:'10px'}}>Billing Page for Staff & Admin use only</p>
                <center><p style={{color:'grey', fontSize:'10px', paddingBottom:'1px'}}> Powered by WIAS Technologies</p></center>
            </footer>
        </div>    
    ) }

    {/*________________________________________________________________________________________________________________________________________*/}
    
    {showAdminSection &&(
        <div className="admin_container">
            <br></br>
            <h5 style={{paddingLeft:'20px'}}><FontAwesomeIcon icon={faUserCircle} size="2x" /> Admin's Corner</h5><hr className="hr-admin-divider" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEak0zhvb6o7aSFG8qQ0YGhfbbg5I4JmTC5Q&s" 
            style={{maxWidth:'100px',maxHeight:'100px',borderRadius:'150px',position:'absolute',opacity:'1',paddingLeft:'5px'}}></img>
            <p style={{textAlign:'right', cursor:'pointer', paddingRight:'40px'}} onClick={() =>setShowAdminLogoutConfirm(true)}>
            <strong>Logout</strong></p>
            <center><h1><b className="text-center mb-4" style={{ color: 'orange' }}>Mr.</b>
            <b className="text-center mb-4" style={{ color: 'green' }}> Veg</b></h1><br></br></center>
            <hr className="hr-admin-divider" />
            {showAdminLogoutConfirm && (
                <div className="confirmation-modal">
                <div className="confirmation-box">
                    <h6>Do you really want to logout of your account?</h6>
                    <button onClick={() =>{setShowAdminSection(false);
                     setShowAdminCornerLoginModal(true);setAdminID('');setPassword('')}}>Yes</button>
                    <button onClick={() =>{setShowAdminLogoutConfirm(false)}}>No</button>
                </div>
            </div>
            )}

            <center><h4 onClick={() => {
                   setShowAdminAuthenticated(true);  // Call the first function
                    // Call the second function
            }}
            
                    style={{color:'orange',cursor:'pointer', float:'left', paddingLeft:'20px'}}>Manage Orders History ▼ </h4></center>
                                    
                                    <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{backgroundColor:'red'}}
                                    onClick={() => setShowAdminAuthenticated(false)}
                                >
                                    <span>&times;</span>
                                </button>
            {/* Conditionally render the sales history and filter section only if authenticated */}
            {showAdminAuthenticated && (
                <div style={{padding:'20px'}}>{/*<center><div>{/* Close Button 
                {isAuthenticated && <button onClick={handleClose} className="btn btn-danger ml-3" style={{backgroundColor:'red'}}>Close History ▲</button>}}</div></center>*/}
                <br></br>
                <br></br>
                <div className="row mb-4">
                    <div className="col-md-4">
                        <label htmlFor="filterDate">Filter by Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="filterDate"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                    </div>
                    {/* Filter by Month */}
                    <div className="col-md-3">
                        <label htmlFor="filterMonth">Filter by Month:</label>
                        <input
                            type="month"
                            className="form-control"
                            style={{maxWidth:'230px'}}
                            id="filterMonth"
                            value={filterMonth}
                            onChange={(e) => setFilterMonth(e.target.value)}
                        />
                    </div> <div style={{maxWidth:'45px'}}></div>
                    <div className="col-md-4">
                        <label htmlFor="filterLocation">Filter by Location:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="filterLocation"
                                value={filterLocation}
                                onChange={(e) => setFilterLocation(e.target.value)}
                            >
                                <option value="">Select a location</option>
                                <option value="M.I.G,Adityapur-2">M.I.G</option>
                                <option value="Near Ganesh Puja Maidan,Kadma">Kadma</option>
                                <option value="Sakchi">Sakchi</option>
                                <option value="Bistupur">Bistupur</option>
                                <option value="Rd. No.: 11,Adityapur-2">Rd. No.: 11</option>
                                <option value="S-type Cafe,Adityapur-1">S-type Cafe</option>
                                <option value="M P tower,Adityapur-1">M P tower</option>
                            </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="filterPayment">Filter by Payment Method:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="filterPayment"
                                value={filterPayment}
                                onChange={(e) => setFilterPayment(e.target.value)}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI Payment</option>
                                <option value="Card">Card Payment</option>
                            </select>
                    </div>
                    <div style={{maxWidth:'240px'}}></div>
                    <div className="col-md-4">
                    <label htmlFor="orderNumber">Filter by Order No.:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Enter Order Number"
                    />
                    </div>
                    <br></br>
                    <br></br><center><br></br>
                    <div className="col-md-4 text-center align-self-end">
                        <button
                            className="btn btn-primary"
                            onClick={filterOrders}
                            style={{width:'120px'}}
                        >
                        Filter Sales
                        </button>
                    </div></center>
                </div>

                {/* Cancel Order Section */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <label htmlFor="cancelDate">Order Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="cancelDate"
                        value={cancelDate}
                        onChange={(e) => setCancelDate(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="cancelLocation">Location:</label>
                    <select
                        className="form-control"
                        id="cancelLocation"
                        value={cancelLocation}
                        onChange={(e) => setCancelLocation(e.target.value)}
                    >
                        <option value="">Select a location</option>
                        <option value="M.I.G,Adityapur-2">M.I.G</option>
                        <option value="Near Ganesh Puja Maidan,Kadma">Kadma</option>
                        <option value="Sakchi">Sakchi</option>
                        <option value="Bistupur">Bistupur</option>
                        <option value="Rd. No.: 11,Adityapur-2">Rd. No.: 11</option>
                        <option value="S-type Cafe,Adityapur-1">S-type Cafe</option>
                        <option value="M P tower,Adityapur-1">M P tower</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="orderNumber">Order Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Enter Order Number"
                    />
                </div>
                <div className="col-md-12 text-center mt-3">
                    <button
                        className="btn btn-danger"
                        onClick={() => cancelOrder(orderNumber, cancelDate, cancelLocation)}
                    >
                        Cancel Order
                    </button>
                </div>
                {/*{showCancelConfirmation &&(
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        width: '400px',
                    }}>
                        <p>Are you sure you want to cancel the order #{orderNumber} for {location} on {new Date(date).toLocaleDateString()}?</p>
                        <button style={{ marginRight: '10px' }} onClick={cancelOrder(orderNumber, cancelDate, cancelLocation)}>Confirm</button>
                        <button onClick={setCancelConfirmation(false)}>Cancel</button>
                    </div>
                </div>
            )}*/}
            </div>
            
            {showSuccessCancel &&(
                        
                        <div id="successBoxUpdate" 
                        style={{display:'block',width: '300px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', color: 'green', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <span style={{fontSize: '50px'}}>✔</span>
                        <p style={{color:'black'}}>Order Cancelled Successfully!</p>
                        </div> 
                    )}
            <div className="mt-5">
                {/* Order History */}
                <center><h2>Order History</h2></center>
                <button onClick={fetchOrders}>Refresh Orders</button>  {/* Refresh Button */}
                <div className="table-responsive"  style={{ maxHeight: '800px', maxWidth: '800px', overflowY: 'auto' }}>
                    <table className="admin_table table-striped">
                        <thead>
                            <tr>
                                <th>Order Number</th> {/* Add this column */}
                                <th>Order ID</th>
                                <th>Invoice No.</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Service Type</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Price (Rs.)</th>
                                <th>Total Amount (Rs.)</th>
                                <th>Payment Mode</th>
                                <th>Cancel</th> {/* Add Cancel Column */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <React.Fragment key={order._id}>
                                    {order.items.map((item, index) => (
                                        <tr key={item.name + index}>
                                            {index === 0 && (
                                                    <td rowSpan={order.items.length}>
                                                        {order.orderNumber} {/* Display orderNumber */}
                                                    </td>)}
                                                    {index === 0 && (
                                                    <td rowSpan={order.items.length}>
                                                        {order._id}
                                                    </td>)}
                                                    {index === 0 && (
                                                    <td rowSpan={order.items.length}>
                                                        {order.invoiceNumber}  {/* Display Invoice Number */}
                                                    </td>)}
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                            {index === 0 &&(
                                                <td rowSpan={order.items.length}>
                                                {order.serviceType}
                                            </td>)}
                                            {index === 0 &&(
                                                <td rowSpan={order.items.length}>
                                                {order.date}
                                            </td>)}
                                            {index === 0 &&(
                                                <td rowSpan={order.items.length}>
                                                {order.time}
                                            </td>)}
                                            {index === 0 &&(
                                            <td rowSpan={order.items.length}>
                                                {order.location}
                                                </td>)}
                                            <td>{item.price}</td>
                                            {index === 0 && (
                                                <td rowSpan={order.items.length}>
                                                    <strong>{order.totalAmount}</strong>
                                                </td>
                                            )}
                                            {index === 0 &&(
                                            <td rowSpan={order.items.length}>
                                                {order.payment}
                                                </td>)}
                                                {index === 0 && (
                                            <td rowSpan={order.items.length}>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => cancelOrder(order.orderNumber, order.date, order.location)}
                                                >Cancel
                                                </button>
                                            </td>
                                        )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                        {/* Total Sum Row */}

                        
                        <tfoot>
                        <tr>
                            <td colSpan="9" className="text-right"><strong>Total Sales Amount (Filtered):</strong></td>
                            <td><strong>Rs. {filteredTotalAmount}</strong></td>
                        </tr>
                        </tfoot>
                    </table>
                    
                </div><br></br>
                <div colSpan="8" className="text-right">
                    <strong>Total Sales Amount (Filtered): </strong>
                    <strong>  Rs. {filteredTotalAmount}</strong>
                    </div>
            </div>
            <div>
                <br></br>{/*<center>____________________________________________________________________________________</center> */}
                <hr className="hr-admin-divider" />
            <center><h4 onClick={() => {
                   setShowCanceledOrders(true);  // Call the first function
                   fetchCanceledOrders();        // Call the second function
                        }}
                    style={{color:'orange',cursor:'pointer', float:'left'}}>View Cancelled Orders ▼</h4></center>
                                    <div style={{maxWidth:'400px'}}></div>
                                    <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{backgroundColor:'red'}}
                                    onClick={() => setShowCanceledOrders(false)}
                                >
                                    <span>&times;</span>
                                </button>
                </div>
                <div>
                {showCanceledOrders && (
                <div>
                <div className="row mb-4">
                    <div className="col-md-4">
                        <label htmlFor="filterCanceledDate">Filter by Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="filterCanceledDate"
                                value={filterCanceledDate}
                                onChange={(e) => setFilterCanceledDate(e.target.value)}
                            />
                    </div>
                    
                    {/* Filter by Month */}
                    <div className="col-md-3">
                        <label htmlFor="filterCanceledMonth">Filter by Month:</label>
                        <input
                            type="month"
                            className="form-control"
                            style={{maxWidth:'230px'}}
                            id="filterCanceledMonth"
                            value={filterCanceledMonth}
                            onChange={(e) => setFilterCanceledMonth(e.target.value)}
                        />
                    </div> <div style={{maxWidth:'45px'}}></div>
                    <div className="col-md-4">
                        <label htmlFor="filterCanceledLocation">Filter by Location:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="filterCanceledLocation"
                                value={filterCanceledLocation}
                                onChange={(e) => setFilterCanceledLocation(e.target.value)}
                            >
                                <option value="">Select a location</option>
                                <option value="M.I.G,Adityapur-2">M.I.G</option>
                                <option value="Near Ganesh Puja Maidan,Kadma">Kadma</option>
                                <option value="Sakchi">Sakchi</option>
                                <option value="Bistupur">Bistupur</option>
                                <option value="Rd. No.: 11,Adityapur-2">Rd. No.: 11</option>
                                <option value="S-type Cafe,Adityapur-1">S-type Cafe</option>
                                <option value="M P tower,Adityapur-1">M P tower</option>
                            </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="filterCanceledPayment">Filter by Payment Method:</label>
                            <select
                                type="text"
                                className="form-control"
                                id="filterCanceledPayment"
                                value={filterCanceledPayment}
                                onChange={(e) => setFilterCanceledPayment(e.target.value)}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI Payment</option>
                                <option value="Card">Card Payment</option>
                            </select>
                    </div>
                    <div style={{maxWidth:'240px'}}></div>
                    <div className="col-md-4">
                    <label htmlFor="orderNumber">Filter by Order No.:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="Enter Order Number"
                    />
                    </div>
                    <br></br>
                    <br></br><center><br></br>
                    <div className="col-md-4 text-center align-self-end">
                        <button
                            className="btn btn-primary"
                            onClick={filterCanceledOrders}
                            style={{width:'200px'}}
                        >
                        Filter Cancelled Orders
                        </button>
                    </div></center></div><button onClick={fetchCanceledOrders}>Refresh Orders</button>  {/* Refresh Button */}
                    {canceledOrders && (
                        
                <div className="table-responsive"  style={{ maxHeight: '800px', maxWidth: '800px', overflowY: 'auto' }}>
                    
                    <table className="admin_table table-striped" >
                    <thead>
                        <tr>
                        <th>Order Number</th> {/* Add this column */}
                            <th>Order ID</th>
                            <th>Invoice No.</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Service Type</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Price (Rs.)</th>
                            <th>Total Amount (Rs.)</th>
                            <th>Payment Mode</th>
                            <th>Restore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {canceledOrders.map(order => (
                            <React.Fragment key={order._id}>
                            {order.items.map((item, index) => (
                                <tr key={item.name + index}>
                                    {index === 0 && (
                                            <td rowSpan={order.items.length}>
                                                {order.orderNumber} {/* Display orderNumber */}
                                            </td>)}
                                            {index === 0 && (
                                            <td rowSpan={order.items.length}>
                                                {order._id}
                                            </td>)}
                                            {index === 0 && (
                                            <td rowSpan={order.items.length}>
                                                {order.invoiceNumber}  {/* Display Invoice Number */}
                                            </td>)}
                                        <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    {index === 0 &&(
                                        <td rowSpan={order.items.length}>
                                        {order.serviceType}
                                    </td>)}
                                    {index === 0 &&(
                                        <td rowSpan={order.items.length}>
                                        {order.date}
                                    </td>)}
                                    {index === 0 &&(
                                        <td rowSpan={order.items.length}>
                                        {order.time}
                                    </td>)}
                                    {index === 0 &&(
                                    <td rowSpan={order.items.length}>
                                        {order.location}
                                        </td>)}
                                    <td>{item.price}</td>
                                    {index === 0 && (
                                        <td rowSpan={order.items.length}>
                                            <strong>{order.totalAmount}</strong>
                                        </td>
                                    )}
                                    {index === 0 &&(
                                    <td rowSpan={order.items.length}>
                                        {order.payment}
                                        </td>)}
                                    {index === 0 &&(
                                    <td rowSpan={order.items.length}>
                                    <button 
                                    className="restore-btn" 
                                    onClick={() => handleRestoreOrder(order._id)}>
                                    Restore Order
                                    </button>
                                    </td>)}
                                </tr>
                            ))}
                        </React.Fragment>
                        ))}
                    </tbody>
                </table><div colSpan="8" className="text-right">
                    <strong>Total Sales Amount (Cancelled): </strong>
                    <strong>  Rs. {filteredCanceledTotalAmount}</strong>
                    </div></div>
            ) }</div>
            )}
            
            </div>
            {/*<center>____________________________________________________________________________________</center> */}
            <hr className="hr-divider" />
            <br></br>
            
                     </div>
            )} 
            <hr className="hr-admin-divider" />
            <h4 onClick={() => {
                   setShowControls(true);  // Call the first function
                    // Call the second function
                        }}
                    style={{color:'orange',cursor:'pointer', float:'left' , paddingLeft:'20px'}}>View Admin Controls ▼</h4>
                                    
                                    <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{backgroundColor:'red'}}
                                    onClick={() => setShowControls(false)}
                                >
                                    <span>&times;</span>
                                </button>
            {showControls &&(
                <div style={{paddingLeft:'20px'}}>
                    <a onClick={() => setChangePasswordModal(true)}
                        style={{color:'skyBlue',cursor:'pointer'}}
                        >
                            <strong>* Change Admin Password</strong></a>

                    {showChangePasswordModal &&(
                    <div className="modal-overlay">
                            <div className="modal-content">
                            <h3><b className="text-center mb-4" style={{ color: 'orange' }}>Mr.</b>
                            <b className="text-center mb-4" style={{ color: 'green' }}> Veg </b></h3>
                                <h5>Change Admin Password</h5>
                        <div className="form-group">
                            <label htmlFor="new-password">Current Password:</label>
                        <input
                        type="password"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter current password"
                        />
                       </div>
                       <div className="form-group">
                       <label htmlFor="confirm-password">New Password:</label>
                       <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            placeholder="Confirm new password"
                        />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button className="change-password-btn" onClick={handleChangePassword}>
                        Change Password
                        </button>
                        <button className="close-btn" onClick={handlePasswordClose}>
                        Close
                        </button>
                        </div>
                        </div>)}
                        <hr className="hr-admin-divider" />
                        <br></br>
                        {showSuccessChangeAdminPassword &&(
                        
                        <div id="successBoxUpdate" 
                        style={{display:'block',width: '300px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', color: 'green', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <span style={{fontSize: '50px'}}>✔</span>
                        <p style={{color:'black'}}>Password Changed Successfully!</p>
                        </div> 
                        )}
                        
                        
                        <a onClick={() => setShowAddBranchModal(true)}
                        style={{color:'skyBlue',cursor:'pointer'}}
                        >
                        <strong>* Add Branch</strong></a>

                    {showAddBranchModal  &&(
                    <div className="modal-overlay">
                            <div className="modal-content">
                            <h3><b className="text-center mb-4" style={{ color: 'orange' }}>Mr.</b>
                            <b className="text-center mb-4" style={{ color: 'green' }}> Veg </b></h3>
                                <h5>Add Branch</h5>
                        <form onSubmit={handleAddBranch}>
                        <div className="form-group">
                            <label htmlFor="add-branch">Branch Name:</label>
                        <input
                        type="text"
                        id="branchName"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        className="form-control"
                        placeholder="example:Mr. Veg Kadma"
                        />
                       </div>
                       <div className="form-group">
                            <label htmlFor="add-branch">Create Branch ID:</label>
                        <input
                        type="text"
                        id="branchID"
                        value={branchID}
                        onChange={(e) => setBranchID(e.target.value)}
                        className="form-control"
                        placeholder="example:mrvegKadma@gmail.com"
                        />
                       </div>
                       <div className="form-group">
                       <label htmlFor="add-branch">Create Password:</label>
                       <input
                            type="password"
                            id="new-password"
                            value={newBranchPassword}
                            onChange={(e) => setNewBranchPassword(e.target.value)}
                            className="form-control"
                            placeholder="Create new password"
                        />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="create-branch-btn">
                        Create Branch
                        </button>
                        <button className="close-btn" onClick={() => setShowAddBranchModal(false)}>
                        Close
                        </button></form>
                        </div>
                        </div>)}
                        {showSuccessAddStaff &&(
                        
                        <div id="successBoxUpdate" 
                        style={{display:'block',width: '300px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', color: 'green', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <span style={{fontSize: '50px'}}>✔</span>
                        <p style={{color:'black'}}>Branch Added Successfully!</p>
                        </div> 
                    )}
                    <hr className="hr-admin-divider" />
                    <br></br>

                    <a onClick={() => setChangeStaffPasswordModal(true)}
                        style={{color:'skyBlue',cursor:'pointer'}}
                        >
                            <strong>* Change Branch Password</strong></a>
                    {showChangeStaffPasswordModal &&(
                    <div className="modal-overlay">
                            <div className="modal-content">
                                <h5>Change Branch  Password</h5>
                                <div className="form-group">
                            <label htmlFor="new-password">Create Branch ID:</label>
                        <input
                        type="text"
                        id="changeBranchID"
                        value={changeBranchID}
                        onChange={(e) => setChangeBranchID(e.target.value)}
                        className="form-control"
                        placeholder="example:mrvegKadma@gmail.com"
                        />
                       </div>
                        <div className="form-group">
                            <label htmlFor="new-password">Current Password:</label>
                        <input
                        type="password"
                        id="current-password"
                        value={currentStaffPassword}
                        onChange={(e) => setCurrentStaffPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter current password"
                        />
                       </div>
                       <div className="form-group">
                       <label htmlFor="confirm-password">New Password:</label>
                       <input
                            type="password"
                            id="new-password"
                            value={changeNewStaffPassword}
                            onChange={(e) => setChangeNewStaffPassword(e.target.value)}
                            className="form-control"
                            placeholder="Confirm new password"
                        />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button className="change-password-btn" onClick={handleChangeStaffPassword}>
                        Change Password
                        </button>
                        <button className="close-btn" onClick={handleStaffPasswordClose}>
                        Close
                        </button>
                        </div>
                        </div>)}
                        {showSuccessChangeStaffPassword &&(
                        
                        <div id="successBoxUpdate" 
                        style={{display:'block',width: '300px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', color: 'green', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <span style={{fontSize: '50px'}}>✔</span>
                        <p style={{color:'black'}}>Password Changed Successfully!</p>
                        </div> 
                        )}
                        <hr className="hr-admin-divider" />
                        <br></br>
            
            
            <a onClick={() => setShowCancelStaffModal(true)}
                        style={{color:'skyBlue',cursor:'pointer'}}
                        >
                            <strong>* Remove Branch</strong></a>
        {showCancelStaffModal && (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' ,color:'black'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h3><b className="text-center mb-4" style={{ color: 'orange' }}>Mr.</b>
                        <b className="text-center mb-4" style={{ color: 'green' }}> Veg </b></h3>
                            <h5 className="modal-title">_Remove Branch </h5>
                            
                        </div> {/*modal-body*/}
                        <div className="modal-body">
                            <form onSubmit={handleRemoveBranch}>
                                <div className="form-group">
                                    <label htmlFor="Cancel-Staff">Branch ID :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cancelBranchID"
                                        value={cancelBranchID}
                                        onChange={(e) => setCancelBranchID(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Cancel-Staff">Password :</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="cancelBranchPassword"
                                        value={cancelBranchPassword}
                                        onChange={(e) => setCancelBranchPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="change-password-btn">
                                Remove Branch
                                </button>
                                <button className="close-btn" onClick={handleCancelStaffClose}>
                                Close
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {showCancelStaffSuccessMessage &&(                
                        <div id="successBoxUpdate" 
                        style={{display:'block',width: '300px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', color: 'green', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <span style={{fontSize: '50px'}}>✔</span>
                        <p style={{color:'black'}}>Branch Removed Successfully!</p>
                        </div> 
                        )}
                        </div>
                        )}

                    {/*________________________________________________________________________ */}
                    
                    <hr className="hr-admin-divider" />
            <h4 onClick={() => {
                   setShowBranchControls(true);  // Call the first function
                    fetchStaffList();// Call the second function
                        }}
                    style={{color:'orange',cursor:'pointer', float:'left' , paddingLeft:'20px'}}>View Branch Controls ▼</h4>
                                    
                                    <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{backgroundColor:'red', marginRight:'20px'}}
                                    onClick={() => setShowBranchControls(false)}
                                >
                                    <span>&times;</span>
                                </button>
                    {showBranchControls &&(
                        <div className="table-responsive">
                    <div className="admin_container" style={{padding:'20px'}}>
                        <h2>Manage Branch</h2>
                            <table className="admin_table">
                                <thead>
                                    <tr>
                                        <th>Branch Name</th>
                                        <th>Branch ID</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffList.map((staff) => (
                                        <tr key={staff.staff_id}>
                                            <td>{staff.staffName}</td>
                                            <td>{staff.staff_id}</td>
                                            <td>{staff.active ? 'Active' : 'Deactivated'}</td>
                                        <td>
                                        <button onClick={() => toggleActivation(staff.staff_id, staff.active)}>
                                        {staff.active ? 'Deactivate' : 'Activate'}
                                        </button>
                                         </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div></div>)}

            <hr className="hr-admin-divider" />
            <br></br>
            <footer>
                <center>
                    <p style={{ color: 'grey' }}>&copy; 2024 Mr. Veg. All rights reserved.</p>
                </center>
                <p style={{color:'grey', fontSize:'10px', paddingLeft:'5px'}}>Administrator Page for Admin use only</p>
                
                <center><p style={{color:'grey', fontSize:'10px'}}> Powered by WIAS Technologies</p></center>
            </footer>
        </div>
    )}
    
    </div>
    );
};


export default App;
