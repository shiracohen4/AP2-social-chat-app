package com.example.myapplication.UI;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.myapplication.R;

public class ChatlistActivity extends AppCompatActivity {

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

        setContentView(R.layout.activity_chatlist);

        ImageButton logoutButton = findViewById(R.id.logoutButton);
        logoutButton.setOnClickListener(v->finish());




        Intent intent = getIntent();
        String username = intent.getStringExtra("username");
        //get real info about this user from the server
        String displayNameStr = "joya";
        int myImage = R.drawable.pic2;

        TextView displayName = findViewById(R.id.displayName);
        displayName.setText(displayNameStr);
        ImageView profilePic = findViewById(R.id.profilePic);
        profilePic.setImageResource(myImage);


        ImageButton button_addChat = findViewById(R.id.button_addChat);
        button_addChat.setOnClickListener(v->{
            startActivity(new Intent(ChatlistActivity.this,AddContactActivity.class));
        });
    }
}