package com.example.myapplication.models;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "contacts")
public class Contact {
    @PrimaryKey(autoGenerate = true)
    private int id;
    private UserWithoutPass user;
    private Message lastMessage;


    public Contact(UserWithoutPass user, Message lastMessage) {
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

    public Message getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(Message lastMessage) {
        this.lastMessage = lastMessage;
    }
}
