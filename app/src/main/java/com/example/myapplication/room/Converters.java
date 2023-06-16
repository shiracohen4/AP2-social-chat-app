package com.example.myapplication.room;

import androidx.room.TypeConverter;

import com.example.myapplication.models.Message;
import com.example.myapplication.models.UserWithoutPass;
import com.google.gson.Gson;

import java.util.Date;

public class Converters {
    @TypeConverter
    public static UserWithoutPass fromUserString(String value) {
        return new Gson().fromJson(value, UserWithoutPass.class);
    }

    @TypeConverter
    public static String toUserString(UserWithoutPass user) {
        return new Gson().toJson(user);
    }

    @TypeConverter
    public static Message fromMessageString(String value) {
        return new Gson().fromJson(value, Message.class);
    }

    @TypeConverter
    public static String toMessageString(Message message) {
        return new Gson().toJson(message);
    }

    @TypeConverter
    public static Date fromTimestamp(Long value) {
        return value == null ? null : new Date(value);
    }

    @TypeConverter
    public static Long dateToTimestamp(Date date) {
        return date == null ? null : date.getTime();
    }
}

