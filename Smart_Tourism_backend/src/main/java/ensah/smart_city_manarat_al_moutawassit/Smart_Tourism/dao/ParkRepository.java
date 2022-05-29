package ensah.smart_city_manarat_al_moutawassit.Smart_Tourism.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import ensah.smart_city_manarat_al_moutawassit.Smart_Tourism.entity.guide.Park;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkRepository extends MongoRepository<Park, String> {

}
