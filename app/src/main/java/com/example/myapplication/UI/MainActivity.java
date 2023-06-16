package com.example.myapplication.UI;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.example.myapplication.R;
import com.example.myapplication.viewModels.ContactsVM;

public class MainActivity extends AppCompatActivity {
    private ContactsVM contactsViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        contactsViewModel = new ViewModelProvider(this).get(ContactsVM.class); //VM that will contain the contacts list that onActive being updated from the service8
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, new ChatlistFragment())
                .commit();
    }
}