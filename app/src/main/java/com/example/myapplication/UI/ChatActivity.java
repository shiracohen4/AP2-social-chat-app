package com.example.myapplication.UI;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Base64;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.R;
import com.example.myapplication.adapters.MessageListAdapter;
import com.example.myapplication.utilities.Info;
import com.example.myapplication.viewModels.MessagesVM;

public class ChatActivity extends AppCompatActivity {
    MessagesVM messagesViewModel;
    MessageListAdapter adapter;
    Bitmap bitmap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        messagesViewModel = new ViewModelProvider(this).get(MessagesVM.class);

        bitmap = null;
        setNicknameHeader();
        setPictureHeader();
        setMessageList(); //display chat messages

    }


    private void setNicknameHeader() {
        Intent currentIntent = getIntent();
        Bundle props = currentIntent.getExtras();

        TextView contactNicknameTV = findViewById(R.id.ChatDisplayName);
        contactNicknameTV.setText(props.get("contactDisplayName").toString());
    }

    private void setPictureHeader() {
        Intent currentIntent = getIntent();
        Bundle props = currentIntent.getExtras();

        // check if this contact is in our room db as a user and get his picture
        ImageView contactPictureTV = findViewById(R.id.ChatProfilePic);
        String picContact = props.get("contactProfilePic").toString();

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.FROYO && picContact != "") {
            byte[] profileImage = Base64.decode(picContact, Base64.DEFAULT);
            bitmap = BitmapFactory.decodeByteArray(profileImage, 0, profileImage.length);
            contactPictureTV.setImageBitmap(bitmap);
        }
    }

    private void setMessageList() {
        RecyclerView messagesListRV = findViewById(R.id.messagesRecyclerView);
        messagesListRV.setLayoutManager(new LinearLayoutManager(this));
        adapter = new MessageListAdapter(Info.context);

        messagesViewModel.get().observe(this, messages -> {
            adapter.setMessageList(messages);
        });

        messagesListRV.setAdapter(adapter);
    }
}