package com.netcracker.edu.backend.controller;


import com.netcracker.edu.backend.entities.Place;
import com.netcracker.edu.backend.service.interfaces.PlaceServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class PlaceController {

    private PlaceServiceInterface placeService;

    @Autowired
    public PlaceController(PlaceServiceInterface placeService){
        this.placeService = placeService;
    }

    @RequestMapping(value = "/places", method = RequestMethod.GET)
    public List<Place> getPlaces(){
        return placeService.getPlaces();
    }
}
