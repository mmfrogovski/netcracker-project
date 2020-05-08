package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entities.Subscription;
import com.netcracker.edu.backend.service.interfaces.SubsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @RequestMapping(value = "/pages/{page}/{size}", method = RequestMethod.GET)
    public Page<Subscription> getAllSubs(@PathVariable(name = "page") int page, @PathVariable(name = "size") int size) {
        return subsService.getSubsPage(page, size);
    }

    @RequestMapping(value = "/{serviceId}", method = RequestMethod.GET)
    public ResponseEntity<Subscription> getServiceById(@PathVariable(name = "serviceId") long serviceId) {
        Optional<Subscription> service = subsService.getServiceById(serviceId);
        return service.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Subscription saveService(@RequestBody Subscription service) {
        return subsService.saveService(service);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Subscription editService(@RequestBody Subscription service) {
        return subsService.editService(service);
    }

    @RequestMapping(value = "/{serviceId}", method = RequestMethod.DELETE)
    public void deleteServiceById(@PathVariable(name = "serviceId") long id) {
        subsService.deleteServiceById(id);
    }

    @GetMapping(value = "/search/{tags}")
    public List<Subscription> getServicesByTags(@PathVariable(name = "tags") String tags){
        return subsService.getServicesByTags(tags);
    }

    @GetMapping(value = "/mostPopular")
    public Subscription getMostPopularService(){
        return subsService.getMostPopularSubscription();
    }

    @GetMapping(value = "/lastAdded")
    public Subscription getLastAddedService(){
        return subsService.getLastAddedSubscription();
    }
}
