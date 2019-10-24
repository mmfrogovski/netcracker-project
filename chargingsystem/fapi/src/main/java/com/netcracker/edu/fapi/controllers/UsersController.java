package com.netcracker.edu.fapi.controllers;


import com.netcracker.edu.fapi.models.RegistrationData;
import com.netcracker.edu.fapi.models.User;
import com.netcracker.edu.fapi.services.interfaces.UsersServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class UsersController {

    private UsersServiceInterface usersService;

    @Autowired
    public UsersController(UsersServiceInterface usersService) {
        this.usersService = usersService;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getUsers() {
        return usersService.getUsers();
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserById(@PathVariable(name = "userId") long userId) {
        User user = usersService.getUserById(userId);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public User saveUser(@RequestBody User user) {
        return usersService.saveUser(user);
    }


    @RequestMapping(value = "/users/register", method = RequestMethod.POST)
    public User registerUser(@RequestBody RegistrationData data) {
        return usersService.registerUser(data);
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.DELETE)
    public void deleteUserById(@PathVariable(name = "userId") long userId) {
        usersService.deleteUserById(userId);
    }


}
