package ensah.smart_city_manarat_al_moutawassit.Smart_Tourism.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import ensah.smart_city_manarat_al_moutawassit.Smart_Tourism.entity.users.Sector;
import org.springframework.stereotype.Repository;

@Repository
public interface SectorRepository extends MongoRepository<Sector, String> {
	
	/**
	 * Method to fetch a Sector from Mongodb Server by it's Email
	 * @param email
	 * @return Sector
	 */
	Sector findByEmail(String email);
}
