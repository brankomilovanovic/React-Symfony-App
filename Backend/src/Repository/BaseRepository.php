<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class BaseRepository extends ServiceEntityRepository
{
    protected $class;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, $this->class);
    }

    public function get($id, $deleted = false) {
        return $this->findOneBy([
            'id' => $id,
            'deleted' => $deleted
        ]);
    }

    public function getAll($deleted = false) {
        return $this->findBy([
            'deleted' => $deleted
        ]);
    }

    public function save($entity, bool $flush = true)
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        return $entity;
    }

}
