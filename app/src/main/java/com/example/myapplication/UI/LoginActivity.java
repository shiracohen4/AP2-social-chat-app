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

import com.example.myapplication.R;

public class LoginActivity extends AppCompatActivity {
    private static final String THEME_PREFS_KEY = "theme_prefs";
    private static final String SELECTED_THEME_KEY = "selected_theme";
    private SharedPreferences sharedPreferences;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Retrieve the selected theme from SharedPreferences
        sharedPreferences = getSharedPreferences(THEME_PREFS_KEY, MODE_PRIVATE);
        int selectedTheme = sharedPreferences.getInt(SELECTED_THEME_KEY, R.style.LightTheme_MyApplication);
        setTheme(selectedTheme);


        //get the username and password views
        EditText login_et_username = findViewById(R.id.login_et_username);
        EditText login_et_password = findViewById(R.id.login_et_password);

        ImageButton setting_btn = findViewById(R.id.setting_btn);
        setting_btn.setOnClickListener(v->{
            startActivity(new Intent(LoginActivity.this, SettingActivity.class));
            finish();
        });

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