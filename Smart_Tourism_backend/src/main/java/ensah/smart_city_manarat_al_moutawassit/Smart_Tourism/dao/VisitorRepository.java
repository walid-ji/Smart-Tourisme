package ensah.smart_city_manarat_al_moutawassit.Smart_Tourism.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import ensah.smart_city_manarat_al_moutawassit.Smart_Tourism.entity.users.Visitor;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends MongoRepository<Visitor, String	>{
	
	/**
	 * Method to fetch a Visitor from Mongodb Server by it's Email
	 * @param email
	 * @return Visitor
	 */
	Visitor findByEmail(String email);
}
