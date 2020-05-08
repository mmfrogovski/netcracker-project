package com.netcracker.edu.fapi.services.interfaces;

import com.netcracker.edu.fapi.models.RestResponsePage;
import com.netcracker.edu.fapi.models.Subscription;

import java.io.IOException;
import java.util.List;

public interface SubsServiceInterface {
    List<Subscription> getSubs();

    List<Subscription> getServicesByTags(String tags);

    Subscription getServiceById(long serviceId);

    Subscription saveService(Subscription service) throws IOException;

    Subscription editService(Subscription service) throws IOException;

    void deleteServiceById(long serviceId);

    RestResponsePage getSubsPage(int page, int size);

    Subscription getMostPopularService();

    Subscription getLastAddedService();
}
