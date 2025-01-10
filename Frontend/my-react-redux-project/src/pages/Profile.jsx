import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const user = useSelector((state) => state.auth.user);
  console.log("user",user);

  const [formData, setFormData] = useState({
    username: user.user.username,
    email: user.user.email,
    profileImage: user.user.dp || "/api/placeholder/200/200"
  });

  console.log("formDataformDataformData",formData);
  
  const { username, email, profileImage } = formData;
  console.log("qqqqqqqqqqqqqqqqqqqqq",
    username,
     email,
      profileImage
  );
  
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to send the image along with other data
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
  
    if (selectedImage) {
      formDataToSend.append("profileImage", selectedImage); // Add the selected image
    }
  
    try {
      const response = await axios.post('http://localhost:3000/user/update-profile', {username,email, profileImage});
      console.log("responseeeeeeeeeeee",response);
      
  
      if (response.ok) {
        const result = await response.json();
        console.log("Profile updated successfully:", result);
  
        // Update local user state if needed
        setIsEditing(false);
        setIsModalOpen(false);
      } else {
        console.error("Failed to update profile:", await response.text());
      }
    } catch (error) {
      console.error("Error while updating profile:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-sky-500 h-48 md:h-64"></div>
          
          <div className="px-4 sm:px-6 lg:px-8 pb-8">
            <div className="relative -mt-24 sm:-mt-32 flex flex-col items-center">
              {/* Profile Image */}
              <img
              src={user.user.dp|| "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0mpEAFXv-iIa50q5rA2L6nnHGy_akXDFyQQ&s"}
                alt="Profile"
                className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-lg"
              />
              
              {/* User Info */}
              <div className="mt-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {username}
                </h1>
                <p className="text-gray-600 mt-2">{email}</p>
                
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setIsModalOpen(true)}}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium
                  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  transition-colors duration-200"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6"  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="flex flex-col items-center">
                <img
                  src={previewImage!==""?previewImage:(user.user.dp||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0mpEAFXv-iIa50q5rA2L6nnHGy_akXDFyQQ&s")}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Choose Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  // value={user.user.username}
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  // onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  // value={user.user.email}
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  // onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium 
                hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors duration-200"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
