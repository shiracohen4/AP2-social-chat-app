package com.example.myapplication.UI;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.OpenableColumns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.myapplication.R;

import java.util.regex.Pattern;

public class RegisterActivity extends AppCompatActivity {

    private EditText usernameEditText;
    private EditText passwordEditText;
    private EditText confirmPasswordEditText;

    private EditText displayNameEditText;
    private ImageView imageView;
    private Button uploadImageButton;
    private static final int PICK_IMAGE_REQUEST = 1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        usernameEditText = findViewById(R.id.reg_et_username);
        passwordEditText = findViewById(R.id.reg_et_password);
        confirmPasswordEditText = findViewById(R.id.reg_et_confirmPassword);
        displayNameEditText = findViewById(R.id.reg_et_displayName);
        imageView = findViewById(R.id.imageView);
        uploadImageButton = findViewById(R.id.uploadImage_btn);
        uploadImageButton.setOnClickListener(v -> openFileChooser());


        Button registerButton = findViewById(R.id.reg_btn);
        registerButton.setOnClickListener(v -> validateForm());
    }

    private void validateForm() {
        String username = usernameEditText.getText().toString();
        String password = passwordEditText.getText().toString();
        String confirmPassword = confirmPasswordEditText.getText().toString();
        String displayName = displayNameEditText.getText().toString();

        if (username.isEmpty()) {
            showError("Please enter a username");
            return;
        }

        if (username.length() < 3) {
            showError("Please enter at least 3 characters for the username");
            usernameEditText.setText("");
            return;
        }

        if (!Pattern.matches("[a-zA-Z0-9_]{3,}", username)) {
            showError("Please enter a valid username (a-z/A-Z/0-9/_)");
            usernameEditText.setText("");
            return;
        }

        if (password.isEmpty()) {
            showError("Please enter a password");
            return;
        }

        if (password.length() < 5) {
            showError("Please enter at least 5 characters for the password");
            passwordEditText.setText("");
            return;
        }

        if (!Pattern.matches("[a-zA-Z0-9]{5,}", password)) {
            showError("Please enter a valid password (a-z/A-Z/0-9)");
            passwordEditText.setText("");
            return;
        }

        if (!password.equals(confirmPassword)) {
            showError("Password and confirm password do not match");
            confirmPasswordEditText.setText("");
            return;
        }

        if (displayName.isEmpty()) {
            showError("Please enter a displayName");
            return;
        }


        Toast.makeText(this, "Registration successful!", Toast.LENGTH_SHORT).show();
        finish(); // Finish the activity and go back to the previous screen
    }

    private void showError(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    private void openFileChooser() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(intent, PICK_IMAGE_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            Uri imageUri = data.getData();

            // Check image size
            long imageSize = getImageSize(imageUri);
            if (imageSize > 1024 * 1024) {
                showError("Image size exceeds 1MB");
                imageView.setImageDrawable(null);
                return;
            }

            imageView.setImageURI(imageUri);
        }
    }

    private long getImageSize(Uri uri) {
        Cursor cursor = getContentResolver().query(uri, null, null, null, null);
        int sizeIndex = cursor.getColumnIndex(OpenableColumns.SIZE);
        cursor.moveToFirst();
        long size = cursor.getLong(sizeIndex);
        cursor.close();
        return size;
    }
}
