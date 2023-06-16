package com.example.myapplication.room;
import androidx.room.Dao;
import androidx.room.Insert;
import com.example.myapplication.models.Message;

@Dao
public interface MessageDAO {

    @Insert
    void insert(Message... Messages);


}
