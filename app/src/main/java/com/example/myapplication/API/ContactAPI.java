package com.example.myapplication.API;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import com.example.myapplication.models.Contact;
import com.example.myapplication.room.ContactDAO;
import com.example.myapplication.service.WebServiceAPI;
import com.example.myapplication.succeable.Successable;
import com.example.myapplication.utilities.Info;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ContactAPI {
    private ContactDAO contactDao;
    private Retrofit retrofit;
    private WebServiceAPI webServiceAPI;
    private Successable successable;


    public ContactAPI(ContactDAO contactDao) {
        Gson gson = new GsonBuilder().setLenient().create();
        this.retrofit = new Retrofit.Builder()
                .baseUrl(Info.baseUrlServer +
                        Info.serverPort + "/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        this.webServiceAPI = this.retrofit.create(WebServiceAPI.class);
        this.contactDao = contactDao;
    }

    public void setSuccessable(Successable successable) {
        this.successable = successable;
    }


    public void getAllContacts(MutableLiveData<List<Contact>> contacts, String token) { //contacts=contactListData[liveData List<Contact>] of repository
        Call<List<Contact>> call = webServiceAPI.getAllContacts(token);
        call.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(@NonNull Call<List<Contact>> call,
                                   @NonNull Response<List<Contact>> response) {
                new Thread(() -> {
                    contactDao.clear(); //delete all contacts records
                    if (response.body() == null) {
                        return;
                    }

                    // add the all contacts to the dao
                    for (Contact contact : response.body()) { //update the local db with the the server contacts
                        contactDao.insert(contact);
                    }
                    contacts.postValue(response.body()); //push to the repository xcontactListData the full contacts items
                }).start();
                //todo: onSuccess()?
            }

            @Override
            public void onFailure(@NonNull Call<List<Contact>> call, @NonNull Throwable t) {
                //todo
            }
        });
    }

}