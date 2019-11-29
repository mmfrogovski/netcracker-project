package com.netcracker.edu.fapi.controllers;


import com.netcracker.edu.fapi.models.RegistrationData;
import com.netcracker.edu.fapi.models.User;
import com.netcracker.edu.fapi.services.interfaces.UsersServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @RequestMapping(value = "/users/register", method = RequestMethod.POST)
    public User registerUser(@RequestBody RegistrationData data) {
        return usersService.registerUser(data);
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.DELETE)
    public void deleteUserById(@PathVariable(name = "userId") long userId) {
        usersService.deleteUserById(userId);
    }

    @RequestMapping(value = "/users/{login}/{password}", method = RequestMethod.GET)
    public User getUserByLoginAndPassword(@PathVariable(name = "login") String login,
                                          @PathVariable(name = "password") String password) {
        return usersService.getUserByLoginAndPassword(login, password);
    }

    @RequestMapping(value = "/login/{login}", method = RequestMethod.GET)
    public User getUserByLogin(@PathVariable(name = "login") String login) {
        return usersService.findByLogin(login);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/current")
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // todo exclude password from model!
        return usersService.findByLogin(((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername());
    }

    @PreAuthorize("isAnonymous()")
    @RequestMapping(value = "/signup", method = RequestMethod.POST, produces = "application/json")
    public User saveUser(@RequestBody RegistrationData user) {
        return usersService.registerUser(user);
    }
}
