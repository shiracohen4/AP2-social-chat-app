package com.example.myapplication.UI;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.OpenableColumns;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;
import com.example.myapplication.R;
import com.example.myapplication.succeable.Successable;
import com.example.myapplication.viewModels.RegisterVM;
import java.util.regex.Pattern;


public class RegisterActivity extends AppCompatActivity implements Successable {

    private EditText usernameEditText;
    private EditText passwordEditText;
    private EditText confirmPasswordEditText;
    private EditText displayNameEditText;
    private ImageView imageView;
    private String profilePic;
    private Button uploadImageButton;
    private static final int PICK_IMAGE_REQUEST = 1;
    private RegisterVM registerViewModel;

//    private RegisterRepository userRepository;



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
        Button registerButton = findViewById(R.id.reg_btn);

        uploadImageButton.setOnClickListener(v -> openFileChooser());
        registerButton.setOnClickListener(v -> validateForm());

        registerViewModel = new ViewModelProvider(this).get(RegisterVM.class);
        registerViewModel.setSuccessable(this);


//        // Initialize the RegisterRepository
//        UserDB userDatabase = Room.databaseBuilder(getApplicationContext(),
//                UserDB.class, "user-database").build();
//        UserDAO userDAO = userDatabase.getUserDAO();
//        WebServiceAPI userService = RetrofitClient.createService(WebServiceAPI.class);
//        userRepository = new RegisterRepository(userDAO, userService);
    }

    private void validateForm() {
        String username = usernameEditText.getText().toString();
        String password = passwordEditText.getText().toString();
        String confirmPassword = confirmPasswordEditText.getText().toString();
        String displayName = displayNameEditText.getText().toString();

        if (username == null || username.length() == 0) {
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

        if (password == null || password.length() == 0) {
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

        if (displayName == null || displayName.length() == 0) {
            showError("Please enter a displayName");
            return;
        }
        registerViewModel.registerUser(username,password,displayName,profilePic);


        // Create a new User object with the form data
//        User user = new User(username, password, displayName, profilePic);

        // Call the RegisterRepository to register the user
//        userRepository.registerUser(user, new Callback<UserResponse>() {
//            @Override
//            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
//                // Handle the API response
//                if (response.isSuccessful()) {
//                    UserResponse userResponse = response.body();
//                    // Handle the successful registration
//                    Toast.makeText(RegisterActivity.this, "Registration successful!", Toast.LENGTH_SHORT).show();
//                    finish(); // Finish the activity and go back to the previous screen
//                } else {
//                    // Handle registration failure
//                    showError("Registration failed");
//                    Log.i("tag2", response.toString() );
//                }
//            }
//            @Override
//            public void onFailure(Call<UserResponse> call, Throwable t) {
//                // Handle API call failure
//                showError("Registration failed");
//                Log.i("tag","", t);
//            }
//        });
    }
    @Override
    public void onSuccess() {
        Toast.makeText(RegisterActivity.this, "Registration successful!", Toast.LENGTH_SHORT).show();
        finish(); // Finish the activity and go back to the previous screen - login screen todo: remember to update the info logged-user after logging
    }
    @Override
    public void onFail() {
        showError("Registration failed or username taken"); //API call failure (executing/getting response)/usernametaken
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
            // Set the profilePic variable with the image URI
            profilePic = imageUri.toString();
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
