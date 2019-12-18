package com.netcracker.edu.fapi.controllers;


import com.netcracker.edu.fapi.models.UserSubscription;
import com.netcracker.edu.fapi.services.interfaces.UserSubInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @RequestMapping(value = "/users_subs/customer/{id}", method = RequestMethod.GET)
    public List<UserSubscription> getSubscriptionsByCustomerId(@PathVariable(name = "id") long id) {
        return userSubInterface.getSubscriptionsByCustomerId(id);
    }

    @RequestMapping(value = "/users_subs/{subId}", method = RequestMethod.GET)
    public ResponseEntity<UserSubscription> getUserSubById(@PathVariable(name = "subId") long subId) {
        UserSubscription userSubscription = userSubInterface.getUserSubBySubId(subId);
        return userSubscription != null ? ResponseEntity.ok(userSubscription) : ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/users_subs", method = RequestMethod.POST)
    public UserSubscription saveUserSub(@RequestBody UserSubscription userSubscription) {
        return userSubInterface.saveUserSub(userSubscription);
    }

    @RequestMapping(value = "/users_subs/customer/{id}/service/{serviceId}", method = RequestMethod.GET)
    public ResponseEntity<UserSubscription> getSubscriptionsByCustomerId(@PathVariable(name = "id") long id,
                                                         @PathVariable(name = "serviceId") long serviceId) {
        UserSubscription userSubscription=userSubInterface.getSubscriptionByCustomerAndServiceId(id, serviceId);
        return userSubscription != null ? ResponseEntity.ok(userSubscription) : null;
    }
    @RequestMapping(value = "users_subs/{subId}", method = RequestMethod.DELETE)
    public void deleteUserSubById(@PathVariable(name = "subId") long subId) {
        userSubInterface.deleteUserSubById(subId);
    }

    @RequestMapping(value = "users_subs/{id}/{status}", method = RequestMethod.PUT)
    public void setUserSubActive(@PathVariable(name = "id") long id, @PathVariable(name="status") boolean status){
        userSubInterface.setUserSubActive(id, status);
    }

    @GetMapping(value = "users_subs/servicesNumOfSub")
    public int[] getNumberOfServiceSubscriptions(){
        return userSubInterface.getNumberOfServiceSubscriptions();
    }
}
