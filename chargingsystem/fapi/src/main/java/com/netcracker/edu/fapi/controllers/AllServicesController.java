package com.netcracker.edu.fapi.controllers;


import com.netcracker.edu.fapi.models.RestResponsePage;
import com.netcracker.edu.fapi.models.Subscription;
import com.netcracker.edu.fapi.services.interfaces.SubsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/all_subs")
public class AllServicesController {
    private SubsServiceInterface subsService;

    @Autowired
    public AllServicesController(SubsServiceInterface subsService) {
        this.subsService = subsService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Subscription> getAllSubs() {
        return subsService.getSubs();
    }

    @RequestMapping(value = "/{serviceId}", method = RequestMethod.GET)
    public ResponseEntity<Subscription> getServiceById(@PathVariable(name = "serviceId") long serviceId) {
        Subscription service = subsService.getServiceById(serviceId);
        return service != null ? ResponseEntity.ok(service) : ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/pages/{page}/{size}", method = RequestMethod.GET)
    public RestResponsePage getAllSubs(@PathVariable(name = "page") int page, @PathVariable(name = "size") int size) {
        return subsService.getSubsPage(page, size);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Subscription saveService(@RequestBody Subscription service) throws IOException {
        return subsService.saveService(service);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Subscription editService(@RequestBody Subscription service) throws IOException {
        return subsService.editService(service);
    }

    @RequestMapping(value = "/{serviceId}", method = RequestMethod.DELETE)
    public void deleteServiceById(@PathVariable(name = "serviceId") long serviceId) {
        subsService.deleteServiceById(serviceId);
    }

    @GetMapping(value = "/mostPopular")
    public Subscription getMostPopularService(){
        return subsService.getMostPopularService();
    }

    @GetMapping(value = "/lastAdded")
    public Subscription getLastAddedService(){
        return subsService.getLastAddedService();
    }

    @GetMapping(value = "/search/{tags}")
    public List<Subscription> getServicesByTags(@PathVariable(name = "tags") String tags){
        return subsService.getServicesByTags(tags);
    }
}
