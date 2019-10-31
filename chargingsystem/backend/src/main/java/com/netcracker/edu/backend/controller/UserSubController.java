package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entities.UserSubscription;
import com.netcracker.edu.backend.service.interfaces.UserSubInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
public class UserSubController {
    private UserSubInterface userSubInterface;

    @Autowired
    public UserSubController(UserSubInterface userSubInterface) {
        this.userSubInterface = userSubInterface;
    }

    @RequestMapping(value = "/users_subs", method = RequestMethod.GET)
    public List<UserSubscription> getUsersSub() {
        return userSubInterface.getUsersSub();
    }

    @RequestMapping(value = "/users_subs/{subId}", method = RequestMethod.GET)
    public ResponseEntity<UserSubscription> getUserSubById(@PathVariable(name = "subId") long subId) {
        Optional<UserSubscription> userSubscription = userSubInterface.getUserSubBySubId(subId);
        return userSubscription.isPresent() ? ResponseEntity.ok(userSubscription.get()) : ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/users_subs", method = RequestMethod.POST)
    public UserSubscription saveUserSub(@RequestBody UserSubscription userSubscription) {
        return userSubInterface.saveUserSub(userSubscription);
    }

    @RequestMapping(value = "users_subs/{id}", method = RequestMethod.DELETE)
    public void deleteUserSubById(@PathVariable(name = "id") long id) {
        userSubInterface.deleteUserSubById(id);
    }
}
