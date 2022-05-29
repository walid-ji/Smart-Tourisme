package ensah.smart_city_manarat_al_moutawassit.Smart_Tourism.dto;


public class UserId {
	
	String userId;

	/**
	 * constructor without params
	 */
	public UserId() {}

	/**
	 * constructor with params
	 * @param id
	 */
	public UserId(String id) {
		this.userId = id;
	}

	/**
	 * @return the id
	 */
	public String getuserId() {
		return userId;
	}

	/**
	 * @param id the id to set
	 */
	public void setUserIdd(String id) {
		this.userId = id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserId [");
		if (userId != null)
			builder.append("userId=").append(userId);
		builder.append("]");
		return builder.toString();
	}

}
