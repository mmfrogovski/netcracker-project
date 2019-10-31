package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entities.Subscription;
import com.netcracker.edu.backend.service.interfaces.SubsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
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
        Optional<Subscription> service = subsService.getServiceById(serviceId);
        return service.isPresent() ? ResponseEntity.ok(service.get()) : ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/all_subs", method = RequestMethod.POST)
    public Subscription saveService(@RequestBody Subscription service) {
        return subsService.saveService(service);
    }

    @RequestMapping(value = "/all_subs/{serviceId}", method = RequestMethod.DELETE)
    public void deleteServiceById(@PathVariable(name = "serviceId") long id) {
        subsService.deleteServiceById(id);
    }
}
