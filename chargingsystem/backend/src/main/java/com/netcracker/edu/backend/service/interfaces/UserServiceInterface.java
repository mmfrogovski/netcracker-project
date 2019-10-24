package com.netcracker.edu.backend.service.interfaces;

import com.netcracker.edu.backend.entities.RegistrationData;
import com.netcracker.edu.backend.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserServiceInterface {
    List<User> getUsers();

    Optional<User> getUserById(long userId);

    User saveUser(User user);

    void deleteUserById(long userId);

    User registerUser(RegistrationData registrationData);
}
