package com.example.myapplication.API;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import com.example.myapplication.models.Message;
import com.example.myapplication.room.MessageDAO;
import com.example.myapplication.service.WebServiceAPI;
import com.example.myapplication.utilities.Info;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MessageAPI {

    private MessageDAO messageDao;
    private Retrofit retrofit;
    private WebServiceAPI webServiceAPI;

    public MessageAPI(MessageDAO messageDao) {
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSSS").setLenient().create();
        this.retrofit = new Retrofit.Builder()
                .baseUrl(Info.baseUrlServer +
                        Info.serverPort + "/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        this.webServiceAPI = this.retrofit.create(WebServiceAPI.class);
        this.messageDao = messageDao;
    }

    public void getAllMessages(MutableLiveData<List<Message>> messages, String token,
                               String contactId) {
        Call<List<Message>> call = webServiceAPI.getMessages(contactId, token);
        call.enqueue(new Callback<List<Message>>() {
            @Override
            public void onResponse(@NonNull Call<List<Message>> call,
                                   @NonNull Response<List<Message>> response) {
                if (response.isSuccessful() && response.code() == 200) {
                    new Thread(() -> {
                        messageDao.clear();
                        if (response.body() == null || response.body().isEmpty()) {
                            return; //if there is no messages in the chat
                        }

                        // add the all messages to the dao
                        for (Message message : response.body()) {
                            message.setChatId(contactId);
                            messageDao.insert(message);
                        }
                        messages.postValue(response.body());
                    }).start();
                }
                else{
                    Log.e("error", "server response was not successful or != 200");
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<Message>> call, @NonNull Throwable t) {
                Log.e("error2", "onFailure",t);
            }
        });
    }
}
