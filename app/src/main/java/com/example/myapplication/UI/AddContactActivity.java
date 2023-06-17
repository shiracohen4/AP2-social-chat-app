package com.example.myapplication.UI;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.myapplication.R;

public class AddContactActivity extends AppCompatActivity {

    private static final String THEME_PREFS_KEY = "theme_prefs";
    private static final String SELECTED_THEME_KEY = "selected_theme";
    private SharedPreferences sharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Retrieve the selected theme from SharedPreferences
        sharedPreferences = getSharedPreferences(THEME_PREFS_KEY, MODE_PRIVATE);
        int selectedTheme = sharedPreferences.getInt(SELECTED_THEME_KEY, R.style.LightTheme_MyApplication);
        setTheme(selectedTheme);

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