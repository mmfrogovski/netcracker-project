package com.netcracker.edu.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }}
//public class BackendApplication implements CommandLineRunner {
//    public static void main(String[] args) {
//        SpringApplication.run(BackendApplication.class, args);
//    }
//
//    @Autowired
//    private CustomerRepository customersRepository;
//    @Autowired
//    private UsersRepository usersRepository;
//    @Autowired
//    private SubscriptionRepository subscriptionRepository;
//
//
//    @Override
//    public void run(String... args) throws Exception {
//
//        Customer max = new Customer("Vlad", "Vlad@gmail.com", 20);
//
//        BillingAccount maxBillingAccount = new BillingAccount(33);
//
//        User marchello = new User("vlad", "123Vv", false);
//
//        Subscription yandexMusic = new Subscription("Yandex Music", "yandex music", 30, 3, "Yandex music is best music service!");
//
//
//        max.setBillingAccount(maxBillingAccount);
//        marchello.setCustomer(max);
//
//        usersRepository.save(marchello);
//        subscriptionRepository.save(yandexMusic);
//
//
//    }
//}


