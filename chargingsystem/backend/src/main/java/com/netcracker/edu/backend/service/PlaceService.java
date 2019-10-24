package com.netcracker.edu.backend.service;


import com.netcracker.edu.backend.entities.Place;
import com.netcracker.edu.backend.repository.PlaceRepository;
import com.netcracker.edu.backend.service.interfaces.PlaceServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PlaceService implements PlaceServiceInterface {

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public List<Place> getPlaces(){
        return (List<Place>)placeRepository.findAll();
    }

    @Override
    public Optional<Place> getPlaceById(long id){
        return placeRepository.findById(id);
    }

    @Override
    public Place savePlace(Place place){
        return placeRepository.save(place);
    }

    @Override
    public void deletePlaceById(long id){
        placeRepository.deleteById(id);
    }
}
