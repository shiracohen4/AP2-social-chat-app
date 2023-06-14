package com.example.myapplication.Repository;
import android.os.AsyncTask;
import com.example.myapplication.room.User;
import com.example.myapplication.room.UserDAO;
import com.example.myapplication.room.UserResponse;
import com.example.myapplication.service.UserService;
import retrofit2.Callback;

public class UserRepository {
    private UserDAO userDAO;
    private UserService userService;

    public UserRepository(UserDAO userDAO, UserService userService) {
        this.userDAO = userDAO;
        this.userService = userService;
    }

    public void registerUser(User user, Callback<UserResponse> callback) {
        // Perform validation or any additional logic here

        // Insert the user into the local database
        new InsertUserTask(userDAO).execute(user);

        // Call the API to register the user asynchronously
//        userService.registerUser(user).enqueue(callback);
    }

    private static class InsertUserTask extends AsyncTask<User, Void, UserResponse> {
        private UserDAO userDAO;

        public InsertUserTask(UserDAO userDAO) {
            this.userDAO = userDAO;
        }

        @Override
        protected UserResponse doInBackground(User... users) {
            // Insert the user into the local database
            userDAO.insert(users[0]);
            return null;
        }
    }
}


