package com.netcracker.edu.backend.service.interfaces;

import com.netcracker.edu.backend.entities.NewService;
import com.netcracker.edu.backend.entities.Subscription;

import java.util.List;
import java.util.Optional;

public interface SubsServiceInterface {
    List<Subscription> getSubs();
    Optional<Subscription> getServiceById(long serviceId);
    Subscription saveService(NewService Service);
    void deleteServiceById(long id);
}
