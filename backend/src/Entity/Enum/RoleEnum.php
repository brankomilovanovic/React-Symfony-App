<?php

namespace App\Entity\Enum;

enum RoleEnum: int
{
    case ROLE_USER = 1;
    case ROLE_MODERATOR = 2;
    case ROLE_ADMIN = 3;

}
