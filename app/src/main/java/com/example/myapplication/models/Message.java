package com.example.myapplication.models;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.Date;

@Entity(tableName = "messages")
public class Message {
    @PrimaryKey(autoGenerate = true)
    private int id;
    private Date created;
    private UserWithoutPass sender;
    private String content;

    public Message(Date created, UserWithoutPass sender, String content) {
        this.created = created;
        this.sender = sender;
        this.content = content;
    }

    // Getters and setters for the properties

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public UserWithoutPass getSender() {
        return sender;
    }

    public void setSender(UserWithoutPass sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
