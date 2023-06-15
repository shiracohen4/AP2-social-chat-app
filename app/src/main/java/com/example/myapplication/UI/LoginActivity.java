package com.example.myapplication.UI;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.widget.Button;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.myapplication.API.LoginAPI;
import com.example.myapplication.R;
import com.example.myapplication.succeable.Successable;
import com.example.myapplication.utilities.Info;

public class LoginActivity extends AppCompatActivity implements Successable {
    private static final String THEME_PREFS_KEY = "theme_prefs";
    private static final String SELECTED_THEME_KEY = "selected_theme";
    private SharedPreferences sharedPreferences;

    private EditText login_et_username;
    private EditText login_et_password;
    private String username;
    private String password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Retrieve the selected theme from SharedPreferences
        sharedPreferences = getSharedPreferences(THEME_PREFS_KEY, MODE_PRIVATE);
        int selectedTheme = sharedPreferences.getInt(SELECTED_THEME_KEY, R.style.LightTheme_MyApplication);
        setTheme(selectedTheme);


        //get the username and password views
        login_et_username = findViewById(R.id.login_et_username);
        login_et_password = findViewById(R.id.login_et_password);
        Button login_btn = findViewById(R.id.login_btn);
        ImageButton setting_btn = findViewById(R.id.setting_btn);
        Button goRegButton = findViewById(R.id.gotoreg_btn);
        //extract username and password values
        username = login_et_username.getText().toString();
        password = login_et_password.getText().toString();


        setting_btn.setOnClickListener(v -> {
            startActivity(new Intent(LoginActivity.this, SettingActivity.class));
            finish();
        });

        goRegButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
            }
        });

        login_btn.setOnClickListener(v -> {
            LoginAPI loginAPI = new LoginAPI(this);
            loginAPI.loginToServer(username, password);
        });
    }


    public void onSuccess() {
        Toast.makeText(this, "Welcome" + Info.loggedUser + "!",
                Toast.LENGTH_SHORT).show();
        login_et_username.setText("");
        login_et_password.setText("");
        Intent intent = new Intent(LoginActivity.this, ChatlistActivity.class);
        startActivity(intent);
    }

    @Override
    public void onFail() {
        login_et_username.setText("");
        login_et_password.setText("");
        Toast.makeText(Info.context, "wrong username or password or something went wrong", Toast.LENGTH_SHORT).show();
    }

}