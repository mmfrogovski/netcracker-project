package com.netcracker.edu.backend.repository;


import com.netcracker.edu.backend.entities.Place;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends CrudRepository<Place, Long> {
}
