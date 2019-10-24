package com.netcracker.edu.backend.service.interfaces;

import com.netcracker.edu.backend.entities.Place;

import java.util.List;
import java.util.Optional;

public interface PlaceServiceInterface {
    List<Place> getPlaces();
    Optional<Place> getPlaceById(long id);
    Place savePlace(Place place);
    void deletePlaceById(long id);
}
