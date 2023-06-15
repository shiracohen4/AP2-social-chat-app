package com.example.myapplication.API;

import android.util.Log;

import androidx.annotation.NonNull;

import com.example.myapplication.models.Login;
import com.example.myapplication.service.WebServiceAPI;
import com.example.myapplication.succeable.Successable;
import com.example.myapplication.utilities.Info;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonPrimitive;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginAPI {
    Retrofit retrofit;
    WebServiceAPI webServiceAPI;
    Successable successable;

    public LoginAPI(Successable s) {
        Gson gson = new GsonBuilder().setLenient().create();
        retrofit = new Retrofit.Builder()
                .baseUrl(Info.baseUrlServer + Info.serverPort + "/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
        successable = s;
    }

    public void loginToServer(String username , String password){
        Call<String> call = webServiceAPI.logIn(new Login(username, password));
        call.enqueue(new Callback<String>(){
            @Override
            public void onResponse(@NonNull Call <String> call, @NonNull Response<String> response){
                if(response.code() == 200 && response.body() != null){
                    String token = response.body();
                    Info.loggerUserToken = token;
                    Info.loggedUser = username;
                    successable.onSuccess();
                }else{
                    Log.i("code1", String.valueOf(response.code()));
                    if(response.body() != null){
                        Log.i("code2", String.valueOf(response.body()));
                    }
                    Info.loggedUser = null;
                    Info.loggerUserToken = null;
                    successable.onFail();
                }
            }
            @Override
            public void onFailure(@NonNull Call<String> call, @NonNull Throwable t) {
                Log.i("tag2", "on failure", t);
                Info.loggedUser = null;
                Info.loggerUserToken = null;
                successable.onFail();
            }

        });
    }
}
