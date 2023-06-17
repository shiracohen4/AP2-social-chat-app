package com.example.myapplication.UI;

import static android.content.Context.MODE_PRIVATE;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.myapplication.R;
import com.example.myapplication.models.Contact;
import com.example.myapplication.models.Message;
import com.example.myapplication.models.NewContact;
import com.example.myapplication.models.UserWithoutPass;
import com.example.myapplication.succeable.Successable;
import com.example.myapplication.viewModels.ContactsVM;

public class AddContactFragment extends Fragment implements Successable {

    private Button saveContact_btn;
    private EditText contactUsername_et;
    private String contactUsername;
    private ContactsVM contactsVM;
    private static final String THEME_PREFS_KEY = "theme_prefs";
    private static final String SELECTED_THEME_KEY = "selected_theme";
    private SharedPreferences sharedPreferences;



    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.activity_add_contact, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Retrieve the selected theme from SharedPreferences
        sharedPreferences = requireActivity().getSharedPreferences(THEME_PREFS_KEY, MODE_PRIVATE);
        int selectedTheme = sharedPreferences.getInt(SELECTED_THEME_KEY, R.style.LightTheme_MyApplication);
        requireActivity().setTheme(selectedTheme);

        contactUsername_et = view.findViewById(R.id.usernameInput);
        saveContact_btn = view.findViewById(R.id.addContactButton);
        contactsVM = new ViewModelProvider(requireActivity()).get(ContactsVM.class);
        contactsVM.setSuccessable(this);
        setListeners();
    }

    private void setListeners() {
        contactUsername_et.setOnKeyListener((v, keyCode, event) -> {
            contactUsername = this.contactUsername_et.getText().toString().trim();
            if (contactUsername == null || contactUsername.length() == 0) {
                contactUsername_et.setError("Username cannot be empty");
            }
            else {
                contactUsername_et.setError(null);
            }
            return false;
        });

        saveContact_btn.setOnClickListener(v -> {
            if (contactUsername != null || contactUsername.length() != 0) {
                NewContact newContact = new NewContact(contactUsername);
                contactsVM.add(newContact);
            }
            else {
                contactUsername_et.setError("Username cannot be empty");
            }
        });
    }

    @Override
    public void onSuccess() {
        String input = "Contact " + contactUsername + " has been added!";
        Toast.makeText(getActivity(), input, Toast.LENGTH_SHORT).show();

        // Hide the add contact fragment container
        ViewGroup addContactContainer = getActivity().findViewById(R.id.addContactFragmentContainer);
        addContactContainer.setVisibility(View.GONE);

        // Pop the AddContactFragment from the back stack to remove it
        getActivity().getSupportFragmentManager().popBackStack();

//        getActivity().onBackPressed();
    }

    @Override
    public void onFail() {
        String input = "Contact could not be added";
        Toast.makeText(getActivity(), input, Toast.LENGTH_SHORT).show();

        // Hide the add contact fragment container
        ViewGroup addContactContainer = getActivity().findViewById(R.id.addContactFragmentContainer);
        addContactContainer.setVisibility(View.GONE);

        // Pop the AddContactFragment from the back stack to remove it
        getActivity().getSupportFragmentManager().popBackStack();

//        getActivity().onBackPressed();
    }


//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//
//        // Retrieve the selected theme from SharedPreferences
//        sharedPreferences = getSharedPreferences(THEME_PREFS_KEY, MODE_PRIVATE);
//        int selectedTheme = sharedPreferences.getInt(SELECTED_THEME_KEY, R.style.LightTheme_MyApplication);
//        setTheme(selectedTheme);
//
//        setContentView(R.layout.activity_add_contact);
//
//        EditText usernameInput = findViewById(R.id.usernameInput);
//        Button addContactButton = findViewById(R.id.addContactButton);
//        addContactButton.setOnClickListener(v->{
//            if(usernameInput.getText().toString().equals("chica")){
//                finish();
//            }else{
//                Toast.makeText(this, "contact does not exist", Toast.LENGTH_SHORT).show();
//                usernameInput.setText("");
//            }
//
//        });


    }