package com.example.myapplication.room;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

@Dao
public interface UserDAO {
    @Insert
    void insert(User user);
//
//    @Query("SELECT id, username, displayName, profilePic FROM users WHERE username = :username")
//    User getUserByUsername(String username);

}
