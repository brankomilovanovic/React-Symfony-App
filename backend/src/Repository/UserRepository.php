<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

class UserRepository extends BaseRepository
{
    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        $this->class = User::class;
        parent::__construct($registry, $paginator);
    }

    public function getByUsername($username, $deleted = false){
        return $this->findOneBy([
            'username' => $username,
            'deleted' => $deleted
        ]);
    }

    public function getByEmail($email, $deleted = false){
        return $this->findOneBy([
            'email' => $email,
            'deleted' => $deleted
        ]);
    }
}




