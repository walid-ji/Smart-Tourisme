package ensah.smart_city_manarat_al_moutawassit.Smart_Tourism.utils.enums;

public enum UserRoles {
    VISITOR("ROLE_VISITOR"), SECTOR("ROLE_SECTOR");

    private final String roleName;

    UserRoles(String role) {
        this.roleName = role;
    }

    @Override
    public String toString() {
        return roleName;
    }
}
