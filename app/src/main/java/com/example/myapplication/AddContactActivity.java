package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class AddContactActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_contact);

        EditText usernameInput = findViewById(R.id.usernameInput);
        Button addContactButton = findViewById(R.id.addContactButton);
        addContactButton.setOnClickListener(v->{
            if(usernameInput.getText().toString().equals("chica")){
                finish();
            }else{
                Toast.makeText(this, "contact does not exist", Toast.LENGTH_SHORT).show();
                usernameInput.setText("");
            }

        });


    }
}