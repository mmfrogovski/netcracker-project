package com.netcracker.edu.fapi.services.interfaces;

import com.netcracker.edu.fapi.models.RegistrationData;
import com.netcracker.edu.fapi.models.User;

import java.util.List;

public interface UsersServiceInterface {
    List<User> getUsers();

    User getUserById(long userId);

    User saveUser(User user);

    void deleteUserById(long userId);

    User registerUser(RegistrationData registrationData);
}
