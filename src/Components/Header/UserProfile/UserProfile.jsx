import React, { useState } from "react";

export default function UserProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [organizationName, setOrganizationName] = useState("My Organization");
  const [githubLink, setGithubLink] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOrganizationNameChange = (event) => {
    setOrganizationName(event.target.value);
  };

  const handleGithubLinkChange = (event) => {
    setGithubLink(event.target.value);
  };

  const handleSaveChanges = () => {
    // Handle the logic for saving changes (e.g., sending data to the backend)
    console.log("Profile Image:", profileImage);
    console.log("Organization Name:", organizationName);
    console.log("GitHub Link:", githubLink);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

        {/* Profile Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover mt-2"
            />
          )}
        </div>

        {/* Organization Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Organization Name</label>
          <input
            type="text"
            value={organizationName}
            onChange={handleOrganizationNameChange}
            className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none"
          />
        </div>

        {/* GitHub Link Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Organization's GitHub Link</label>
          <input
            type="text"
            value={githubLink}
            onChange={handleGithubLinkChange}
            className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
