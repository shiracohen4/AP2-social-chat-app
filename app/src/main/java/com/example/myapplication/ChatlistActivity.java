package com.example.myapplication;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

public class ChatlistActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chatlist);

        ImageButton logoutButton = findViewById(R.id.logoutButton);
        logoutButton.setOnClickListener(v->finish());

        ImageButton setting_btn = findViewById(R.id.setting_btn);
        setting_btn.setOnClickListener(v->{
            startActivity(new Intent(ChatlistActivity.this,SettingActivity.class));
        });


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