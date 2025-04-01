import enum

class RolesEnum(enum.Enum):
    ADMIN = "admin"
    VOLUNTARIO = "voluntario"

class statusEnum(enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"
