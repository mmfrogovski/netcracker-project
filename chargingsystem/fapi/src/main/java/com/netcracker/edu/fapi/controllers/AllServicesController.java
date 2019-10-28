package com.netcracker.edu.fapi.controllers;


import com.netcracker.edu.fapi.models.NewService;
import com.netcracker.edu.fapi.models.Subscription;
import com.netcracker.edu.fapi.services.interfaces.SubsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AllServicesController {
    private SubsServiceInterface subsService;

    @Autowired
    public AllServicesController(SubsServiceInterface subsService) {
        this.subsService = subsService;
    }

    @RequestMapping(value = "/all_subs", method = RequestMethod.GET)
    public List<Subscription> getAllSubs() {
        return subsService.getSubs();
    }

    @RequestMapping(value = "/all_subs/{serviceId}", method = RequestMethod.GET)
    public ResponseEntity<Subscription> getServiceById(@PathVariable(name = "serviceId") long serviceId) {
        Subscription service = subsService.getServiceById(serviceId);
        return service!=null ? ResponseEntity.ok(service) : ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/all_subs", method = RequestMethod.POST)
    public Subscription saveService(@RequestBody NewService service) {
        return subsService.saveService(service);
    }

    @RequestMapping(value = "/all_subs/{serviceId}", method = RequestMethod.DELETE)
    public void deleteServiceById(@PathVariable(name = "serviceId") long serviceId) {
        subsService.deleteServiceById(serviceId);
    }

}
