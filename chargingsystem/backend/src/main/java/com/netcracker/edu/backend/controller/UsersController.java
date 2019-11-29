package com.netcracker.edu.backend.controller;


import com.netcracker.edu.backend.entities.RegistrationData;
import com.netcracker.edu.backend.entities.User;
import com.netcracker.edu.backend.service.interfaces.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UsersController {

    private UserServiceInterface usersService;

    @Autowired
    public UsersController(UserServiceInterface usersService) {
        this.usersService = usersService;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getUsers() {
        return usersService.getUsers();
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserById(@PathVariable(name = "userId") long userId) {
        Optional<User> user = usersService.getUserById(userId);
        return user.isPresent() ? ResponseEntity.ok(user.get()) : ResponseEntity.notFound().build();
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

    @RequestMapping(value = "/users/{login}/{password}", method = RequestMethod.GET)
    public User getUserByLoginAndPassword(@PathVariable(name="login") String login,
                                          @PathVariable(name = "password") String password){
        return usersService.getUserByLoginAndPassword(login, password);
    }

    @RequestMapping(value = "/login/{login}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserByLogin(@PathVariable(name = "login") String login) {
        User user = usersService.findByLogin(login);
        return ResponseEntity.ok(user);
    }
}
