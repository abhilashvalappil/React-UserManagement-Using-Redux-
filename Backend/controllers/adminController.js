const User = require('../models/User')


// Create user
exports.fetchUser = async (req, res) => {
    console.log('areeeeeeeeeeeeeeeeeeee')

    try {
        let users = await User.find({ role: 'user' });
        console.log("usersusersusersusers",users);
        res.status(200).json({users});
        
        
        // res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// // Edit user
// exports.editUser = async (req, res) => {
//     const { id } = req.params;
//     const { name, email, role } = req.body;

//     try {
//         let user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         user.name = name || user.name;
//         user.email = email || user.email;
//         user.role = role || user.role;

//         await user.save();
//         res.json({ message: 'User updated successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Delete user
// exports.deleteUser = async (req, res) => {
//     const { id } = req.params;

//     try {
//         let user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         await user.remove();
//         res.json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };