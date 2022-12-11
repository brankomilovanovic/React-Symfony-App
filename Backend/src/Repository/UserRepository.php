<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function transform(User $user)
    {
        return [
            'id' => (int) $user->getId(),
            'name' => (string) $user->getName(),
            'surname' => (string) $user->getSurname(),
            'username' => (string) $user->getUsername(),
            'email' => (string) $user->getEmail()
        ];
    }

    public function getAll()
    {
        $users = $this->findAll();
        $userArray = [];

        foreach ($users as $user) {
            $userArray[] = $this->transform($user);
        }

        return $userArray;
    }

    public function getByUsername($username)
    {
        $user = $this->findOneBy(array('username' => $username));

        if($user){
            return $user;
        }

        return null;
    }

    public function getByEmail($email)
    {
        $user = $this->findOneBy(array('email' => $email));

        if($user){
            return $user;
        }

        return null;
    }

    public function save(User $entity, bool $flush = false)
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        return $this->transform($entity);
    }

    public function remove(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
