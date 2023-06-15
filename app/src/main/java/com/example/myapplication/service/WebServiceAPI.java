package com.example.myapplication.service;
import com.example.myapplication.models.Login;
import com.example.myapplication.models.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface WebServiceAPI {
    @POST("/api/Users")
    Call<Void> registerUser(@Body User user);

    @POST("/api/Tokens")
    Call<String> logIn(@Body Login login);
}
