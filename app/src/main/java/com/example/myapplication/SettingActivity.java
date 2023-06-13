package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioGroup;

public class SettingActivity extends AppCompatActivity {
    RadioGroup radioGroupTheme;
    Button buttonSaveSettings;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_setting);

        radioGroupTheme = findViewById(R.id.radioGroupTheme);
        buttonSaveSettings = findViewById(R.id.buttonSaveSettings);
        buttonSaveSettings.setOnClickListener(v -> applyTheme());
        finish();
    }

    private void applyTheme() {
        int selectedRadioButtonId = radioGroupTheme.getCheckedRadioButtonId();
        if (selectedRadioButtonId == R.id.radioButtonLight) {
            setTheme(R.style.LightTheme); // Light theme
        } else if (selectedRadioButtonId == R.id.radioButtonDark) {
            setTheme(R.style.DarkTheme); // Dark theme
        }
        recreate(); // Recreate the activity to apply the selected theme
    }
}














