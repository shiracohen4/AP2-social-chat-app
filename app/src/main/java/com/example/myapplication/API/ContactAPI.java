package com.example.myapplication.API;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.MutableLiveData;

import com.example.myapplication.models.Contact;
import com.example.myapplication.models.NewContact;
import com.example.myapplication.models.User;
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

    public void addContact(NewContact contact, String username, String token,
                           MutableLiveData<List<Contact>> contacts) {
//        Invitation invitation = new Invitation(username, contact.getId(), "localhost:5146");
//        Retrofit contactRetrofit = new Retrofit.Builder()
//                .baseUrl(Info.baseUrlServer + Info.serverPort + "/")
//                .addConverterFactory(GsonConverterFactory.create())
//                .build();
//        WebServiceAPI contactServerApi = contactRetrofit.create(WebServiceAPI.class);
//        Call<Void> call = contactServerApi.postInvitation(invitation);
        Call<Contact> call = webServiceAPI.addChat(token, contact);
        call.enqueue(new Callback<Contact>() {
            @Override
            public void onResponse(@NonNull Call<Contact> call, @NonNull Response<Contact> response) {
                if (response.isSuccessful()) {
                    successable.onSuccess();
                    Log.i("chat_res", response.body().toString());

                    Contact res_contact = response.body();

                    contactDao.insert(res_contact);
                    List<Contact> newContacts = contacts.getValue();
                    newContacts.add(res_contact);
                    contacts.postValue(newContacts);

                    // send after invitation, post for the contact
//                    addToMyServer(contact, token, contacts);

                } else if(successable != null){
                    successable.onFail();
                }
            }

            @Override
            public void onFailure(@NonNull Call<Contact> call, @NonNull Throwable t) {
                if(successable != null) {
                    successable.onFail();
                }
            }
        });
    }

}