package com.example.myapplication.models;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "contacts")
public class Contact {
    @PrimaryKey
    private int id;
    private UserWithoutPass user;
    private lastMessage lastMessage;


    public Contact(int id, UserWithoutPass user, lastMessage lastMessage) {
        this.id = id;
        this.user = user;
        this.lastMessage = lastMessage;
    }

    // Getters and setters for the properties

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserWithoutPass getUser() {
        return user;
    }

    public void setUser(UserWithoutPass user) {
        this.user = user;
    }

    public lastMessage getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(lastMessage lastMessage) {
        this.lastMessage = lastMessage;
    }

    public String toString() {
        String content = "";
        if(lastMessage != null){content = lastMessage.getContent();};
        return "User{" +
                "id='" + id + '\'' +
                ", user ='" + user.getUsername() + '\'' +
                ", lastMessage..'" + content
        + '\''+'}' ; //todo:to delete getContent() cause might be null
    }
}
