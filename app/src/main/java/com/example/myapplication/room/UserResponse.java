package com.example.myapplication.room;

public class UserResponse {
    private String username;
    private String displayName;
    private String profilePic;

    // Empty constructor (required for deserialization)
    public UserResponse() {
    }

    // Constructor with all fields (optional)
    public UserResponse(String username, String displayName, String profilePic) {
        this.username = username;
        this.displayName = displayName;
        this.profilePic = profilePic;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
}

