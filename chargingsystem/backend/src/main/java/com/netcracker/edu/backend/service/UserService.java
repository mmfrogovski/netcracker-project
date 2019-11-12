package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entities.BillingAccount;
import com.netcracker.edu.backend.entities.Customer;
import com.netcracker.edu.backend.entities.RegistrationData;
import com.netcracker.edu.backend.entities.User;
import com.netcracker.edu.backend.repository.UsersRepository;
import com.netcracker.edu.backend.service.interfaces.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService implements UserServiceInterface {

    @Autowired
    UsersRepository usersRepository;

    @Override
    public List<User> getUsers() {
        return (List<User>) usersRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(long userId) {
        return usersRepository.findById(userId);
    }

    @Override
    public User saveUser(User user){
        return usersRepository.save(user);
    }

    @Override
    public void deleteUserById(long userId){
        usersRepository.deleteById(userId);
    }

    @Override
    public User registerUser(RegistrationData registrationData){
        User tempUser = new User(registrationData.getLogin(),registrationData.getPassword(),registrationData.isRole());
        Customer tempCustomer= new Customer(registrationData.getName(), registrationData.getEmail(), registrationData.getAge());
        BillingAccount tempBillingAccount = new BillingAccount(registrationData.getResources());
        tempCustomer.setBillingAccount(tempBillingAccount);
        tempUser.setCustomer(tempCustomer);
        return usersRepository.save(tempUser);
    }

    @Override
    public User getUserByLoginAndPassword(String login, String password){
        return usersRepository.getUserByLoginAndPassword(login, password);
    }


}

