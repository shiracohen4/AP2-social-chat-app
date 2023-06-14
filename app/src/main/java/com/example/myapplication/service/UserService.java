package com.example.myapplication.service;
import com.example.myapplication.room.User;
import com.example.myapplication.room.UserResponse;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface UserService {
    @POST("/api/Users")
    Call<UserResponse> registerUser(@Body User user);
}
