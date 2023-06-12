package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.widget.Button;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        EditText login_et_username = findViewById(R.id.login_et_username);
        EditText login_et_password = findViewById(R.id.login_et_password);

        Button login_btn = findViewById(R.id.login_btn);
        login_btn.setOnClickListener(v -> {
            if (login_et_username.getText().toString().equals("joy") && login_et_password.getText().toString().equals("joyjoy")) {
                login_et_username.setText("");
                login_et_password.setText("");
                Intent intent = new Intent(LoginActivity.this, ChatlistActivity.class);
                intent.putExtra("username", login_et_username.getText().toString());
                startActivity(intent);
            }else{
                Toast.makeText(this, "wrong username or password", Toast.LENGTH_SHORT).show();
                login_et_username.setText("");
                login_et_password.setText("");
            }
        });


        Button goRegButton = findViewById(R.id.gotoreg_btn);
        goRegButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
            }
        });
    }
}