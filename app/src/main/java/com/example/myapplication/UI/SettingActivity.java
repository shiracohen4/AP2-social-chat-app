package com.example.myapplication.UI;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.RadioGroup;

import com.example.myapplication.R;

public class SettingActivity extends AppCompatActivity {
    private static final String THEME_PREFS_KEY = "theme_prefs";
    private static final String SELECTED_THEME_KEY = "selected_theme";
    private SharedPreferences sharedPreferences;
    private RadioGroup radioGroupTheme;
    private Button buttonSaveSettings;
    private Button buttonConnectServer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Retrieve the selected theme from SharedPreferences
        sharedPreferences = getSharedPreferences(THEME_PREFS_KEY, MODE_PRIVATE);
        int selectedTheme = sharedPreferences.getInt(SELECTED_THEME_KEY, R.style.LightTheme_MyApplication);
        setTheme(selectedTheme);

        setContentView(R.layout.activity_setting);

        radioGroupTheme = findViewById(R.id.radioGroupTheme);
        buttonSaveSettings = findViewById(R.id.buttonSaveSettings);
        buttonSaveSettings.setOnClickListener(v -> {
            applyTheme();
        });

        buttonConnectServer = findViewById(R.id.buttonConnectServer);
        buttonConnectServer.setOnClickListener(v -> {
            
        });
    }

    private void applyTheme() {
        int selectedRadioButtonId = radioGroupTheme.getCheckedRadioButtonId();
        int selectedTheme = R.style.LightTheme_MyApplication; // Default to Light theme
        if (selectedRadioButtonId == R.id.radioButtonDark) {
            selectedTheme = R.style.DarkTheme2_MyApplication; // Set to Dark theme
        }

        // Save the selected theme to SharedPreferences
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putInt(SELECTED_THEME_KEY, selectedTheme);
        editor.apply();

        finish();

        Intent intent = new Intent(this, LoginActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }
}














