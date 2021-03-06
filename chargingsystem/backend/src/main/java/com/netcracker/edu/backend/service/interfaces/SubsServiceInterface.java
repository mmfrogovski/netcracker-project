package com.netcracker.edu.backend.service.interfaces;

import com.netcracker.edu.backend.entities.Subscription;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface SubsServiceInterface {
    List<Subscription> getSubs();

    List<Subscription> getServicesByTags(String tags);

    Optional<Subscription> getServiceById(long serviceId);

    Subscription saveService(Subscription Service);

    Subscription editService(Subscription Service);

    void deleteServiceById(long id);

    Page<Subscription> getSubsPage(int page, int size);

    Subscription getLastAddedSubscription();

    Subscription getMostPopularSubscription();

}
