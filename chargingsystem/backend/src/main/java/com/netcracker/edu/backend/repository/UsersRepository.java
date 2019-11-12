package com.netcracker.edu.backend.repository;


import com.netcracker.edu.backend.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends CrudRepository<User, Long> {

    @Query(value = "select * from users where users.login = :login and users.password= :password", nativeQuery = true)
    User getUserByLoginAndPassword(@Param("login") String login, @Param("password") String password);
}
